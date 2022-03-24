import { defineComponent, reactive } from 'vue';
import { consult } from '@/service';
import { message } from 'ant-design-vue';
import { result,clone } from '@/helpers/utils';

const defaultFormData = {
    Consultants:'',
    ConsultationContent: '',
    WhetherPublic: '',
    creationTime: '0',
};

export default defineComponent({
    props:{
        show:Boolean,
    },
    setup(props,context) {
        console.log(props);
        const addForm = reactive(clone(defaultFormData));

        const submit = async () => {
           const form = clone(addForm);
           form.creationTime = addForm.creationTime.valueOf();
           const res = await consult.add(form);

           result(res)
            .success((d,{ data }) => {
                // 合并一个数组
                Object.assign(addForm,defaultFormData);
                message.success(data.msg);
            });
        };

        const close = () => {
            context.emit('update:show',false);
        };

        return{
            addForm,
            submit,
            props,
            close,
        }
    }
});