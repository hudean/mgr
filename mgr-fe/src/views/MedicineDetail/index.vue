<template>
  <div>
    <a-card>
      <space-between>
        <div class="medicineName">{{d.drugName}}</div>
        <div>
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
                    <a href="javascript:;">出库日志</a>
                </span>
                <span style="margin-left:12px;">
                    <a href="javascript:;">入库日志</a>
                </span>
            </template>
            
            <div>
                <a-table 
                  bordered
                  :pagination="false"
                >
                </a-table>
            </div>

            <space-between style="margin-top:24px;">
              <div />
              <a-pagination />
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