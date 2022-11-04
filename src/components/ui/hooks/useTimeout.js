import { useEffect, useRef, useCallback } from 'react'

function useTimeout(fn, ms = 0, open = true) {
	const timeout = useRef()

	const clear = useCallback(() => {
		timeout.current && clearTimeout(timeout.current)
	}, [])

	const set = useCallback(() => {
		timeout.current = open && setTimeout(() => fn?.(), ms)
	}, [ms, fn, open])

	useEffect(() => {
		set()
		return clear
	}, [fn, ms, open, clear, set])

	return { clear, reset: set }
}

export default useTimeout
