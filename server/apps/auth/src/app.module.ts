import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthzModule } from './app/authz/authz.module';
import { INTERNAL_MODULES, MODULE_CONFIG, MODULE_TYPEORM } from './modules';
import { Oath2Module } from './app/oath2/oath2.module';
import { AuthPassportModule } from './app/passport/passport.module';

@Module({
  imports: [
    MODULE_CONFIG,
    MODULE_TYPEORM,
    ...INTERNAL_MODULES,
    AuthzModule,
    Oath2Module,
    AuthPassportModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
