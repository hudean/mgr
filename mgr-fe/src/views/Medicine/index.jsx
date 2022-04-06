import { defineComponent,ref,onMounted } from 'vue';
import { medicine } from '@/service';
import { useRouter } from 'vue-router';
import { message,Modal,Input  } from 'ant-design-vue';
import { BookFilled, UploadOutlined } from '@ant-design/icons-vue';
import { result,formatTimestamp } from '@/helpers/utils';
import AddOne from './AddOne/index.vue';
import Update from './Update/index.vue';
import { Item } from 'ant-design-vue/lib/menu';

const MEDICINE_CONST = {
    IN:'IN_COUNT',
    OUT:'OUT_COUNT',
};

export default defineComponent({
    components:{
        AddOne,
        Update,
    },
    setup() {
        const router = useRouter();

        const columns = [
            {
                title: '药品名称',
                dataIndex: 'drugName'
            },
            {
                title: '价格',
                dataIndex: 'price'
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
                title: '药品图片',
                slots:{
                    customRender:'medicineImg'
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
                slots:{
                    customRender:'createdAt'
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


        // 删除一个药品的信息
        const remove = async ({ text:record }) => {
           const { _id } = record; 
             
           const res = await medicine.remove(_id);

           result(res)
            .success(({ msg }) => {
                message.success(msg);
                getList();
            });
        };
        // 显示更新弹框
        const update = ({ record }) => {
            showUpdateModal.value = true;
            curEditMedicine.value = record;
        };
        // 更新列表的某一行数据
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
                let num = el.value;

                const res = await medicine.updateCount({
                    id:record._id,
                    num,
                    type,
                });

                result(res)
                    .success((data) => {
                        if(type === MEDICINE_CONST.IN){
                            // 入库操作
                            num = Math.abs(num);
                        }else{
                            // 出库操作
                            num = -Math.abs(num);
                        }
                        const one = list.value.find((item) => {
                            return item._id === record._id;
                        });
                        if(one){
                            one.count = one.count + num;

                            message.success(`成功${word} ${Math.abs(num)} 本书`);
                        }
                    })
            },
        })
    };

    const refresh = () => {
        getList();
    }
    // 进入药物详情页
    const toDetail = ({record}) => {
        router.push(`/medicine/${record._id}`);
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
            toDetail,
            getList,
            refresh,
        };
    },
});
