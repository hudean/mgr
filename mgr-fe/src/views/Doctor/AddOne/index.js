import { defineComponent, reactive } from 'vue';
import { doctor } from '@/service';
import { message } from 'ant-design-vue';
import { result,clone } from '@/helpers/utils';

const defaultFormData = {
    doctorImg:'',
    name: '',
    hospital: '',
    position: '',
    department: '',
    goodAt: '',
    hospitalGrade: '',  
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
           const res = await doctor.add(form);

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