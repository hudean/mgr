<template>
  <div>
    <a-modal 
    title="添加文章" 
    :visible="props.show" 
    @ok="submit"
    @cancel="close"
    >
      <a-form :model="formState" :label-col="{span:6}" :wrapper-col="{span:12}">
        <a-form-item label="头像">
          <a-upload action="http://localhost:3000/upload/file" v-model:value="addForm.doctorImg">
          <a-button>
            <upload-outlined></upload-outlined>
            上传图片
          </a-button>
        </a-upload>
        </a-form-item>
        <a-form-item label="文章标题">
          <a-input v-model:value="addForm.ArticleTitle" />
        </a-form-item>
        <a-form-item label="文章分类">
          <a-input v-model:value="addForm.ArticleClassification" />
        </a-form-item>
        <a-form-item label="发布人">
          <a-input v-model:value="addForm.Distributor" />
        </a-form-item>
        <a-form-item label="发布内容">
          <a-input v-model:value="addForm.DistributionContent" />
        </a-form-item>
        <a-form-item label="发布时间">
          <a-date-picker v-model:value="addForm.creationTime" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>