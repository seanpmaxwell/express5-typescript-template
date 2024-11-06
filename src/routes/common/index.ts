import { Response, Request } from 'express';

import { isStr, parse, TSchema } from '@src/util/validators';
import { ValidationErr } from '@src/common/classes';


// **** Types **** //

type TObj = Record<string, unknown>;
export type IReq = Request<TObj, void, TObj, TObj>;
export type IRes = Response<unknown, TObj>;


// **** Functions **** //

/**
 * Parse a Request object property and throw a validation error if it fails.
 */
export function reqParse<U extends TSchema>(schema: U) {
  try {
    return parse<U>(
      schema, false, false, false,
      (prop?: string, value?: unknown) => {
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
}
