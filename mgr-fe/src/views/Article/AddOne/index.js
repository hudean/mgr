import { defineComponent, reactive, ref } from 'vue';
import { article } from '@/service';
import { message } from 'ant-design-vue';
import store from '@/store';
import { result, clone } from '@/helpers/utils';
import WangEditor from './WangEditor.vue';

const defaultFormData = {
    ArticleTitle: '',
    ArticleClassification: '',
    Distributor: '',
    ArticleImg: '',
    DistributionContent: '',
    creationTime: '0',
};

export default defineComponent({
    props: {
        show: Boolean,
    },
    components: {
        WangEditor,
    },
    setup(props, context) {
        const addForm = reactive(clone(defaultFormData));
        var realImgUrl = ref('');

        if (store.state.articleClassify.length) {
            addForm.ArticleClassification = store.state.articleClassify[0]._id;
        }

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
            form.creationTime = addForm.creationTime.valueOf();
            defaultFormData.ArticleImg = realImgUrl
            form.ArticleImg = defaultFormData.ArticleImg
            const res = await article.add(form);
            result(res)
                .success((d, { data }) => {
                    // 合并一个数组
                    Object.assign(addForm, defaultFormData);
                    message.success(data.msg);
                    close();
                    context.emit('getList');
                });
        };

        console.log(store.state);

        return {
            addForm,
            submit,
            props,
            close,
            store: store.state,
            handleChange,
        }
    },
    methods: {
        // 接收wangEditor数据
        sendEditor1(val) {
            this.addForm.DistributionContent = val;
            console.log(val);
        }
    },
});