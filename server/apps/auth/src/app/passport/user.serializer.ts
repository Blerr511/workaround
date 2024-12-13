import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserDao, WrUser } from '../../data/user';

@Injectable()
export class UsersSerializer extends PassportSerializer {
  constructor(private userService: UserDao) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  serializeUser(user: WrUser, done: Function) {
    console.log(user.uid);
    done(null, user.uid);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  deserializeUser(id: string, done: Function) {
    this.userService.getByUid(id, {}).then(
      (user) => {
        console.log(user);
        return done(null, user);
      },
      (err) => {
        console.error(err);
        done(err);
      },
    );
  }
}
