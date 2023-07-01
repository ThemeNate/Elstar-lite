import { useCallback } from 'react'

const whiteListTwColor = [
    'indigo-600',
    'emerald-500',
    'cyan-500',
    'blue-600',
    'teal-500',
    'fuchsia-500',
    'pink-500',
    'rose-500',
    'red-500',
    'amber-500',
    'violet-500',
    'purple-500',
]

function useTwColorByName(prefix = 'bg'): (name: string) => string {
    const hashName = (name: string) => {
        let hash = 0
        for (let i = 0; i < name.length; i++) {
            const charCode = name.charCodeAt(i)
            hash += charCode
        }
        return hash
    }

    const generateTwColor = useCallback(
        (name: string) => {
            const hash = hashName(name)
            const index = hash % whiteListTwColor.length
            const color = whiteListTwColor[index]
            return `${prefix}-${color} dark:${prefix}-${color}`
        },
        [prefix]
    )

    return generateTwColor
}

export default useTwColorByName
