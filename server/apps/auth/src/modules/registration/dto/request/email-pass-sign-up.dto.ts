import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmailPassSignUpDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => String(value).trim())
  @ApiProperty()
  password: string;
}
