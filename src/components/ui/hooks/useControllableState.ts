import { useState, useCallback, useRef, useEffect } from 'react'
import useCallbackRef from './useCallbackRef'

type UseControllableStateParams<T> = {
    prop?: T
    defaultProp?: T
    onChange?: (state: T) => void
}

function useUncontrolledState<T>({
    defaultProp,
    onChange,
}: Omit<UseControllableStateParams<T>, 'prop'>) {
    const uncontrolledState = useState(defaultProp)
    const [value] = uncontrolledState
    const prevValueRef = useRef(value)
    const handleChange = useCallbackRef(onChange)

    useEffect(() => {
        if (prevValueRef.current !== value) {
            handleChange(value as T)
            prevValueRef.current = value
        }
    }, [value, prevValueRef, handleChange])

    return uncontrolledState
}

function useControllableState<T>({
    prop,
    defaultProp,
    onChange = () => {
        // empty callback
    },
}: UseControllableStateParams<T>) {
    const [uncontrolledProp, setUncontrolledProp] = useUncontrolledState({
        defaultProp,
        onChange,
    })
    const isControlled = prop !== undefined
    const value = isControlled ? prop : uncontrolledProp
    const handleChange = useCallbackRef(onChange)

    const setValue: React.Dispatch<React.SetStateAction<T | undefined>> =
        useCallback(
            (nextValue) => {
                const setter = nextValue as (prevState?: T) => T
                if (isControlled) {
                    const value =
                        typeof nextValue === 'function'
                            ? setter(prop)
                            : nextValue
                    if (value !== prop) {
                        handleChange(value as T)
                    }
                } else {
                    setUncontrolledProp(nextValue)
                }
            },
            [isControlled, prop, setUncontrolledProp, handleChange]
        )

    return [value, setValue] as const
}

export default useControllableState
