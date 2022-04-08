import { defineComponent, reactive,watch,ref } from 'vue';
import { article } from '@/service';
import { message } from 'ant-design-vue';
import { result,clone,formatTimestamp } from '@/helpers/utils';
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
    
    setup(props,context) {
        var realImgUrl = ref('');
        const editForm = reactive({
            ArticleTitle: '',
            ArticleClassification: '',
            Distributor: '',
            ArticleImg:'',
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


             // 这是控制图片上传的函数
             const handleChange = (info) => {
                const status = info.file.status;
                if (status !== 'uploading') {
                }
                if (status === 'done') {
                    message.success(`${info.file.name} 图片上传成功.`);
                    const dataImg = info.file.response.data
                    realImgUrl = `http://localhost:3000/` + dataImg;
                    console.log(realImgUrl);
                    context.emit('sendImg', realImgUrl);
                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            }
    


        const submit = async () => {
            if(realImgUrl.length > 1){
                const res = await article.update({
                    id:props.article._id,
                    ...editForm,
                    creationTime:editForm.creationTime.valueOf(),
                    ArticleImg:editForm.ArticleImg = String(realImgUrl),
                });
                result(res)
                 .success(({ data,msg }) => {
                    context.emit('update',data);
                    message.success(msg);
                    close();
                    context.emit('getListEdit');
                 });
            }else{
                const res = await article.update({
                    id:props.article._id,
                    ...editForm,
                    creationTime:editForm.creationTime.valueOf(),
                });
                result(res)
                 .success(({ data,msg }) => {
                    context.emit('update',data);
                    message.success(msg);
                    close();
                    context.emit('getListEdit');
                 });
            }
            
        };

        return{
            editForm,
            submit,
            props,
            close,
            handleChange,
            store:store.state,
        }
    },
    methods:{
        // 接收wangEditor数据
        sendEditor(val){
            this.editForm.DistributionContent = val;
            console.log(val);
        }
    },
});