/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Dispatch, SetStateAction, ForwardedRef } from 'react'

type Ref<T> = Dispatch<SetStateAction<T>> | ForwardedRef<T>

const useMergeRef =
    <T = any>(...refs: Ref<T>[]) =>
    (element: T | null) => {
        refs.forEach((ref) => {
            if (typeof ref === 'function') {
                ref(element as SetStateAction<T> & (T | null))
            } else if (ref && typeof ref === 'object') {
                ref.current = element
            }
        })
    }

export default useMergeRef
