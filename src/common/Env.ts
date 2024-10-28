import jetEnv, { isBool, isNum } from 'jet-env';

import { isEnumVal } from '@src/util/type-checks';
import { NodeEnvs } from './constants';


const isNodeEnv = (arg: unknown): arg is NodeEnvs => {
  return isEnumVal(NodeEnvs)(arg);
};

export default jetEnv({
  NodeEnv: ['process.env.NODE_ENV', isNodeEnv],
  Port: ['PORT', isNum],
  CookieProps: {
    Secret: 'COOKIE_SECRET',
    Options: {
      httpOnly: 'COOKIE_HTTP_ONLY',
      signed: 'COOKIE_SIGNED',
      path: 'COOKIE_PATH',
      maxAge: ['COOKIE_EXP', isNum],
      domain: 'COOKIE_DOMAIN',
      secure: ['SECURE_COOKIE', isBool],
    },
  },
});
