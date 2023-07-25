import { Injectable } from '@nestjs/common';
import { UserDao } from '../../data/user/user.dao';

@Injectable()
export class AuthenticationService {
  constructor(private readonly userDao: UserDao) {}
}
