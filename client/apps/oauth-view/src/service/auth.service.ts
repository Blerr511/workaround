import { AuthApiFactory, OauthApiFactory, RegistrationApiFactory } from '@wr/auth-api';
import { config } from './config.service';

export const AuthService = AuthApiFactory(
  {
    basePath: config.get('REACT_APP_OAUTH_VIEW_API_URL'),
    isJsonMime(mime) {
      return mime.includes('json');
    },
  },
  config.get('REACT_APP_OAUTH_VIEW_API_URL')
);

export const SignUpService = RegistrationApiFactory(
  {
    basePath: config.get('REACT_APP_OAUTH_VIEW_API_URL'),
    isJsonMime(mime) {
      return mime.includes('json');
    },
  },
  config.get('REACT_APP_OAUTH_VIEW_API_URL')
);

export const OauthService = OauthApiFactory(
  {
    basePath: config.get('REACT_APP_OAUTH_VIEW_API_URL'),
    isJsonMime(mime) {
      return mime.includes('json');
    },
  },
  config.get('REACT_APP_OAUTH_VIEW_API_URL')
);
