import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => String(value).trim())
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty({
    enum: ['email', 'phone'],
  })
  provider: string;
}
