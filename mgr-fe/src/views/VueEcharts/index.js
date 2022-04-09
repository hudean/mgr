import { defineComponent,ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      activeKey: ref('1'),
    };
  },
});
