import { defineComponent, reactive ,ref} from 'vue';
import { medicine } from '@/service';
import { message } from 'ant-design-vue';
import { result, clone } from '@/helpers/utils';

const defaultFormData = {
    price: '',
    drugName: '',
    pharmacy: '',
    count: '',
    medicineImg:'',
    manufacturer: '',
    specification: '',
    element: '',
    indications: '',
};

export default defineComponent({
    props: {
        show: Boolean,
    },
    setup(props, context) {
        var realImgUrl = ref('');
        console.log(props);
        const addForm = reactive(clone(defaultFormData));

        const close = () => {
            context.emit('update:show', false);
        };

        // 这是控制图片上传的函数
        const handleChange = (info) => {
            const status = info.file.status;
            if (status !== 'uploading') {
            }
            if (status === 'done') {
                message.success(`${info.file.name} 图片上传成功！`);
                const dataImg = info.file.response.data
                realImgUrl = dataImg;
                console.log(realImgUrl);
                context.emit('sendImg', realImgUrl);
            } else if (status === 'error') {
                message.error(`${info.file.name} 图片上传失败，请刷新重试！`);
            }
        }


        const submit = async () => {
            const form = clone(addForm);
            // form.creationTime = addForm.creationTime.valueOf();
            defaultFormData.medicineImg = realImgUrl
            form.medicineImg = defaultFormData.medicineImg
            console.log('medicineImg', form.medicineImg)
            const res = await medicine.add(form);

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
    }
});