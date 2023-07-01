import type { ColorLevel } from '../@types/common'

type Action = 'decrement' | 'increment'

function useColorLevel(level: ColorLevel): ColorLevel[] {
    const colorLevel = [
        '50',
        '100',
        '200',
        '300',
        '400',
        '500',
        '600',
        '700',
        '800',
        '900',
    ]
    const index = colorLevel.indexOf(level?.toString())

    function calculateLevel(action: Action) {
        if (index === 0 || index === colorLevel.length - 1) {
            return level
        }
        if (action === 'decrement') {
            return colorLevel[index - 1]
        }
        if (action === 'increment') {
            return colorLevel[index + 1]
        }
    }

    const decreaseLevel = calculateLevel('decrement')

    const increaseLevel = calculateLevel('increment')

    return [increaseLevel as ColorLevel, decreaseLevel as ColorLevel]
}

export default useColorLevel
