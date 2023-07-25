import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';

@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {}
