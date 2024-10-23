import { ValidationErr } from '@src/common/classes';
import { isStr, isArr, isFn } from '@src/util/type-checks';
export function checkArr(argObj, propOrFn, fn) {
    try {
        var val = void 0, propName = 'object', vldrFn = void 0;
        if (isStr(propOrFn)) {
            val = argObj[propOrFn];
            propName = propOrFn;
            vldrFn = fn;
        }
        else if (isFn(propOrFn)) {
            vldrFn = propOrFn;
        }
        if (isArr(val)) {
            for (var _i = 0, val_1 = val; _i < val_1.length; _i++) {
                var item = val_1[_i];
                if (!(vldrFn === null || vldrFn === void 0 ? void 0 : vldrFn(item))) {
                    throw new ValidationErr(propName);
                }
            }
            return val;
        }
        else {
            throw new ValidationErr(propName);
        }
    }
    catch (err) {
        var errStr = void 0;
        if (err instanceof Error) {
            errStr = err.message;
        }
        else if (isStr(err)) {
            errStr = err;
        }
        else {
            errStr = String(err);
        }
        throw new ValidationErr(errStr);
    }
}
function check(argObj, propOrFn, fn) {
    try {
        var val = void 0, propName = 'object', vldrFn = void 0;
        if (isStr(propOrFn)) {
            val = argObj[propOrFn];
            propName = propOrFn;
            vldrFn = fn;
        }
        else if (isFn(propOrFn)) {
            vldrFn = propOrFn;
        }
        if (vldrFn === null || vldrFn === void 0 ? void 0 : vldrFn(val)) {
            return val;
        }
        else {
            throw new ValidationErr(propName);
        }
    }
    catch (err) {
        var errStr = void 0;
        if (err instanceof Error) {
            errStr = err.message;
        }
        else if (isStr(err)) {
            errStr = err;
        }
        else {
            errStr = String(err);
        }
        throw new ValidationErr(errStr);
    }
}
export default check;
