import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({ example: 'test@mail.com' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'test_test2' })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => String(value).trim())
  password: string;

  @ApiProperty({
    enum: ['email'],
  })
  @IsNotEmpty()
  provider: string;
}
