import { Field, InputType } from '@nestjs/graphql';

@InputType('GetWorkspaceInput')
export class GetWorkspaceInputGql {
  @Field()
  id: number;
}
