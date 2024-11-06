import { isStr, parse, TSchema } from '@src/util/validators';
import { ValidationErr } from '@src/common/classes';


export function reqParse<U extends TSchema>(schema: U, arg: unknown) {
  try {
    return parse<U>(schema, arg, (prop?: string, value?: unknown) => {
      throw new Error(`Property "${prop}" was missing or invalid, ` + 
        `value: ${String(value)}`);
    });
  } catch (err) {
    let errStr;
    if (err instanceof Error) {
      errStr = err.message;
    } else if (isStr(err)) {
      errStr = err;
    } else {
      errStr = String(err);
    }
    throw new ValidationErr(errStr);
  }
};
