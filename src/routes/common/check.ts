
import { RouteError, ValidationErr } from '@src/common/classes';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { isStr, isUndef, isNum, isBool } from '@src/util/type-checks';


// **** Types **** //

// Arguments
type TObj = Record<string, unknown>;
type TVldrFn<T> = (param: unknown) => param is T;
type TProps = string | readonly string[];

// Return
type TOpt<T, O> = O extends undefined ? T : O extends true ? T | undefined : T;
type TRet<P, T, O> = P extends readonly string[] ? TOpt<T[], O> : TOpt<T, O>;


// **** Main "check" Function **** //

/**
 * Accept a property or an array of values, and run them against a validator
 * function. If it passes, then return the values.
 */
function check<T, P extends TProps, O extends boolean | undefined = undefined>(
  argObj: TObj,
  props: P,
  vldrFn: TVldrFn<T>,
  parse?: boolean,
  isOptional?: O,
): TRet<P, T, O> {
  // Clone object so we don't modify "IReq"
  const obj = { ...argObj };
  // If props is an array
  let retVal;
  if (props instanceof Array) {
    const arr = [];
    for (const prop of props) {
      let val = obj[prop];
      if (isUndef(val)) {
        if (isOptional) {
          continue;
        } else {
          throw new ValidationErr(prop);
        }
      }
      if (isStr(val) && parse) {
        val = JSON.parse(val);
      }
      if (_wrapVldrFn(vldrFn, val)) {
        arr.push(val);
      } else {
        throw new ValidationErr(prop);
      }
    }
    retVal = arr;
  }
  // If props is a string
  if (isStr(props)) {
    let val = obj[props];
    if (isUndef(val) && !isOptional) {
      throw new ValidationErr(props);
    }
    if (isStr(val) && parse) {
      val = JSON.parse(val);
    }
    if (_wrapVldrFn(vldrFn, val)) {
      retVal = val;
    } else {
      throw new ValidationErr(props);
    }
  }
  // Return
  return retVal as TRet<P, T, O>;
}

/**
 * Some validator functions may throw errors. So we can throw the error 
 * from our check function we wrap it in a try/catch block.
 */
function _wrapVldrFn<T>(
  fn: ((arg: unknown) => arg is T),
  val: unknown,
): val is T {
  try {
    return fn(val);
  } catch (err) {
    let errStr;
    if (err instanceof Error) {
      errStr = err.message;
    } else if (isStr(err)) {
      errStr = err;
    } else {
      errStr = JSON.stringify(err);
    }
    throw new RouteError(HttpStatusCodes.BAD_REQUEST, errStr);
  }
}


// **** Export **** //
/* eslint-disable max-len */

// Hardcode Some Frequently used ones
export const checkBool = <P extends TProps>(obj: TObj, props: P) => check(obj, props, isBool, true);
export const checkNum = <P extends TProps>(obj: TObj, props: P) => check(obj, props, isNum, true);
export const checkStr = <P extends TProps>(obj: TObj, props: P) => check(obj, props, isStr);

// "check"
export default check;
