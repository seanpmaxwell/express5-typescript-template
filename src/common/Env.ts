import jetEnv, { bool, num, str } from 'jet-env';

import { isEnumVal } from '@src/util/type-checks';
import { NodeEnvs } from './constants';



const checkNodeEnv = isEnumVal(NodeEnvs);

export default jetEnv({
  NodeEnv: (arg): arg is NodeEnvs => checkNodeEnv(arg),
  Port: num,
  Cookie: {
    Secret: str,
    Options: {
      httpOnly: bool,
      signed: bool,
      path: str,
      maxAge: num,
      domain: str,
      secure: bool,
    },
  },
});
