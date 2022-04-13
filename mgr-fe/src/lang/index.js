// import { defineComponent,ref,onMounted } from 'vue';
// import Vue from 'vue';
// import VueI18n from 'vue-i18n';
import { createI18n } from 'vue-i18n';

// Vue.use(VueI18n)
const i18n = createI18n({
    locale:'en',
    messages:{
        en:{
            doctorPage:{
                doctorManage:'Doctor Manage'
            }
        },
        zh:{
            doctorPage:{
                doctorManage:'医生管理'
            }
        }
    }
})

export default i18n
