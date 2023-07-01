import { useEffect, useRef, useCallback } from 'react'

export type UseTimeoutReturn = {
    clear: () => void
    reset: () => void
}

function useTimeout(
    fn: (() => void) | undefined,
    ms = 0,
    enabled = true
): UseTimeoutReturn {
    const timeout = useRef<ReturnType<typeof setTimeout>>()
    const callback = useRef(fn)

    const clear = useCallback(() => {
        timeout.current && clearTimeout(timeout.current)
    }, [])

    const set = useCallback(() => {
        timeout.current && clearTimeout(timeout.current)
        if (enabled) {
            timeout.current = setTimeout(() => {
                callback.current?.()
            }, ms)
        }
    }, [ms, enabled])

    useEffect(() => {
        callback.current = fn
    }, [fn])

    useEffect(() => {
        set()
        return clear
    }, [ms, enabled, set, clear])

    return { clear, reset: set }
}

export default useTimeout
