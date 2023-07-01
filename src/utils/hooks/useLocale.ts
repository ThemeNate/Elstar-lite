import { useEffect } from 'react'
// eslint-disable-next-line import/no-named-as-default
import i18n from 'i18next'
import dayjs from 'dayjs'
import { dateLocales } from '@/locales'
import { useAppSelector } from '@/store'

function useLocale() {
    const locale = useAppSelector((state) => state.locale.currentLang)

    useEffect(() => {
        const formattedLang = locale.replace(/-([a-z])/g, function (g) {
            return g[1].toUpperCase()
        })
        if (locale !== i18n.language) {
            i18n.changeLanguage(formattedLang)
        }
        dateLocales[formattedLang]().then(() => {
            dayjs.locale(formattedLang)
        })
    }, [locale])

    return locale
}

export default useLocale
