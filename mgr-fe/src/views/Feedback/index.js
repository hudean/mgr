import { defineComponent,ref,onMounted } from 'vue';
import { feedback } from '@/service';
import { message  } from 'ant-design-vue';
import { BookFilled, UploadOutlined } from '@ant-design/icons-vue';
import { result,formatTimestamp } from '@/helpers/utils';
import AddOne from './AddOne/index.vue';
import Update from './Update/index.vue';
import { Item } from 'ant-design-vue/lib/menu';

export default defineComponent({
    components:{
        AddOne,
        Update,
    },
    setup() {
        const columns = [
            {
                title: '反馈内容',
                dataIndex: 'FeedbackContent',
            },
            {
                title: '反馈用户',
                dataIndex: 'FeedbackUsers',
            },
            {
                title: '反馈时间',
                dataIndex: 'creationTime',
                slots:{
                    customRender:'creationTime'
                }
            },
            {
                title: '操作',
                slots:{
                    customRender:'actions'
                }
            },  
        ];


        const show = ref(false);
        const showUpdateModal = ref(false);
        const list = ref([]);
        const total = ref(0);
        const curPage = ref(1);
        const keyword = ref('');
        const isSearch = ref(false);
        const curEditFeedback = ref({});

        // 获取书籍列表
        const getList = async () => {
            const res = await feedback.list({
                page:curPage.value,
                size:10,
                keyword:keyword.value,
            });
            
           result(res)
            .success(({ data }) => {
                const { list:l,total:t } = data;
                list.value = l;
                total.value = t;
            });
        }

        onMounted(async () => {
            getList();
        });

        // 设置页码
        const setPage = (page) => {
            curPage.value = page;
            getList();
        }
        
        // 触发搜索
        const onSearch = () => {
            getList();

            isSearch.value = Boolean(keyword.value);
        };

        // 回到全部列表
        const backAll = () => {
            keyword.value = '';
            isSearch.value = false;
            getList();
        };


        // 删除一个医生的信息
        const remove = async ({ text:record }) => {
           const { _id } = record; 
             
           const res = await feedback.remove(_id);

           result(res)
            .success(({ msg }) => {
                message.success(msg);
                getList();
            });
        };

        const update = ({ record }) => {
            showUpdateModal.value = true;
            curEditFeedback.value = record;
        };

        const updateCurFeedback = () => {
            Object.assign(curEditFeedback.value,newData);
        };

        return {
            columns,
            show,
            list,
            formatTimestamp,
            curPage,
            total,
            setPage,
            keyword,
            onSearch,
            backAll,
            isSearch,
            remove,
            showUpdateModal,
            update,
            curEditFeedback,
            updateCurFeedback,
            getList,
        };
    },
});
