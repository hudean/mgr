import { defineComponent,onMounted,ref } from 'vue';
import { result } from '@/helpers/utils';
import Doctor from '@/views/Doctor/index.vue';
import Article from '@/views/Article/index.vue';
import { dashboard } from '@/service';


export default defineComponent({
    components:{
        Doctor,
        Article
    },
    setup(){
        const loading = ref(true);

        const baseInfo = ref({
            total:{
                article:0,
                user:0,
                doctor:0,
            },
        });

        const getBaseInfo = async () => {
            loading.value = true;
            const res = await dashboard.baseInfo();
            loading.value = false;

            result(res)
                .success(({ data }) => {
                    baseInfo.value = data;
                });
        };

        onMounted(() => {
            getBaseInfo();
        });

        return {
            baseInfo,
            loading,
        };
    },
});