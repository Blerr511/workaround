import { Field, InputType } from '@nestjs/graphql';

@InputType('DeleteWorkspaceInput')
export class DeleteWorkspaceInputGql {
  @Field()
  id: number;
}
