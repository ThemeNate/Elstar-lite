const createUID = (len = 10) => {
    const buf = []
    const chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charlen = chars.length
    const length = len

    for (let i = 0; i < length; i++) {
        buf[i] = chars.charAt(Math.floor(Math.random() * charlen))
    }
    return buf.join('')
}

export default createUID
