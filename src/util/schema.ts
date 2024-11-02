import jetSchema from 'jet-schema';
import { isBool, isNum, isStr } from './validators';


export default jetSchema({
  globals: [
    { fn: isNum, default: 0 },
    { fn: isStr, default: '' },
    { fn: isBool, default: false },
  ],
});
