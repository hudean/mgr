import { createI18n } from 'vue-i18n';
import zhLocale from './lang/zh'
import enLocale from './lang/en'
import zh from './lang/zh';

const messages = {
    en:{
        msg:{
            ...enLocale
        }
    },
    zh:{
        msg:{
            ...zhLocale
        }
    }
}

const locale = 'zh'

const i18n = createI18n({
    // 使用composition API 函数
    legacy:false,
    globalInjection:true,
    locale,
    messages
})

export default i18n