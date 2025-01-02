import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDao } from '../../data/user';
import { ConfigService } from '../../configuration/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private userDao: UserDao,
    private readonly configService: ConfigService,
  ) {
    super({
      // Instead of the default header-based extraction,
      // we can define a custom extractor that reads from the cookie
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          // e.g. if the cookie is named 'token'
          return (req?.cookies && req?.cookies['x-wr-access-token']) || null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.safeGet('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    // Optionally, check if the token has been blacklisted, etc.
    if (!payload) {
      throw new UnauthorizedException();
    }
    console.log(payload);
    // Return an object that will be attached to `req.user`
    return { userId: payload.sub, username: payload.username };
  }
}
