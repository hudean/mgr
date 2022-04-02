import { defineComponent ,ref,onMounted} from 'vue';
import { articleClassify } from '@/service';
import { result } from '@/helpers/utils';
import { message,Modal,Input} from 'ant-design-vue';

const columns = [
    {
        title:'分类',
        dataIndex:'title',
    },
    {
        title:'操作',
        slots:{
            customRender:'actions',
        }
    }
];

export default defineComponent({
    setup(){
        const title = ref('');
        const list = ref([]);
        // 获取列表
        const getList = async() => {
            const res = await articleClassify.list();

            result(res)
                .success(({data}) => {
                    list.value = data;
                });
        };
        // 添加操作
        const add = async() => {
            const res = await articleClassify.add(title.value);
            result(res)
                .success(()=> {
                    getList();
                    title.value = '';
                });
        };

        // 加载时，获取列表数据
        onMounted(() => {
            getList();
        });
        // 删除操作
        const remove = async({ _id }) => {
            const res = await articleClassify.remove(_id);
            result(res)
                .success(( { msg }) => {
                    message.success(msg);
                    getList();
                });
        };
        // 编辑操作
        const updateTitle = async ({ _id,}) => {
            Modal.confirm({
                title:'请输入新的分类名称',
                content:(
                    <div>
                        <Input class="__article_classify_new_title"></Input>
                    </div>
                ),
                onOk:async() => {
                    const title = document.querySelector('.__article_classify_new_title').value;
                    
                    const res = await articleClassify.updateTitle(_id,title);

                    result(res)
                        .success(( { msg }) => {
                            message.success(msg);
                            
                            list.value.forEach((item) => {
                                if(item._id === _id){
                                    item.title = title;
                                    
                                }
                            })
                        });
                },
            });
        };

        return{
            add,
            list,
            title,
            columns,
            remove,
            updateTitle,
        }
    }
});