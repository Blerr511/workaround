import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { ApiAuth, AuthContext } from '../../app/auth';
import { toDto } from '../../dto/toDto';
import { UserWithProvidersResponse } from '../../dto/user-with-providers.dto';
import { AuthenticationService } from './authentication.service';
import { SignInDto } from './dto/request/sign-in.dto';
import { TokenDataResponseDto } from './dto/response/token-data-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver('authentication')
export class AuthenticationResolver {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Mutation(() => TokenDataResponseDto)
  async signIn(@Args() data: SignInDto): Promise<TokenDataResponseDto> {
    const tokenData = await this.authenticationService.signIn(
      data.username,
      data.password,
      data.provider,
    );

    return toDto(tokenData, TokenDataResponseDto);
  }

  @Query(() => UserWithProvidersResponse)
  @ApiAuth()
  @UseGuards(AuthGuard('jwt'))
  async verify(@AuthContext() auth: AuthContext) {
    if (!auth) throw new UnauthorizedException();

    return toDto(auth.user, UserWithProvidersResponse);
  }
}
