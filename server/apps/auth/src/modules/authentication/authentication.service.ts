import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthProviderDao } from '../../data/auth-provider/auth-provider.dao';
import { CryptoService } from '../crypto/crypto.service';
import { UserDao } from '../../data/user';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userDao: UserDao,
    private readonly authProviderDao: AuthProviderDao,
    private readonly cryptoService: CryptoService,
  ) {}

  async signIn(username: string, password: string, providerId: string) {
    const provider = await this.authProviderDao.findByProvider(
      providerId,
      username,
    );

    if (!provider) {
      throw new NotFoundException(
        `User with identifier "${username}" not found`,
      );
    }

    const isCorrectPass = await this.cryptoService.compare(
      password,
      provider.password,
    );

    if (!isCorrectPass) {
      throw new BadRequestException('Invalid user credentials');
    }

    const accessToken = await this.cryptoService.createJwtToken({
      provider: {
        id: provider.providerId,
        name: provider.name,
        identifier: provider.identifier,
      },
      uid: provider.user.uid,
    });

    return { accessToken };
  }

  async verify(token: string) {
    const data = await this.cryptoService.verify<JwtPayload>(token);

    const provider = await this.authProviderDao.findByProvider(
      data.provider.id,
      data.provider.identifier,
    );

    if (!provider) {
      throw new NotFoundException(
        `User with identifier "${data.provider.identifier}" not found`,
      );
    }

    const user = await this.userDao.getByIdentifier(provider.identifier);

    return user;
  }
}

export interface JwtPayload {
  provider: {
    id: string;
    name: string;
    identifier: string;
  };
  uid: string;
  iat: number;
  exp: number;
}
