import { defineComponent,onMounted,ref } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import { result,formatTimestamp } from '@/helpers/utils';
import { medicine } from '@/service';
import { message } from 'ant-design-vue';
import Update from '@/views/Medicine/Update/index.vue';

export default defineComponent({
    components:{
        Update,
    },
    setup(){
        const route = useRoute();
        const router = useRouter();

        const { id } = route.params;
        const detailInfo = ref({});
        const showUpdateModal = ref(false);

        const getDetail = async () => {
            const res = await medicine.detail(id);

            result(res)
               .success(({ data }) => {
                detailInfo.value = data;
               });
        };

        onMounted(() => {
            getDetail();
        });

        const remove = async () => {
            const res = await medicine.remove(id);

            result(res)
                .success(( { msg }) => {
                    message.success(msg);

                    router.replace('/medicine');
                });
        };
        const update = (medicine) => {
            Object.assign(detailInfo.value,medicine);
        };

        return {
            d:detailInfo,
            formatTimestamp,
            remove,
            showUpdateModal,
            update,
        };
    }
});