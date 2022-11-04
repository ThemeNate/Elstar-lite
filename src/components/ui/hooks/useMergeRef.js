const useMergedRef = (...refs) => (element) => refs.forEach((ref) => {
    if (typeof ref === 'function') {
        ref(element)
    } else if (ref && typeof ref === 'object') {
        ref.current = element
    }
})

export default useMergedRef