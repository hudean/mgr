import { defineComponent } from 'vue';
import Nav from './Nav/index.vue'
import { DownOutlined } from '@ant-design/icons-vue';

export default defineComponent({
    components:{
        AppNav:Nav,
        DownOutlined,
    },
    setup(){
        const options = [
            {
                title: '中文',
                dataIndex: 'Chinese'
            },
            {
                title: '英文',
                dataIndex: 'English'
            },
        ]
        return {
            options
        }
    },
    
})
