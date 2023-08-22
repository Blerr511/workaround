import { Field, InputType } from '@nestjs/graphql';

@InputType('EmailSignUpParams')
export class EmailSignUpParamsGql {
  @Field()
  username: string;

  @Field()
  password: string;
}
