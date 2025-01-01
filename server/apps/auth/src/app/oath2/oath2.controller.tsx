import { Controller, Get, Query, Req, Res, Post, Body } from '@nestjs/common';
import { Request, Response } from 'express';
import { Oauth2Service } from './oath2.service';
import { ConfigService } from '../../configuration/config.service';

@Controller()
export class Oauth2Controller {
  constructor(
    private oauth2Service: Oauth2Service,
    private readonly configService: ConfigService,
  ) {}

  @Get('authorize')
  authorize(
    @Req() req: Request,
    @Res() res: Response,
    @Query('client_id') clientId: string,
    @Query('redirect_uri') redirectUri: string,
    @Query('response_type') responseType = 'code',
    @Query('scope') scope: string,
    @Query('state') state: string,
  ) {
    // Validate client and redirectUri
    if (!this.oauth2Service.validateClient(clientId, redirectUri)) {
      return res.status(400).send('Invalid client or redirect_uri');
    }

    // Check if user is logged in
    const user = req.user as any;

    if (!user) {
      // Store the original request in session so after login we can return here
      req.session['oauth2_request'] = req.originalUrl;
      return res.redirect(
        this.configService.safeGet('web').webApp.routes.login,
      );
    }

    // Show a consent screen (if needed). For simplicity, let's always show consent.
    return res.render('/authorize', {
      props: { clientId, redirectUri, scope, state },
    });
  }

  @Post('authorize')
  confirmAuthorization(
    @Req() req: Request,
    @Res() res: Response,
    @Body('client_id') clientId: string,
    @Body('redirect_uri') redirectUri: string,
    @Body('scope') scope: string,
    @Body('state') state: string,
    @Body('approve') approve: string,
  ) {
    // const html = renderToString(<App />);
    // return res.send(html);
    // User must be logged in at this point
    // const user = req.user as any;
    // if (!user || !this.oauth2Service.validateClient(clientId, redirectUri)) {
    //   return res.status(400).send('Unauthorized or invalid client');
    // }
    // if (approve === 'yes') {
    //   const code = this.oauth2Service.generateCode(
    //     clientId,
    //     redirectUri,
    //     user.id,
    //   );
    //   const redirectUrl = new URL(redirectUri);
    //   redirectUrl.searchParams.set('code', code);
    //   if (state) redirectUrl.searchParams.set('state', state);
    //   return res.redirect(redirectUrl.toString());
    // } else {
    //   // User denied access
    //   const redirectUrl = new URL(redirectUri);
    //   redirectUrl.searchParams.set('error', 'access_denied');
    //   return res.redirect(redirectUrl.toString());
    // }
  }

  @Post('token')
  token(
    @Req() req: Request,
    @Res() res: Response,
    @Body('client_id') clientId: string,
    @Body('client_secret') clientSecret: string,
    @Body('code') codeStr: string,
    @Body('redirect_uri') redirectUri: string,
    @Body('grant_type') grantType = 'authorization_code',
  ) {
    if (grantType !== 'authorization_code') {
      return res.status(400).send('Unsupported grant type');
    }

    const client = this.oauth2Service.getClient(clientId);
    if (!client || client.clientSecret !== clientSecret) {
      return res.status(401).json({ error: 'invalid_client' });
    }
    const code = this.oauth2Service.consumeCode(codeStr);
    if (
      !code ||
      code.clientId !== clientId ||
      code.redirectUri !== redirectUri
    ) {
      return res.status(400).json({ error: 'invalid_code' });
    }

    // Normally you'd associate an access token with the user and scopes
    const accessToken = this.oauth2Service.generateAccessToken();

    return res.json({
      access_token: accessToken,
      token_type: 'bearer',
      expires_in: 3600,
    });
  }
}
