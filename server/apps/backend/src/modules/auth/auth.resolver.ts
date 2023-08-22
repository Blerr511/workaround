import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthApiService } from '../../app/auth-api/auth-api.service';
import { AuthUserGql } from '../../app/gql/entities/auth-user.gql';
import {
  EmailSignUpParamsGql,
  SignInParamsGql,
  SignInResponseGql,
} from './gql';
import { toDto } from '../../app/data/toDto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authApiService: AuthApiService) {}

  @Query(() => SignInResponseGql)
  async signIn(
    @Args('cred') data: SignInParamsGql,
  ): Promise<SignInResponseGql> {
    return await this.authApiService.login(data).then(toDto(SignInResponseGql));
  }

  @Mutation(() => AuthUserGql)
  async emailSignUp(
    @Args('user') data: EmailSignUpParamsGql,
  ): Promise<AuthUserGql> {
    return await this.authApiService.signUp(data).then(toDto(AuthUserGql));
  }
}
