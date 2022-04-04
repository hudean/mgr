import { defineComponent, reactive } from 'vue';
import { medicine } from '@/service';
import { message } from 'ant-design-vue';
import { result,clone } from '@/helpers/utils';

const defaultFormData = {
    price:'',
    drugName: '',
    pharmacy: '',
    count: '',
    manufacturer: '',
    specification: '',
    element: '', 
    indications:'', 
};

export default defineComponent({
    props:{
        show:Boolean,
    },
    setup(props,context) {
        console.log(props);
        const addForm = reactive(clone(defaultFormData));

        const close = () => {
            context.emit('update:show',false);
        };


        const submit = async () => {
           const form = clone(addForm);
           form.creationTime = addForm.creationTime.valueOf();
           const res = await medicine.add(form);

           result(res)
            .success((d,{ data }) => {
                // 合并一个数组
                Object.assign(addForm,defaultFormData);
                message.success(data.msg);
                close();
                context.emit('getList');
            });
        };

        
        return{
            addForm,
            submit,
            props,
            close,
        }
    }
});