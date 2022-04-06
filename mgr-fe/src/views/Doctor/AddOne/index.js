import { defineComponent, reactive, ref } from 'vue';
import { doctor } from '@/service';
import { message } from 'ant-design-vue';
import { result, clone } from '@/helpers/utils';

const defaultFormData = {
    doctorImg: '',
    name: '',
    hospital: '',
    position: '',
    department: '',
    goodAt: '',
    hospitalGrade: '',
    personalProfile: '',
    creationTime: '0',
};

export default defineComponent({
    props: {
        show: Boolean,
    },
    setup(props, context) {
        const addForm = reactive(clone(defaultFormData));
        var realImgUrl = ref('');

        const close = () => {
            context.emit('update:show', false);
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
        // 点击按钮
        const submit = async () => {
            const form = clone(addForm);
            form.creationTime = addForm.creationTime.valueOf();
            defaultFormData.doctorImg = realImgUrl
            form.doctorImg = defaultFormData.doctorImg
            const res = await doctor.add(form);
            result(res)
                .success((d, { data }) => {
                    // 合并一个数组
                    Object.assign(addForm, defaultFormData);
                    message.success(data.msg);
                    close();
                    context.emit('getList');
                });
        };


        return {
            addForm,
            submit,
            props,
            close,
            handleChange,
        }
    },
    methods: {
        // handleChange(info){
        //     const status = info.file.status;
        //     if (status === 'done')  {
        //         message.success(`${info.file.name} 图片上传成功.`);
        //         const dataImg = info.file.response.data
        //         let realImgUrl = `http://localhost:3000/` + dataImg;
        //         this.$emit('sendImg',realImgUrl)
        //     } else if (status === 'error') {
        //         message.error(`${info.file.name} file upload failed.`);
        //     }
        // }
    }
});