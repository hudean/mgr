<template>
  <div>
    <a-card>
      <h2 style="color:#3c8dbc;">咨询列表</h2>
      <a-divider></a-divider>
      <div class="operation">
        <div class="search">
          <a-input-search
            placeholder="根据咨询者搜索"
            enter-button
            v-model:value="keyword"
            @search="onSearch"
          />
          <a-button v-if="isSearch" href="javascript:;" @click="backAll" class="backAll">返回</a-button>
          <a-button href="javascript:;" @click="refresh" class="refresh">刷新</a-button>
        </div>
        <div class="upload">
          <a-button @click="show = true">添加咨询</a-button>&nbsp;
          <!-- 上传图片 -->
          <a-upload @change="onUploadChange" action="http://localhost:3000/upload/file">
            <a-button type="primary">上传 Excel 添加</a-button>
          </a-upload>
        </div>
      </div>

      <a-divider></a-divider>

      <a-table :columns="columns" :data-source="list" :pagination="false" bordered ellipsis="true">
        <template #ConsultImg="{record }">
          <!-- {{record.ConsultImg}} -->
          <a :href="record.ConsultImg" target="_blank">
            <img :src="record.ConsultImg" alt style="width:80px;height:70px;object-fit:cover;"  />
          </a>
        </template>
        <template #createdAt="{record }">{{formatTimestamp(record.meta.createdAt)}}</template>
        <template #actions="record">
          <a href="javascript:;" @click="update(record)" class="edit">回复</a>
          &emsp;
          <a href="javascript:;" @click="remove(record)" class="delete">删除</a>
        </template>
      </a-table>
      <space-between style="margin-top:23px">
        <div></div>
        <a-pagination v-model:current="curPage" :total="total" :page-size="10" @change="setPage"></a-pagination>
      </space-between>
    </a-card>

    <add-one v-model:show="show" @getList="getList"></add-one>

    <update
      v-model:show="showUpdateModal"
      :consult="curEditConsult"
      :update="updateCurConsult"
      @getListEdit="getList"
    ></update>
  </div>
</template>

<script src="./index.js">
export default {
  data() {
    return {
      dialogUploadVisible: false,
    };
  },
  methods: {
    dialogUploadHandle() {
      this.dialogUploadVisible = true;
    },
  },
  created: function () {},
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>