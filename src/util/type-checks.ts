/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */

/**
 * NOTE: These functions were copied from here:
 * https://github.com/seanpmaxwell/ts-validators/blob/master/src/validators.ts
 * 
 * There are plenty of more validators to copy there ;)
 */


// **** Types **** //

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TFunc = (...args: any[]) => any;


// **** Variables **** //

// Nullables
export const isStr = checkType<string>('string');
export const isNum = checkType<number>('number');
export const isBool = checkType<boolean>('boolean');
export const isFn = checkType<TFunc>('function');


/**
 * Wrapper to check basic type.
 */
function checkType<T>(type: string) {
  return (arg: unknown): arg is T => {
    return typeof arg === type && (type === 'object' ? (arg !== null) : true);
  };
}

/**
 * Check is value satisfies enum.
 */
export function isEnumVal<T>(arg: T): ((arg: unknown) => arg is T) {
  const vals = _getEnumVals(arg);
  return (arg: unknown): arg is T => {
    return vals.some(val => arg === val);
  };
}

/**
 * Get the values of an enum object.
 */
function _getEnumVals(arg: unknown): unknown[] {
  if (isNonArrObj(arg)) {
    // Get keys
    const resp = Object.keys(arg).reduce((arr: unknown[], key) => {
      if (!arr.includes(key)) {
        arr.push(arg[key]);
      }
      return arr;
    }, []);
    // Check if string or number enum
    if (isNum(arg[resp[0] as string])) {
      return resp.map(item => arg[item as string]);
    } else {
      return resp;
    }
  }
  throw Error('"getEnumKeys" be an non-array object');
}

/**
 * Check if non-array object.
 */
function isNonArrObj(
  arg: unknown,
): arg is Record<string, unknown> {
  return typeof arg === 'object' && !Array.isArray(arg);
}