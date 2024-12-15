import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('login')
  loginForm(@Req() req: Request, @Res() res: Response) {
    return res.render('login', { error: null });
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
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
