import { defineComponent, reactive,watch } from 'vue';
import { doctor } from '@/service';
import { message } from 'ant-design-vue';
import { result,clone } from '@/helpers/utils';
import moment from 'moment';


export default defineComponent({
    props:{
        show:Boolean,
        doctor:Object,
    },
    setup(props,context) {
        const editForm = reactive({
            name: '',
            hospital: '',
            position: '',
            department: '',
            goodAt: '',
            hospitalGrade: '',  
            personalProfile:'',
            creationTime: '0',
        });

        const close = () => {
            context.emit('update:show',false);
        };

        watch(() => props.doctor,(current) => {
            Object.assign(editForm,current);
            editForm.creationTime = moment(Number(editForm.creationTime));
        });

        const submit = async () => {
            const res = await doctor.update({
                id:props.doctor._id,
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