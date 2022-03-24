<template>
  <div>
    <a-card>
      <h2 style="color:#3c8dbc;">文章列表</h2>

      <a-divider></a-divider>
        <div class="operation">
        <div class="search">
          <a-input-search 
          placeholder="根据标题搜索" 
          enter-button 
          v-model:value="keyword"
          @search="onSearch"
          />
          <a v-if="isSearch" href="javascript:;" @click="backAll">返回</a>
        </div>
        <div class="upload">
          <a-button @click="show = true">添加文章</a-button>
          &nbsp;
          <!-- 上传图片 -->
          <a-upload 
            @change="onUploadChange"
            action="http://localhost:3000/upload/file"
          >
            <a-button type="primary">上传 Excel 添加</a-button>
          </a-upload>
        </div>
        </div>

      <a-divider></a-divider>

      <a-table 
      :columns="columns" 
      :data-source="list"
      :pagination="false"
      >
        <template #creationTime="data">
          {{ formatTimestamp(data.record.creationTime) }}          
        </template>
        <template #actions="record">
          <a href="javascript:;" @click="update(record)">编辑</a>
          &emsp;
          <a href="javascript:;" @click="remove(record)">删除</a>          
        </template>
      </a-table>
      <space-between style="margin-top:23px">
        <div></div>
        <a-pagination
          v-model:current="curPage"
          :total="total"
          :page-size="10"
          @change="setPage"
        ></a-pagination>
      </space-between>
    </a-card>
    
    <add-one 
    v-model:show="show"
    ></add-one>

    <update 
    v-model:show="showUpdateModal"
    :article="curEditArticle"
    :update="updateCurArticle"
    ></update>
    <!-- <img src="../../../../mgr-be/upload/0de90267-313f-406e-94cd-d6d3d2c24d41.jpg" alt=""> -->
  </div>
</template>

<script src="./index.js">
  export default {
    data() {
      return {
        dialogUploadVisible:false
      }
    },
    methods: {
      dialogUploadHandle(){
        this.dialogUploadVisible = true;
      }
    },
    created: function () {
    }
  }

</script>

<style lang="scss" scoped>
@import "./index.scss";

</style>