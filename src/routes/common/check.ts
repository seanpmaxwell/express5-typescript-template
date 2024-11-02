import { ValidationErr } from '@src/common/classes';
import { isStr, isFn } from '@src/util/validators';


// **** Types **** //

type TVldrFn<T> = (
  arg: unknown,
  cb?: (val: T) => void,  
) => arg is T;


// **** Main "check" Function **** //

/**
 * Same as below but works for arrays.
 */
export function checkArr<T>(
  argObj: Record<string, unknown>,
  propOrFn: TVldrFn<T>,
): T[];
export function checkArr<T>(
  argObj: Record<string, unknown>,
  propOrFn: string,
  fn: TVldrFn<T>,
): T[];
export function checkArr<T>(
  argObj: Record<string, unknown>,
  propOrFn: string | TVldrFn<T>,
  fn?: TVldrFn<T>,
): T[] {
  try {
    // Init
    let val,
      propName = 'object',
      vldrFn;
    if (isStr(propOrFn)) {
      val = argObj[propOrFn];
      propName = propOrFn;
      vldrFn = fn;
    } else if (isFn(propOrFn)) {
      val = argObj;
      vldrFn = propOrFn;
    }
    // Run checks
    if (Array.isArray(val)) {
      for (let i = 0; i < val.length; i++) {
        if (!vldrFn?.(val[i], (transVal) => val[i] = transVal)) {
          throw new ValidationErr(propName);
        }
      }
      return val as T[];
    } else {
      throw new ValidationErr(propName);
    }
  // Wrap errors
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

/**
 * Extract a property or from and object and run them against a validator 
 * function.
 */
function check<T>(
  argObj: Record<string, unknown>,
  propOrFn: TVldrFn<T>,
): T;
function check<T>(
  argObj: Record<string, unknown>,
  propOrFn: string,
  fn: TVldrFn<T>,
): T;
function check<T>(
  argObj: Record<string, unknown>,
  propOrFn: string | TVldrFn<T>,
  fn?: TVldrFn<T>,
): T {
  try {
    // Init
    let val,
      propName = 'object',
      vldrFn;
    if (isStr(propOrFn)) {
      val = argObj[propOrFn];
      propName = propOrFn;
      vldrFn = fn;
    } else if (isFn(propOrFn)) {
      val = argObj;
      vldrFn = propOrFn;
    }
    // Run check
    if (vldrFn?.(val, transVal => val = transVal)) {
      return val;
    } else {
      throw new ValidationErr(propName);
    }
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


// **** Export Default **** //

export default check;
