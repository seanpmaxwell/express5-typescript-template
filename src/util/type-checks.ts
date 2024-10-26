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
