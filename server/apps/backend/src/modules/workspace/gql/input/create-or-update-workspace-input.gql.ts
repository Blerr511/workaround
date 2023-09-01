import { Field, InputType } from '@nestjs/graphql';

@InputType('CreateOrUpdateWorkspaceInput')
export class CreateOrUpdateWorkspaceInputGql {
  @Field({ nullable: true })
  id?: number;

  @Field()
  name: string;
}
