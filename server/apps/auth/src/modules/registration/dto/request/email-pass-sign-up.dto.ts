import { ArgsType, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class EmailPassSignUpDto {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => String(value).trim())
  password: string;
}
