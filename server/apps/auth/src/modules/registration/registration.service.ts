import { BadRequestException, Injectable } from '@nestjs/common';
import { WrUser, UserDao } from '../../data/user';
import { CryptoService } from '../crypto/crypto.service';
import { EmailPassSignUpParams } from './registration.type';
import { AuthProviderDao } from '../../data/auth-provider/auth-provider.dao';
import { EmailProvider } from '../../data/auth-provider/provider-utils/email-provider';

@Injectable()
export class RegistrationService {
  constructor(
    private readonly userDao: UserDao,
    private readonly authProviderDao: AuthProviderDao,
    private readonly cryptoService: CryptoService,
  ) {}

  async emailPassSignUp(params: EmailPassSignUpParams): Promise<WrUser> {
    const existing = await this.authProviderDao.findByEmailProvider(
      params.email,
    );

    if (existing) {
      throw new BadRequestException('User with given email already exist');
    }

    const passwordHash = await this.cryptoService.hash(params.password);

    const newUser = await this.userDao.createNewUserWithProvider({
      providers: [new EmailProvider(params.email, passwordHash)],
    });

    return await this.userDao.getByUid(newUser.uid, { providers: true });
  }
}
