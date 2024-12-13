import { Module } from '@nestjs/common';
import { Oauth2Service } from './oath2.service';
import { Oauth2Controller } from './oath2.controller';

@Module({
  providers: [Oauth2Service],
  controllers: [Oauth2Controller],
})
export class Oath2Module {}
