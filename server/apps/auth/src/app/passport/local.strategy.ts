import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDao } from '../../data/user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private userDao: UserDao) {
    super();
  }

  async validate(username: string, password: string) {
    const user = await this.userDao.findByUserName(username);

    if (!user || user.passwordHash !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
