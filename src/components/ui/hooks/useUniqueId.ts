import { useRef } from 'react'
import uniqueId from 'lodash/uniqueId'
import createUID from '../utils/createUid'

export default function useUniqueId(prefix = '', len = 10) {
    const idRef = useRef<string>()

    if (!idRef.current) {
        idRef.current = `${uniqueId(prefix)}-${createUID(len)}`
    }

    return idRef.current
}
