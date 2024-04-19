import { Controller, Get, UnauthorizedException } from '@nestjs/common';

import { ApiAuth, AuthContext } from '../../app/auth';
import { toDto } from '../../dto/toDto';
import { UserWithProvidersResponse } from '../../dto/user-with-providers.dto';

@Controller('auth')
export class VerifyController {
  @ApiAuth()
  @Get('verify')
  async verify(@AuthContext() auth: AuthContext) {
    if (!auth) throw new UnauthorizedException();

    return toDto(auth.user, UserWithProvidersResponse);
  }
}
