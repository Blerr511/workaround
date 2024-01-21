import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType('Pagination')
export class PaginationGql {
  @Field()
  page: number;

  @Field()
  size: number;
}

@ObjectType('PaginationResult')
export class PaginationResultGql {
  @Field()
  total: number;
}
