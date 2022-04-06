<template>
  <div>
    <a-card :title="simple ? '最近添加的文章':''">
      <div v-if="!simple">
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
            <a-button v-if="isSearch" href="javascript:;" @click="backAll" class="backBtn">返回</a-button>
            <a-button class="refresh" @click="refresh">刷新</a-button>
          </div>

          <div class="upload">
            <a-button @click="show = true">添加文章</a-button>&nbsp;
            <!-- 上传图片 -->
            <a-upload @change="onUploadChange" action="http://localhost:3000/upload/file">
              <a-button type="primary">上传 Excel 添加</a-button>
            </a-upload>
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
        <template #ArticleImg="{record }">
          <a :href="record.ArticleImg" target="_blank">
            <img :src="record.ArticleImg" alt style="width:80px;height:70px;object-fit:cover;" />
          </a>
        </template>
        <template #createdAt="{record }">{{formatTimestamp(record.meta.createdAt)}}</template>
        <template #actions="record" v-if="!simple">
          <a href="javascript:;" @click="update(record)" class="edit" >编辑</a>
          &emsp;
          <a href="javascript:;" @click="remove(record)" class="delete">删除</a>
        </template>
        <template
          #ArticleClassification="{ record }"
        >
        {{ getClassifyTitleById(record.ArticleClassification) }}
        <!-- {{ record.ArticleClassification }} -->
        </template>
      </a-table>
      <space-between v-if="!simple" style="margin-top:23px">
        <div></div>
        <a-pagination v-model:current="curPage" :total="total" :page-size="10" @change="setPage"></a-pagination>
      </space-between>
    </a-card>

    <add-one v-model:show="show" @getList="getList" :classifyList="articleClassifyList"></add-one>

    <update
      v-model:show="showUpdateModal"
      :article="curEditArticle"
      :update="updateCurArticle"
      @getListEdit="getList"
    ></update>
    <div>{{ $t('msg.test') }}</div>
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
  },
  created: function () {},
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>