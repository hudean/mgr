import { defineComponent,ref,onMounted } from 'vue';
import { medicine } from '@/service';
import { message,Modal,Input  } from 'ant-design-vue';
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
                title: '价格',
                dataIndex: 'price'
            },
            {
                title: '药品名称',
                dataIndex: 'drugName'
            },
            {
                title: '药房',
                dataIndex: 'pharmacy'
            },
            {
                title: '库存',
                slots:{
                    customRender:'count'
                }
            },
            {
                title: '生产企业',
                dataIndex: 'manufacturer'
            },
            {
                title: '药品规格',
                dataIndex: 'specification'
            },
            {
                title: '药品成分',
                dataIndex: 'element'
            },
            {
                title: '主治功能',
                dataIndex: 'indications'
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
        const curEditMedicine = ref({});

        // 获取书籍列表
        const getList = async () => {
            const res = await medicine.list({
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
             
           const res = await medicine.remove(_id);

           result(res)
            .success(({ msg }) => {
                message.success(msg);
                getList();
            });
        };

        const update = ({ record }) => {
            showUpdateModal.value = true;
            curEditMedicine.value = record;
        };

        const updateCurMedicine = () => {
            Object.assign(curEditMedicine.value,newData);
        };

            const onUploadChange = ({ file }) => {
                if(file.response){
                    result(file.response)
                        .success(async (key)=>{
                            const res = await medicine.addMany(key);

                            result(res)
                                .success(({data:{ addCount } }) =>{
                                    message.success(`成功添加 ${addCount} 种药物`);

                                    getList();
                                })
                        });
                }
            };
    const updateCount = (type,record) => {
        let word = '增加'

        if(type === 'OUT_COUNT'){
            word = '减少'
        }

        Modal.confirm({
            title:`要${word}多少库存`,
            content:(
                <div>
                    <Input class="__medicine_input_count"></Input>
                </div>
            ),
            onOk:async() => {
                const el = document.querySelector('.__medicine_input_count');

                const res = await medicine.updateCount({
                    id:record._id,
                    num:el.value,
                    type,
                });

                result(res)
                    .success((data) => {
                        console.log(data);
                    })
            },
        })
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
            curEditMedicine,
            updateCurMedicine,
            onUploadChange,
            updateCount,
        };
    },
});
