import { defineComponent, reactive,watch,ref } from 'vue';
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
        var realImgUrl = ref('');
        const editForm = reactive({
            doctorImg: '',
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

        watch(() => props.doctor,(current) => {
            Object.assign(editForm,current);
            editForm.creationTime = moment(Number(editForm.creationTime));
        });
        const submit = async () => {
            if(realImgUrl.length > 1){
                console.log('1');
                const res = await doctor.update({
                    id:props.doctor._id,
                    ...editForm,
                    creationTime:editForm.creationTime.valueOf(),
                    doctorImg:editForm.doctorImg = String(realImgUrl),
                });
                console.log(editForm.doctorImg);
                result(res)
                 .success(({ data,msg }) => {
                    context.emit('update',data);
                    message.success(msg);
                    close();
                    context.emit('getListEdit');
                 });
            }else{
                console.log('2')
                const res = await doctor.update({
                    id:props.doctor._id,
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
        }
    }
});