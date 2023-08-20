import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WrUser } from './user.entity';
import { DeepPartial, FindOptionsRelations, Repository } from 'typeorm';

@Injectable()
export class UserDao {
  @InjectRepository(WrUser) private readonly userRepo: Repository<WrUser>;

  async getByUid(uid: string, relations: FindOptionsRelations<WrUser>) {
    return await this.userRepo.findOne({ where: { uid }, relations });
  }

  async getByIdentifier(identifier: string) {
    return await this.userRepo.findOne({
      where: {
        providers: {
          identifier,
        },
      },
      relations: {
        providers: true,
      },
    });
  }

  async createNewUserWithProvider(
    data: Pick<DeepPartial<WrUser>, 'providers'>,
  ): Promise<WrUser> {
    const newUser = this.userRepo.create(data);

    return await this.userRepo.save(newUser);
  }
}
