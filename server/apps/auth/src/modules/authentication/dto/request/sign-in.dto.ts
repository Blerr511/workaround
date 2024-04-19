import { ArgsType, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class SignInDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  username: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => String(value).trim())
  password: string;

  @Field()
  @IsNotEmpty()
  provider: string;
}
