import { BadRequestException, Injectable } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { ConfigService } from '../configuration';

@Injectable()
export class VerifyTokenService {
  constructor(private readonly configService: ConfigService) {}

  async verify(token: string) {
    const { verifyUrl } = this.configService.safeGet('auth');

    return await verifyAccessToken(token, verifyUrl);
  }
}

export const verifyAccessToken = async (token: string, _verifyUrl?: string) => {
  const verifyUrl = _verifyUrl || ConfigService.getInstance().auth.verifyUrl;

  try {
    const result = await axios.post(verifyUrl, null, {
      headers: { authorization: `${token}` },
    });

    return result.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new BadRequestException(
        `Token verification failed: ${
          (error?.response?.data && JSON.stringify(error?.response?.data)) ||
          error
        }`,
      );
    }
    throw error;
  }
};
