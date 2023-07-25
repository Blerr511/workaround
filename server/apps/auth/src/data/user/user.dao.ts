import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DeepPartial, FindOptionsRelations, Repository } from 'typeorm';

@Injectable()
export class UserDao {
  @InjectRepository(User) private readonly userRepo: Repository<User>;

  async getByUid(uid: string, relations: FindOptionsRelations<User>) {
    return await this.userRepo.findOne({ where: { uid }, relations });
  }

  async createNewUserWithProvider(
    data: Pick<DeepPartial<User>, 'providers'>,
  ): Promise<User> {
    const newUser = this.userRepo.create(data);

    return await this.userRepo.save(newUser);
  }
}
