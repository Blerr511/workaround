import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmailPassSignUpDto {
  @ApiProperty({ example: 'test@mail.com' })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({ example: 'test_test2' })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => String(value).trim())
  password: string;
}
