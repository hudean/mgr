import { defineComponent,ref,onMounted } from 'vue';
import { consult } from '@/service';
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
                title: '咨询者',
                dataIndex: 'Consultants'
            },
            {
                title: '咨询内容',
                dataIndex: 'ConsultationContent'
            },
            {
                title: '是否公开',
                dataIndex: 'WhetherPublic'
            },
            {
                title: '创建时间',
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
        const curEditConsult = ref({});

        // 获取书籍列表
        const getList = async () => {
            const res = await consult.list({
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
             
           const res = await consult.remove(_id);

           result(res)
            .success(({ msg }) => {
                message.success(msg);

                // const idx = list.value.findIndex((item)=>{
                //     return item._id === _id;
                // });
                // list.value.splice(idx,1);
                getList();
            });
        };

        const update = ({ record }) => {
            showUpdateModal.value = true;
            curEditConsult.value = record;
        };

        const updateCurConsult = () => {
            Object.assign(curEditConsult.value,newData);
        };

            const onUploadChange = ({ file }) => {
                if(file.response){
                    result(file.response)
                        .success(async (key)=>{
                            const res = await consult.addMany(key);

                            result(res)
                                .success(({data:{ addCount } }) =>{
                                    message.success(`成功添加 ${addCount} 名医生`);

                                    getList();
                                })
                        });
                }
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
            curEditConsult,
            updateCurConsult,
            onUploadChange
        };
    },
});
