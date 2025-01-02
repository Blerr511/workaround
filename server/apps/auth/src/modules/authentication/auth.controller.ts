import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticationService } from './authentication.service';
import { SignInDto } from './dto/request/sign-in.dto';
import { toDto } from '../../dto/toDto';
import { UserInfoResponseDto } from './dto/response/user-info-response.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('api/auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('app/login')
  @ApiOkResponse({
    type: UserInfoResponseDto,
  })
  @ApiOperation({
    operationId: 'login',
  })
  async loginForm(@Body() data: SignInDto, @Res() res: Response) {
    const { accessToken, refreshToken, user } =
      await this.authenticationService.signIn(
        data.username,
        data.password,
        data.provider,
      );

    res.cookie('x-wr-refresh-token', refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 3600 * 1000,
    });

    res.cookie('x-wr-access-token', accessToken, {
      httpOnly: true,
      maxAge: 3600 * 1000,
    });

    res.status(200).end(JSON.stringify(toDto(user, UserInfoResponseDto)));
  }

  @Post('login')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    operationId: 'loginJwt',
  })
  login(@Req() req: Request, @Res() res: Response) {
    const redirectUrl = req.session['oauth2_request'] || '/';

    req.login(req.user, (err) => {
      if (err) {
        throw err;
      }
      delete req.session['oauth2_request'];
      return res.redirect(redirectUrl);
    });
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout(() => {
      //
    });
    return res.redirect('/');
  }
}
