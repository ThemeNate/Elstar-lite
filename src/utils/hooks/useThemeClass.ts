import { useConfig } from '@/components/ui/ConfigProvider'

function useThemeClass() {
    const { themeColor, primaryColorLevel } = useConfig()
    const color = `${themeColor}-${primaryColorLevel}`

    return {
        ringTheme: `ring-${color}`,
        borderTheme: `border-${color}`,
        bgTheme: `bg-${color}`,
        textTheme: `text-${color}`,
    }
}

export default useThemeClass
