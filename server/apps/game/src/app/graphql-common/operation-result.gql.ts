import { Field, ObjectType } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';

@ObjectType('OperationResult')
export class OperationResultGql {
  @Field()
  ok: boolean;

  @Field({ nullable: true, defaultValue: 'Operation Completed' })
  message?: string;

  static ok(message?: string) {
    return plainToInstance(OperationResultGql, { ok: true, message });
  }

  static failure(message?: string) {
    return plainToInstance(OperationResultGql, { ok: false, message });
  }
}
