<template>
  <div >

    <a-modal 
    title="添加文章" 
    :visible="props.show" 
    @ok="submit"
    @cancel="close"
     width="1000px"
    >
      <a-form :model="formState" :label-col="{span:6}" :wrapper-col="{span:16}" style="1px solid red;">
        <a-form-item label="文章标题">
          <a-input v-model:value="editForm.ArticleTitle" />
        </a-form-item>
        <a-form-item label="文章类型">
          <a-input v-model:value="editForm.ArticleClassification" />
        </a-form-item>
        <a-form-item label="发布人">
          <a-input v-model:value="editForm.Distributor" />
        </a-form-item>
        <a-form-item label="发布时间">
          <a-date-picker v-model:value="editForm.creationTime" />
        </a-form-item>
        <a-form-item label="发布内容">
          <!-- <a-input v-model:value="editForm.DistributionContent" ></a-input> -->
          <WangEditor v-model:value="editForm.DistributionContent" @sendEditor='sendEditor'></WangEditor>
        </a-form-item>
        
      </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>