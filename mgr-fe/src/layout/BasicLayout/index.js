import { defineComponent } from 'vue';
import Nav from './Nav/index.vue'
import { DownOutlined } from '@ant-design/icons-vue';

export default defineComponent({
    components:{
        AppNav:Nav,
        DownOutlined,
    },
    setup(){

        // 退出操作
        // const logout = () => {
        //     window.location.href = 'auth';
        // };
        // const options = [
        //     {
        //         title: '中文',
        //         dataIndex: 'Chinese'
        //     },
        //     {
        //         title: '英文',
        //         dataIndex: 'English'
        //     },
        // ]
        return {
            // logout
        }
    },
    
})
