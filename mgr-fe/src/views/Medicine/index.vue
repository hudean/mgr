<template>
  <div>
    <a-card>
      <h2 style="color:#3c8dbc;">药物列表</h2>

      <a-divider></a-divider>
        <div class="operation">
        <div class="search">
          <a-input-search 
          placeholder="根据药品名称搜索" 
          enter-button 
          v-model:value="keyword"
          @search="onSearch"
          />
          <a v-if="isSearch" href="javascript:;" @click="backAll">返回</a>
        </div>
        <div class="upload">
          <a-button @click="show = true">添加药品</a-button>
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
        <template #count="data">
          <a href="javascript:;" @click="updateCount('IN_COUNT',data.record)">入库</a>
          {{ data.record.count}}  
          <a href="javascript:;"  @click="updateCount('OUT_COUNT',data.record)">出库</a>        
        </template>
        <template #actions="record">
          <a class="edit" href="javascript:;" @click="update(record)">编辑</a>
          &emsp;
          <a class="del" href="javascript:;" @click="remove(record)">删除</a>          
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
    :medicine="curEditMedicine"
    :update="updateCurMedicine"
    ></update>
  </div>
</template>

<script src="./index.jsx">
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