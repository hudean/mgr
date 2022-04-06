<template>
  <div>
    <a-card :title="simple ? '最近添加的医生':''">
      <div v-if="!simple">
        <h2 style="color:#3c8dbc;">医生列表</h2>

        <a-divider></a-divider>
        <div class="operation">
          <div class="search">
            <a-input-search
              placeholder="根据名字搜索"
              enter-button
              v-model:value="keyword"
              @search="onSearch"
            />
            <!-- <a v-if="isSearch" href="javascript:;" @click="backAll">返回</a> -->
            <a-button v-if="isSearch" @click="backAll" type="primary" class="backAll">返回</a-button>
            <a-button @click="refresh" type="primary" class="refresh">刷新</a-button>
          </div>
          <div class="upload">
            <a-button @click="show = true">添加医生</a-button>&nbsp;
            <!-- 上传图片 -->
            <a-upload @change="onUploadChange" action="http://localhost:3000/upload/file">
              <a-button type="primary">上传 Excel 添加</a-button>
            </a-upload>

            <!-- <a-upload action="http://localhost:3000/upload/file" v-model:file-list="fileList">
          <a-button>
            <upload-outlined></upload-outlined>
            上传图片
          </a-button>
            </a-upload>-->
            &nbsp;
            <!-- 上传Excel -->
            <!-- <a-upload 
            action="http://localhost:3000/upload/file"
          >
            <a-button @click="upload" type="primary">上传 Excel</a-button>
            </a-upload>-->
          </div>
        </div>

        <a-divider></a-divider>
      </div>
      <a-table
        :columns="columns"
        :data-source="list"
        :pagination="false"
        bordered
        :scroll="{x:'max-content'}"
      >
        <template #creationTime="data">{{ formatTimestamp(data.record.creationTime) }}</template>
        <template #doctorImg="{record}">
          <a :href="record.doctorImg" target="_blank">
            <img :src="record.doctorImg" alt style="width:90px;height:80px;object-fit:cover;" />
          </a>

          <!-- {{record.doctorImg}} -->
        </template>
        <template #actions="record" v-if="!simple">
          <a href="javascript:;" @click="update(record)" class="edit">编辑</a>
          &emsp;
          <a href="javascript:;" @click="remove(record)" class="delete">删除</a>
        </template>
      </a-table>
      <flex-end v-if="!simple" style="margin-top:23px">
        <a-pagination v-model:current="curPage" :total="total" :page-size="10" @change="setPage"></a-pagination>
      </flex-end>
    </a-card>

    <add-one v-model:show="show" @getList="getList" @sendImg="sendImg"></add-one>

    <update
      v-model:show="showUpdateModal"
      :doctor="curEditDoctor"
      :update="updateCurDoctor"
      @getListEdit="getList"
    ></update>
    <!-- <img src="../../../../mgr-be/upload/0de90267-313f-406e-94cd-d6d3d2c24d41.jpg" alt=""> -->
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
    imgData(data) {
      console.log(data);
    },
  },
  created: function () {},
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>