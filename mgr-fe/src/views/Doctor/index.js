import { defineComponent,ref,onMounted } from 'vue';
import { doctor } from '@/service';
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
    props:{
        simple:Boolean,
    },
    data(){
        return{
            imgUrl:'',
        }
    },
    setup(props) {
        const columns = [
            {
                title: '头像',
                // dataIndex: 'doctorImg'
                slots:{
                    customRender:'doctorImg'
                }
            },
            {
                title: '姓名',
                dataIndex: 'name'
            },
            {
                title: '医院',
                dataIndex: 'hospital'
            },
            {
                title: '职称',
                dataIndex: 'position'
            },
            {
                title: '科室',
                dataIndex: 'department'
            },
            {
                title: '擅长',
                dataIndex: 'goodAt'
            },
            {
                title: '医院等级',
                dataIndex: 'hospitalGrade'
            },
            {
                title: '个人简介',
                dataIndex: 'personalProfile'
            },
            {
                title: '创建时间',
                slots:{
                    customRender:'creationTime'
                }
            },
        ];

        if(!props.simple){
            columns.push({
                title: '操作',
                slots:{
                    customRender:'actions'
                }
            },)
        }

        const show = ref(false);
        const showUpdateModal = ref(false);
        const list = ref([]);
        const total = ref(0);
        const curPage = ref(1);
        const keyword = ref('');
        const isSearch = ref(false);
        const curEditDoctor = ref({});
        const showImg = ref('');

    // 获取文章列表
    const getList = async () => {
        const res = await doctor.list({
          page: curPage.value,
          size: 10,
          keyword: keyword.value,
        });
  
        result(res)
          .success(({ data }) => {
            const { list: l, total: t } = data;
            list.value = l;
            total.value = t;
          });
      };

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
             
           const res = await doctor.remove(_id);

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
            curEditDoctor.value = record;
        };

        const updateCurDoctor = () => {
            Object.assign(curEditDoctor.value,newData);
        };

            const onUploadChange = ({ file }) => {
                if(file.response){
                    result(file.response)
                        .success(async (key)=>{
                            const res = await doctor.addMany(key);

                            result(res)
                                .success(({data:{ addCount } }) =>{
                                    message.success(`成功添加 ${addCount} 名医生`);
                                    console.log(data);
                                    getList();
                                })
                        });
                }
            };
            // 刷新
            const refresh = () => {
                getList();
            }
            const sendImg = async (data) => {
                console.log(data)
                let showImg=data
            }
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
            curEditDoctor,
            updateCurDoctor,
            onUploadChange,
            getList,
            refresh,
            sendImg,
            showImg,
            simple:props.simple
        };
    },
    // methods:{
    //     sendImg(val){
    //         this.imgUrl = val;
    //         console.log(this.imgUrl)
    //     }
    // }
});
