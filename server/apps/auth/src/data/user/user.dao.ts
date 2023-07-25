import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class UserDao {
  @InjectRepository(User) private readonly userRepo: Repository<User>;

  async createNewUserWithProvider(
    data: Pick<DeepPartial<User>, 'providers'>,
  ): Promise<User> {
    const newUser = this.userRepo.create(data);

    return await this.userRepo.save(newUser);
  }
}
