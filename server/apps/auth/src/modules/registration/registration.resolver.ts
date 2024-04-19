import { RegistrationService } from './registration.service';
import { EmailPassSignUpDto } from './dto/request/email-pass-sign-up.dto';
import { UserWithProvidersResponse } from '../../dto/user-with-providers.dto';
import { toDto } from '../../dto/toDto';
import { Resolver, Mutation, Args } from '@nestjs/graphql';

@Resolver('registration')
export class RegistrationResolver {
  constructor(private readonly registrationService: RegistrationService) {}

  @Mutation(() => UserWithProvidersResponse)
  async signUp(@Args() data: EmailPassSignUpDto) {
    const newUser = await this.registrationService.emailPassSignUp(data);

    return toDto(newUser, UserWithProvidersResponse);
  }
}
