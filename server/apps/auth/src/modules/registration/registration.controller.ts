import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { EmailPassSignUpDto } from './dto/request/email-pass-sign-up.dto';
import { UserWithProvidersDto } from '../../dto/user-with-providers.dto';
import { toDto } from '../../dto/toDto';

@ApiTags('registration')
@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post('email-pass')
  @ApiOkResponse({ type: UserWithProvidersDto })
  async mountPostSignUp(@Body() data: EmailPassSignUpDto) {
    const newUser = await this.registrationService.emailPassSignUp(data);

    return toDto(newUser, UserWithProvidersDto);
  }
}
