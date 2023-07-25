import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { EmailPassSignUpDto } from './dto/request/email-pass-sign-up.dto';

@ApiTags('registration')
@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post('email-pass')
  async mountPostSignUp(@Body() data: EmailPassSignUpDto) {}
}
