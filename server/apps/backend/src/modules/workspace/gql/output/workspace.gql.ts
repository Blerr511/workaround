import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Workspace')
export class WorkspaceGql {
  @Field()
  id: number;

  @Field()
  name: string;
}
