import { Global, Inject, Injectable, Module, Scope } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';

import { GraphqlContext } from './context';

export enum ApiUserType {
  anonymous = 'anonymous',
  machine_user = 'machine_user',
  user = 'user',
}

@Injectable({ scope: Scope.REQUEST })
export class AppUser {
  type: ApiUserType;
  role: string;
  username: string | null;
  constructor(@Inject(CONTEXT) private context: GraphqlContext) {
    console.log(context.user);
    if (context.user) {
      this.type = ApiUserType.user;
      // this.username = context.user.providers.at(0).identifier;
    } else {
      this.type = ApiUserType.anonymous;
    }
  }
}

@Global()
@Module({
  providers: [AppUser],
  exports: [AppUser],
})
export class AppUserModule {}
