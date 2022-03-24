import { defineComponent, reactive,watch } from 'vue';
import { medicine } from '@/service';
import { message } from 'ant-design-vue';
import { result,clone } from '@/helpers/utils';
import moment from 'moment';


export default defineComponent({
    props:{
        show:Boolean,
        medicine:Object,
    },
    setup(props,context) {
        const editForm = reactive({
            price: '',
            drugName: '',
            pharmacy: '',
            count: '',
            manufacturer: '',
            specification: '', 
            element:'',
            indications:'',
            creationTime: '0',
        });

        const close = () => {
            context.emit('update:show',false);
        };

        watch(() => props.medicine,(current) => {
            Object.assign(editForm,current);
            editForm.creationTime = moment(Number(editForm.creationTime));
        });

        const submit = async () => {
            const res = await medicine.update({
                id:props.medicine._id,
                ...editForm,
                creationTime:editForm.creationTime.valueOf()
            });

            result(res)
             .success(({ data,msg }) => {
                context.emit('update',data);
                message.success(msg);
                close();
             });
        };

        return{
            editForm,
            submit,
            props,
            close,
        }
    }
});