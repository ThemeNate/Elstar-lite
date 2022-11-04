import { useRef } from 'react'

export default function useUncertainRef(ref) {
    const newRef = useRef()

    if (ref) {
        return ref
    }

    return newRef
}