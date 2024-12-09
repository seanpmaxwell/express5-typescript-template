import jetEnv, { bool, num, str } from 'jet-env';
import { isEnumVal } from 'jet-validators';

import { NodeEnvs } from './constants';


export default jetEnv({
  NodeEnv: isEnumVal(NodeEnvs),
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
