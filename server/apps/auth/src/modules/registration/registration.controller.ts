import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { EmailPassSignUpDto } from './dto/request/email-pass-sign-up.dto';
import { toDto } from '../../dto/toDto';
import { WrUserDto } from '../../dto/wr-user/wr-user.dto';

@ApiTags('registration')
@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @ApiOperation({
    operationId: 'register',
  })
  @ApiCreatedResponse({
    type: WrUserDto,
  })
  @Post('register')
  async register(@Body() data: EmailPassSignUpDto) {
    return this.registrationService
      .emailPassSignUp(data)
      .then((user) => toDto(user, WrUserDto));
  }
}
