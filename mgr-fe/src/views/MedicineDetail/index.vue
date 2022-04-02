<template>
  <div>
    <a-card>
      <space-between>
        <div class="medicineName">{{d.drugName}}</div>
        <div v-only-admin>
          <a-button size="samll" type="primary" @click="showUpdateModal = true">编辑</a-button>&nbsp;
          <a-button size="samll" type="danger" @click="remove">删除</a-button>
        </div>
      </space-between>

      <a-divider></a-divider>
      <div class="base-info">
        <div class="items">
          <div class="item">
            <div class="title">药品价格：</div>
            <div class="content">{{d.price}}</div>
          </div>
          <div class="item">
            <div class="title">生产企业：</div>
            <div class="content">{{d.manufacturer}}</div>
          </div>
          <div  class="item">
            <div class="title">药品规格：</div>
            <div class="content">{{d.specification}}</div>
          </div>
        </div>
        <div class="items">
          <div  class="item">
            <div class="title">所属药房：</div>
            <div class="content">{{d.pharmacy}}</div>
          </div>
          <div  class="item">
            <div class="title">药品成分：</div>
            <div class="content">{{d.element}}</div>
          </div>
          <div  class="item">
            <div class="title">生产日期：</div>
            <div class="content">{{formatTimestamp(d.creationTime)}}</div>
          </div>
        </div>
      </div>
    </a-card>

    <div class="log">
        <a-card title="出入库日志">
            <template #extra>
              <span>
                  <a href="javascript:;" @click="logFilter('IN_COUNT')">
                    <CheckOutlined v-if="curLogType === 'IN_COUNT'" />
                    入库日志 
                  </a>
              </span>
              <span style="margin-left:12px;">
                  <a href="javascript:;" @click="logFilter('OUT_COUNT')">
                    <CheckOutlined v-if="curLogType === 'OUT_COUNT'" />
                    出库日志
                  </a>
                </span>
            </template>
            
            <div>
                <a-table 
                  :data-source="log"
                  :columns="columns"
                  bordered
                  :pagination="false"
                >
                <template #createdAt="{ record }">
                  {{formatTimestamp(record.meta.createdAt)}}
                </template>
                </a-table>
            </div>

            <space-between style="margin-top:24px;">
              <div />
              <a-pagination
                v-model:current="logCurPage"
                :total="logTotal"
                :page-size="10"
                @change="setLogPage"
              />
            </space-between>
        </a-card>
    </div>
    <update
      v-model:show="showUpdateModal"
      :medicine="d"
      :update="update"
     />
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
@import "./index.scss";
</style>