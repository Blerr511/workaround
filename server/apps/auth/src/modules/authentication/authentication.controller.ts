import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { ApiAuth, AuthContext } from '../../app/auth';
import { toDto } from '../../dto/toDto';
import { UserWithProvidersDto } from '../../dto/user-with-providers.dto';
import { AuthenticationService } from './authentication.service';
import { SignInDto } from './dto/request/sign-in.dto';
import { TokenDataResponseDto } from './dto/response/token-data-response.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get('login')
  @UseGuards(AuthGuard('auth0'))
  async login() {
    //
  }

  @Get('callback')
  @UseGuards(AuthGuard('auth0'))
  callback() {
    // Handles the Auth0 callback.
    return 'Logged in';
  }

  @Post('sign-in')
  @ApiResponse({
    type: TokenDataResponseDto,
  })
  async signIn(@Body() data: SignInDto): Promise<TokenDataResponseDto> {
    const tokenData = await this.authenticationService.signIn(
      data.username,
      data.password,
      data.provider,
    );

    return toDto(tokenData, TokenDataResponseDto);
  }

  @Post('verify')
  @ApiAuth()
  @ApiResponse({ type: UserWithProvidersDto })
  @UseGuards(AuthGuard('jwt'))
  async verify(@AuthContext() auth: AuthContext) {
    if (!auth) throw new UnauthorizedException();

    return toDto(auth.user, UserWithProvidersDto);
  }
}
