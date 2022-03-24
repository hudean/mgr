import { defineComponent, reactive,watch } from 'vue';
import { consult } from '@/service';
import { message } from 'ant-design-vue';
import { result,clone } from '@/helpers/utils';
import moment from 'moment';

export default defineComponent({
    props:{
        show:Boolean,
        consult:Object,
    },
    setup(props,context) {
        const editForm = reactive({
            Consultants: '',
            ConsultationContent: '',
            WhetherPublic: '',
            creationTime: '0',
        });

        const close = () => {
            context.emit('update:show',false);
        };

        watch(() => props.consult,(current) => {
            Object.assign(editForm,current);
            editForm.creationTime = moment(Number(editForm.creationTime));
        });

        const submit = async () => {
            const res = await consult.update({
                id:props.consult._id,
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