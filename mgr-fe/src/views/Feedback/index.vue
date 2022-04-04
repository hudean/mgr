<template>
  <div>
    <a-card>
      <h2 style="color:#3c8dbc;">反馈信息</h2>

      <a-divider></a-divider>
        <div class="operation">
        <div class="search">
          <a-input-search 
          placeholder="根据名字搜索" 
          enter-button 
          v-model:value="keyword"
          @search="onSearch"
          />
          <a-button v-if="isSearch" href="javascript:;" @click="backAll">返回</a-button>
          <a-button href="javascript:;" @click="refresh">刷新</a-button>
        </div>
        <!-- <div class="upload">
          &nbsp;
          <a-upload 
            @change="onUploadChange"
            action="http://localhost:3000/upload/file"
          >
            <a-button type="primary">上传 Excel 添加</a-button>
          </a-upload>
        </div> -->
        </div>

      <a-divider></a-divider>

      <a-table 
      :columns="columns" 
      :data-source="list"
      :pagination="false"
      >
        <template #createdAt="{record }">
            {{formatTimestamp(record.meta.createdAt)}}
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
    @getList="getList"
    ></add-one>

    <update 
    v-model:show="showUpdateModal"
    :feedback="curEditFeedback"
    :update="updateCurFeedback"
    ></update>
    <!-- <img src="../../../../mgr-be/upload/0de90267-313f-406e-94cd-d6d3d2c24d41.jpg" alt=""> -->
  </div>
</template>

<script src="./index.js">
</script>

<style lang="scss" scoped>
@import "./index.scss";

</style>