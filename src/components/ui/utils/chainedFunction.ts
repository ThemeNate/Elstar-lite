/* eslint-disable @typescript-eslint/no-explicit-any */
export default function chainedFunction<T = any>(...funcs: (T | null)[]) {
    return funcs
        .filter((f) => f !== null && typeof f !== 'undefined')
        .reduce((acc: any, f: any) => {
            if (typeof f !== 'function') {
                throw new Error(
                    'Invalid Argument Type, must only provide functions, undefined, or null.'
                )
            }

            if (acc === undefined) {
                return f
            }

            return function chainedFunction(this: any, ...args: any[]) {
                acc.apply(this, args)
                f.apply(this, args)
            }
        }, undefined)
}
