import { defineComponent,ref,onMounted,reactive } from 'vue';
import { user } from '@/service';
import { message } from 'ant-design-vue';
import { EditOutlined } from '@ant-design/icons-vue';
import AddOne from './AddOne/index.vue';
import { result,formatTimestamp } from '@/helpers/utils';
import { getCharacterInfoById } from '@/helpers/character';
import store from '@/store';

const columns = [
    {
        title: '账户',
        dataIndex: 'account'
    },
    {
        title: '创建时间',
        slots:{
            customRender:'createdAt'
        }
    },
    {
        title: '角色',
        slots:{
            customRender:'character'
        }
    },
    {
        title: '操作',
        slots:{
            customRender:'actions'
        }
    },
];

export default defineComponent({
    components:{
        AddOne,
        EditOutlined
    },
    setup(){
        const list = ref([]);
        const total = ref(0);
        const curPage = ref(1);
        const showAddModal = ref(false);
        const keyword = ref('');
        const isSearch = ref(false);
        const showEditCharacterModal = ref(false);


        const editForm = reactive({
            character:'',
            current:{},
        })

        const getUser = async () => {
            const res = await user.list(curPage.value,10,keyword.value);

            result(res)
                .success(({data:{list:refList,total:refTotal}})=>{
                    list.value = refList;
                    total.value = refTotal;
                });
        };
        onMounted(() => {
            getUser();
        });

        const remove = async ({ _id }) => {
            const res = await user.remove(_id);

            result(res)
                .success(({ msg }) => {
                    message.success(msg);
                    getUser();
                });
        };

        const setPage = (page) =>{
            curPage.value = page;

            getUser();
        }

        const resetPassword = async({ _id })=>{
            const res = await user.resetPassword(_id);

            result(res)
                .success(({ msg }) => {
                    message.success(msg);
                })
        }

        const onSearch = () => {
            getUser();
            // isSearch.value = true;
            isSearch.value = !!keyword.value;
        };
        const backAll = () => {
            isSearch.value = false;
            keyword.value = '';
            getUser();
        };

        const onEdit = (record) => {
            editForm.current = record;
            editForm.character = record.character;
            showEditCharacterModal.value = true;
        };

        const updateCharacter = async () => {
            const res = await user.editCharacter(editForm.character,editForm.current._id);

            result(res)
                .success(({ msg })=> {
                    message.success(msg);
                    showEditCharacterModal.value = false;
                    editForm.current.character = editForm.character;
                })
        }

        return {
            list,
            total,
            curPage,
            columns,
            formatTimestamp,
            remove,
            showAddModal,
            getUser,
            setPage,
            resetPassword,
            keyword,
            onSearch,
            backAll,
            isSearch,
            getCharacterInfoById,
            showEditCharacterModal,
            editForm,
            onEdit,
            updateCharacter,
            characterInfo:store.state.characterInfo,
        }
    }
});