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
          <a-button v-if="isSearch" href="javascript:;" @click="backAll">返回</a-button>
          <a-button @click="refresh" href="javascript:;">刷新</a-button>
        </div>
        <div class="upload">
          <a-button v-only-admin @click="show = true">添加药品</a-button>&nbsp;
          <!-- 上传图片 -->
          <a-upload @change="onUploadChange" action="http://localhost:3000/upload/file">
            <a-button type="primary">上传 Excel 添加</a-button>
          </a-upload>
        </div>
      </div>

      <a-divider></a-divider>

      <a-table :columns="columns" :data-source="list" :pagination="false" bordered ellipsis="true">
        <template #medicineImg="{ record }">
          <a :href="record.medicineImg" target="_blank">
            <img :src="record.medicineImg" alt style="width:80px;height:80px;object-fit: cover;
" />
          </a>
        </template>
        <template #createdAt="{ record }">{{ formatTimestamp(record.meta.createdAt) }}</template>
        <template #count="data">
          <a href="javascript:;" @click="updateCount('IN_COUNT',data.record)">入库</a>
          {{ data.record.count}}
          <a
            href="javascript:;"
            @click="updateCount('OUT_COUNT',data.record)"
          >出库</a>
        </template>
        <template #actions="record">
          <div class="act">
            <span class="detail" href="javascript:;" @click="toDetail(record)">详情</span>
            &emsp;
            <span
              v-only-admin
              class="edit"
              href="javascript:;"
              @click="update(record)"
            >编辑</span>
            &emsp;
            <span
              v-only-admin
              class="del"
              href="javascript:;"
              @click="remove(record)"
            >删除</span>
          </div>
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
      :medicine="curEditMedicine"
      :update="updateCurMedicine"
      @getListEdit="getList"
    ></update>
  </div>
</template>

<script src="./index.jsx">
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