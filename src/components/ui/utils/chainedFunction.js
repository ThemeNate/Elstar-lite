export default function chainedFunction(...funcs) {
    return funcs
        .filter(f => f !== null && typeof f !== 'undefined')
        .reduce((acc, f) => {
            if (typeof f !== 'function') {
                throw new Error('Argument only accept functions, undefined, or null.')
            }
    
            if (acc === undefined) {
                return f;
            }
    
            return function chainedFunction(...args) {
                acc.apply(this, args)
                f.apply(this, args)
            };
        }, undefined
    )
}