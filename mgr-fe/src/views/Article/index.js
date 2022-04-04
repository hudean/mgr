import { defineComponent, ref, onMounted } from 'vue';
import { article,articleClassify } from '@/service';
import { message } from 'ant-design-vue';
import { BookFilled, UploadOutlined } from '@ant-design/icons-vue';
import { result, formatTimestamp } from '@/helpers/utils';
import { Item } from 'ant-design-vue/lib/menu';
import AddOne from './AddOne/index.vue';
import Update from './Update/index.vue';
import {getClassifyTitleById} from '@/helpers/article-classify';


export default defineComponent({
  components: {
    AddOne,
    Update,
  },
  props:{
    simple:Boolean,
  },
  setup(props) {
    const columns = [
      {
        title: '文章标题',
        dataIndex: 'ArticleTitle',
      },
      {
        title: '文章分类',
        slots: {
          customRender: 'ArticleClassification',
        },
      },
      {
        title: '分布人',
        dataIndex: 'Distributor',
      },
      {
        title: '分布内容',
        dataIndex: 'DistributionContent',
      },
      {
        title: '文章图片',
        dataIndex: 'ArticleImg',
      },
      {
        title: '发布时间',
        slots: {
          customRender: 'createdAt',
        },
      },
      // {
      //   title: '操作',
      //   slots: {
      //     customRender: 'actions',
      //   },
      // },
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
    const curEditArticle = ref({});
    // const articleClassifyList = ref([]);


    // // 获取文章分类的列表
    // const getArticleClassify = async () => {
    //   classifyLoading.value = true;
    //   const res = await articleClassify.list();
    //   classifyLoading.value = false;
    //   result(res)
    //     .success(({ data }) => {
    //       articleClassifyList.value = data;
    //     })
    // };


    // 获取文章列表
    const getList = async () => {
      const res = await article.list({
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
    };

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

    // 删除一条文章的信息
    const remove = async ({ text: record }) => {
      const { _id } = record;

      const res = await article.remove(_id);

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
      curEditArticle.value = record;
    };

    const updateCurArticle = () => {
      Object.assign(curEditArticle.value, newData);
    };

    const onUploadChange = ({ file }) => {
      if (file.response) {
        result(file.response)
          .success(async (key) => {
            const res = await article.addMany(key);

            result(res)
              .success(({ data: { addCount } }) => {
                message.success(`成功添加 ${addCount} 篇文章`);

                getList();
              });
          });
      }
    };

    // 点击刷新按钮
    const refresh = () => {
      getList();
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
      curEditArticle,
      updateCurArticle,
      onUploadChange,
      getList,
      getClassifyTitleById,
      // articleClassifyList,
      simple:props.simple,
      refresh,
    };
  },
});
