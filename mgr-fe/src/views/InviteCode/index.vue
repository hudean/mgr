<template>
    <div>
        <a-card>
            <h2>邀请码管理</h2>
            <div>
               <a-input-number v-model:value="count" :min="1" :max="10000" />  
               &nbsp;
               <a-button type="primary" @click="add">添加</a-button>
            </div>
            <a-divider></a-divider>
            <div>
                <a-table
                    bordered
                    :columns="columns"
                    :data-source="list"
                    :pagination="false"
                >
                <template #actions ="{record}">
                    <a-button 
                        @click="remove(record)" 
                        type="danger"
                        size="small"
                    >
                        删除
                    </a-button>
                </template>
                <template #status ="{record}">
                   {{record.user ? '已使用':'未使用'}}
                </template>
                </a-table>
            </div>

            <flex-end style="margin-top:24px">
                <a-pagination
                v-model:current="curPage"
                :total="total"
                :pageSize="10"
                @change="setPage"
                ></a-pagination>
            </flex-end>
        </a-card>
    </div>
</template>
<script src="./index.js"></script>