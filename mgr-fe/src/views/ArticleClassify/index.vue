<template>
    <div>
        <a-card title="文章分类管理">
            <div>
                <a-input 
                    v-model:value="title"
                    placeholder="输入文章分类" 
                    style="width:300px"
                >
                </a-input>
                &nbsp;
                <a-button @click="add" type="primary">添加</a-button>
            </div>
            <a-divider></a-divider>
            <div>
                <a-table
                    bordered
                    :data-source="list"
                    :columns="columns"
                    :pagination="false"
                >
                    <template #actions="{record}">
                        <a-button 
                            size="small"
                            @click="updateTitle(record)" 
                         >
                            修改
                         </a-button>
                         &nbsp;
                         <a-button 
                            size="small"
                            @click="remove(record)" 
                            type="danger"
                         >
                            删除
                         </a-button>
                    </template>
                </a-table>
                
            </div>
        </a-card>
    </div>
</template>
<script src="./index.jsx"></script>