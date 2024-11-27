import { Module } from '@nestjs/common';
import { AppModule } from '../modules/app.module';

@Module({
  imports: [AppModule],
})
export class GraphqlSchemaModule {}
