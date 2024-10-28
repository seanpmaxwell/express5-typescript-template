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


// **** Enums **** //

/**
 * Check is value satisfies enum.
 */
export function isEnumVal<T>(arg: T): ((arg: unknown) => arg is T) {
  const vals = getEnumVals(arg);
  return (arg: unknown): arg is T => {
    return vals.some(val => arg === val);
  };
}

/**
 * Get the values of an enum object.
 */
export function getEnumVals(arg: unknown) {
  if (isNonArrObj(arg)) {
    const keys = getEnumKeys(arg);
    return keys.map(key => arg[key]);
  }
  throw Error('"getEnumVals" be an non-array object');
}

/**
 * Get the keys of an enum object.
 */
export function getEnumKeys(arg: Record<string, unknown>): string[] {
  if (isNonArrObj(arg)) {
    return Object.keys(arg).reduce((arr: string[], key) => {
      if (!arr.includes(key) && isStr(arg[key])) {
        arr.push(arg[key]);
      }
      return arr;
    }, []);
  }
  throw Error('"getEnumKeys" be an non-array object');
}


// **** Misc **** //

/**
 * Check if non-array object.
 */
function isNonArrObj(
  arg: unknown,
): arg is Record<string, unknown> {
  return typeof arg === 'object' && !Array.isArray(arg);
}