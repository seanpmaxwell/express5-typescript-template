/**
 * NOTE: These functions were copied from here:
 * https://github.com/seanpmaxwell/ts-validators/blob/master/src/validators.ts
 * 
 * There are plenty of more validators to copy there ;)
 */

/* eslint-disable max-len */


// **** Types **** //

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TFunc = (...args: any[]) => any;
type TBasicObj = Record<string, unknown>;

// Add modifiers
type AddNull<T, N> = (N extends true ? T | null : T);
type AddNullables<T, O, N> = (O extends true ? AddNull<T, N> | undefined  : AddNull<T, N>);
type AddMods<T, O, N, A> = A extends true ? AddNullables<T[], O, N> : AddNullables<T, O, N>;


// **** Main **** //

export const isStr = _checkType<string>('string');
export const isNum = _checkType<number>('number');
export const isBool = _checkType<boolean>('boolean');
const isObj = _checkType<object>('object');
export const parse = _parseBase<false, false, false>(false, false, false);


// **** Enum **** //

/**
 * Check is value satisfies enum.
 */
export function isEnumVal<T>(arg: T): ((arg: unknown) => arg is T[keyof T]) {
  const vals = _getEnumVals(arg);
  return (arg: unknown): arg is T[keyof T] => {
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


// **** Misc Util **** //

/**
 * Wrapper to check basic type.
 */
function _checkType<T>(type: string) {
  return (arg: unknown): arg is T => {
    return typeof arg === type && (type === 'object' ? (arg !== null) : true);
  };
}


// **** Transform **** //

export type TValidateWithTransform<T> = (arg: unknown, cb?: (arg: T) => void) => arg is T;

/**
 * Transform a value before checking it.
 */
export function transform<T>(
  transFn: TFunc,
  vldt: ((arg: unknown) => arg is T),
): TValidateWithTransform<T> {
  return (arg: unknown, cb?: (arg: T) => void): arg is T => {
    if (arg !== undefined) {
      arg = transFn(arg);
    }
    cb?.(arg as T);
    return vldt(arg);
  };
}


// **** Parse **** //

export interface TSchema {
  [key: string]: TValidateWithTransform<unknown> | TSchema;
}

type TInferParseRes<U, O, N, A, Schema = TInferParseResHelper<U>> = (
  AddMods<Schema, O, N, A>
);

type TInferParseResHelper<U> = {
  [K in keyof U]: (
    U[K] extends TValidateWithTransform<infer X> 
    ? X 
    : U[K] extends TSchema
    ? TInferParseResHelper<U[K]>
    : never
  );
};

/**
 * Allow optional, nullable, is array modifiers to parse.
 */
function _parseBase<
  O extends boolean,
  N extends boolean,
  A extends boolean,
>(
  optional: O,
  nullable: N,
  isArr: A,
) {
  return <U extends TSchema>(
    schema: U,
    arg: unknown,
    onError?: (
      A extends true 
      ? ((property?: string, value?: unknown, index?: number) => void) 
      : ((property?: string, value?: unknown) => void)
    ),
  ) => _parseHelper(optional, nullable, isArr, schema, arg, onError) as TInferParseRes<U, O, N, A>;
}

/**
 * Helper function to override some type issues.
 */
function _parseHelper(
  optional: boolean,
  nullable: boolean,
  isArr: boolean,
  schema: TSchema,
  arg: unknown,
  onError?: TFunc,
) {
  // check 'undefined'
  if (arg === undefined) {
    if (!optional) {
      onError?.('object value was undefined but not optional', arg);
      return undefined;
    }
  }
  // check null
  if (arg === null) {
    if (!nullable) {
      onError?.('object value was null but not nullable', arg);
      return undefined;
    }
    return null;
  }
  // check array
  if (isArr) {
    if (!Array.isArray(arg)) {
      onError?.('object not an array', arg);
      return null;
    }
    // Iterate array
    const resp = [];
    for (let i = 0; i < arg.length; i++) {
      const item: unknown = arg[i];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      const parsedItem = _parseCore(schema, item, (prop, val) => onError?.(prop, val, i));
      if (parsedItem === undefined) {
        return undefined;
      } else {
        resp.push(parsedItem);
      }
    }
    return resp;
  }
  // Return
  return _parseCore(schema, arg, onError);
}

/**
 * Iterate an object, apply a validator function to to each property in an 
 * object using the schema.
 */
function _parseCore(
  schema: TSchema,
  arg: unknown,
  onError?: (property?: string, value?: unknown) => void,
) {
  if (!isObj(arg)) {
    return;
  }
  const retVal: TBasicObj = {};
  for (const key in schema) {
    const schemaProp = schema[key];
    let val = (arg as TBasicObj)[key];
    if (typeof schemaProp === 'object') {
      const childVal = _parseCore(schemaProp, val, onError);
      if (childVal !== undefined) {
        val = childVal;
      } else {
        return undefined;
      }
    } else if (typeof schemaProp === 'function') {
      if (!schemaProp(val, (tval: unknown) => val = tval)) {
        return onError?.(key, val);
      };
    }
    retVal[key] = val;
  }
  return retVal;
}
