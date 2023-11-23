import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import translationEN from '@/locales/en.json'
import translationZH from '@/locales/zh.json'

const resources = {
	en: { translation: translationEN },
	zh: { translation: translationZH }
}

i18n
	.use(initReactI18next) // 初始化react-i18next
	.init({
		resources,
		lng: 'zh', // 默认语言
		fallbackLng: 'zh', // 如果找不到对应语言的翻译，使用默认语言
		interpolation: {
			escapeValue: false // 不转义HTML标签
		}
	})

export default i18n
