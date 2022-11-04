import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './lang/en.json'
import { themeConfig } from 'configs/theme.config'

const resources = {
    en: {
        translation: en
    },
}

i18n.use(initReactI18next).init({
    resources,
    fallbackLng: themeConfig.locale,
    lng: themeConfig.locale,
    interpolation: {
        escapeValue: false 
    }
})

export const dateLocales = {
    en: () => import('dayjs/locale/en'),
}

export default i18n