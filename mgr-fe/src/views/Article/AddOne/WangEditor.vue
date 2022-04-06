<template>
    <div id="main1">
    </div>
</template>

<script>
import E from 'wangeditor';

export default {
    data(){
        return {
            editor:"",
        };
    },
    mounted() {
        this.editor = new E('#main1');
        // 获取输入的值内容
        this.editor.config.onchange = newHtml => {
            // console.log("change 之后最新的 html ",newHtml);
            // 把富文本编辑的内容--传递给父组件
            this.$emit('sendEditor1',newHtml);
        };
        this.editor.config.onchangeTimeout = 500;
        this.editor.create();
    },
    methods:{
        infoClearFun(){
            console.log(111)
        }
    }
};
</script>
