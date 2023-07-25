import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '../../configuration/config.service';

@Injectable()
export class CryptoService {
  constructor(private readonly configService: ConfigService) {}

  async hash<T extends string | Buffer>(value: T) {
    const { salt } = this.configService.safeGet('crypto');

    return await bcrypt.hash(value, salt);
  }
}
