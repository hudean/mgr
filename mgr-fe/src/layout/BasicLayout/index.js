// import { defineComponent } from 'vue';
// import Nav from './Nav/index.vue'
// import { DownOutlined } from '@ant-design/icons-vue';

// export default defineComponent({
//     components:{
//         AppNav:Nav,
//         DownOutlined,
//     },
//     // setup(){
//         // const updateCurArticle = () => {
//         //     Object.assign(curEditArticle.value, newData);
//         //   };
//     //     const clickLang = () =>{
//     //         console.log('11')
//     //     },
//     //     return {
//     //         clickLang
//     //     }
//     // },
    
// })



import { defineComponent } from 'vue';
import Nav from './Nav/index.vue'
import { DownOutlined } from '@ant-design/icons-vue';


export default defineComponent({
    components:{
        AppNav:Nav,
        DownOutlined,
    },
    setup() {

        // 这是控制图片上传的函数
        const aa = (info) => {
            console.log("1",info)
            console.log(this)
        }



        return {
            aa
        }
    }
});