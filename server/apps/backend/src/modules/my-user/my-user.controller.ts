import { Controller, Get } from '@nestjs/common';
import { MyUserService } from './my-user.service';

@Controller()
export class MyUserController {
  constructor(private readonly myUserService: MyUserService) {}

  @Get('dummy')
  dummy() {
    return this.myUserService.some();
  }
}
