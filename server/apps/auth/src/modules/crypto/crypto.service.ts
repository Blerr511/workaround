import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '../../configuration/config.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class CryptoService {
  constructor(private readonly configService: ConfigService) {}

  async hash<T extends string | Buffer>(value: T) {
    const { salt } = this.configService.safeGet('crypto');

    return await bcrypt.hash(value, salt);
  }

  async compare(data: string, encrypted: string): Promise<boolean> {
    return await bcrypt.compare(data, encrypted);
  }

  createJwtToken<T extends string | Buffer | object>(payload: T) {
    const { jwtLifeSeconds, jwtSecret } = this.configService.safeGet('crypto');

    const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtLifeSeconds });

    return token;
  }

  verify<R>(token: string): R {
    const { jwtSecret } = this.configService.safeGet('crypto');

    try {
      return jwt.verify(token, jwtSecret) as R;
    } catch (error) {
      throw new BadRequestException('JWT malformed');
    }
  }

  decode(token: string) {
    return jwt.decode(token);
  }
}
