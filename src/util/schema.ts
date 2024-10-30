import jetSchema from 'jet-schema';
import { isBool, isNum, isStr } from './type-checks';


export default jetSchema({
  defaultValuesMap: [
    [isNum, 0],
    [isStr, ''],
    [isBool, false],
  ],
});
