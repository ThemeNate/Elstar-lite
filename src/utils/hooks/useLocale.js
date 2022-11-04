import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import i18n from 'i18next'
import { dateLocales } from 'locales'
import dayjs from 'dayjs'

function useLocale() {

    const locale = useSelector((state) => state.theme.locale)

    useEffect(() => {
        const formattedLang = locale.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase() }) 
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