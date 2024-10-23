type TFunc = (...args: unknown[]) => unknown;

/**
 * Check if a param is undefined.
 */
export function isUndef(param: unknown): param is undefined {
  return param === undefined;
}

/**
 * Is a number
 */
export function isNum(param: unknown): param is number {
  return typeof param === 'number';
}

/**
 * Is a valid string
 */
export function isStr(param: unknown): param is string {
  return typeof param === 'string';
}

/**
 * Is a valid boolean
 */
export function isBool(param: unknown): param is boolean {
  return typeof param === 'boolean';
}

/**
 * Is an object exluding null
 */
export function isObj(val: unknown): val is NonNullable<object> {
  return !!val && typeof val === 'object';
}

/**
 * Valid date. Could be a string, number, Date, or DayJS object.
 */
export function isDate(val: unknown): val is string | number | Date {
  return (
    !!val && 
    (isStr(val) || isNum(val) || val instanceof Date) &&
    !isNaN(new Date(val).getTime())
  );
}

/**
 * Is an unknown value a string array
 */
export function isArr(val: unknown): val is unknown[] {
  return Array.isArray(val);
}

/**
 * See if value is a function type.
 */
export function isFn(val: unknown): val is TFunc {
  return typeof val === 'function';
}

/**
 * Transform a value before checking it.
 */
export function trans<T>(
  transformFn: TFunc,
  cb: ((arg: unknown) => arg is T),
): typeof cb {
  return (arg: unknown): arg is T => {
    if (arg !== undefined) {
      arg = transformFn(arg);
    }
    return cb(arg);
  };
}
