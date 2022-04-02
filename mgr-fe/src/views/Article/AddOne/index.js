import { defineComponent, reactive } from 'vue';
import { article } from '@/service';
import { message } from 'ant-design-vue';
import store from '@/store';
import { result,clone } from '@/helpers/utils';

const defaultFormData = {
    ArticleTitle: '',
    ArticleClassification: '',
    Distributor: '',
    DistributionContent: '',
    creationTime: '0',
};

export default defineComponent({
    props:{
        show:Boolean,
    },
    setup(props,context) {
        console.log(props);
        const addForm = reactive(clone(defaultFormData));

        if(store.state.articleClassify.length){
            addForm.ArticleClassification = store.state.articleClassify[0]._id;
        }
       

        const close = () => {
            context.emit('update:show',false);
        };

        const submit = async () => {
           const form = clone(addForm);
           form.creationTime = addForm.creationTime.valueOf();
           const res = await article.add(form);

           result(res)
            .success((d,{ data }) => {
                // 合并一个数组
                Object.assign(addForm,defaultFormData);
                message.success(data.msg);
                close();
                context.emit('getList');
            });
        };

        console.log(store.state);
        
        return{
            addForm,
            submit,
            props,
            close,
            store:store.state,
        }
    }
});