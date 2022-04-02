import { defineComponent, reactive,watch } from 'vue';
import { article } from '@/service';
import { message } from 'ant-design-vue';
import { result,clone } from '@/helpers/utils';
import store from '@/store';
import moment from 'moment';
import WangEditor  from './WangEditor.vue';

export default defineComponent({
    components: {
        WangEditor,
    },
    props:{
        show:Boolean,
        article:Object,
    },
    methods:{
        // 接收wangEditor数据
        sendEditor(val){
 
        }
    },
    setup(props,context) {
        const editForm = reactive({
            ArticleTitle: '',
            ArticleClassification: '',
            Distributor: '',
            DistributionContent: '',
            creationTime: '0',
        });

        const close = () => {
            context.emit('update:show',false);
        };

        watch(() => props.article,(current) => {
            Object.assign(editForm,current);
            editForm.creationTime = moment(Number(editForm.creationTime));
        });

        const submit = async () => {
            const res = await article.update({
                id:props.article._id,
                ...editForm,
                creationTime:editForm.creationTime.valueOf()
            });

            result(res)
             .success(({ data,msg }) => {
                context.emit('update',data);
                message.success(msg);
                close();
                context.emit('getListEdit');
             });
        };

        return{
            editForm,
            submit,
            props,
            close,
            store:store.state,
        }
    }
});