import { Expose } from 'class-transformer';

export class TokenDataResponseDto {
  @Expose()
  accessToken: string;
}
