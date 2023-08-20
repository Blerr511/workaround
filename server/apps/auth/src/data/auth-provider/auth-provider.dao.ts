import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AuthProvider } from './auth-provider.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthProviderDao {
  @InjectRepository(AuthProvider)
  private readonly authProviderRepo: Repository<AuthProvider>;

  async findByEmailProvider(email: string): Promise<AuthProvider | null> {
    const provider = await this.authProviderRepo.findOneBy({
      identifier: email,
      providerId: 'email',
    });

    return provider;
  }

  async findByProvider(
    providerId: string,
    identifier: string,
  ): Promise<AuthProvider | null> {
    const provider = await this.authProviderRepo.findOne({
      where: {
        identifier,
        providerId,
      },
      relations: {
        user: true,
      },
    });

    return provider;
  }
}
