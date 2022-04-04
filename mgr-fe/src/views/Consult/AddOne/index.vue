<template>
  <div>
    <a-modal 
    title="添加咨询" 
    :visible="props.show" 
    @ok="submit"
    @cancel="close"
    >
      <a-form :model="formState" :label-col="{span:6}" :wrapper-col="{span:12}">
        
        <a-form-item label="咨询者">
          <a-input v-model:value="addForm.Consultants" />
        </a-form-item>
        <a-form-item label="咨询内容">
          <a-input v-model:value="addForm.ConsultationContent" />
        </a-form-item>
        <a-form-item label="附加图片">
          <a-upload action="http://localhost:3000/upload/file" v-model:value="addForm.ConsultImg">
          <a-button>
            <upload-outlined></upload-outlined>
            上传图片
          </a-button>
        </a-upload>
        </a-form-item>
        <a-form-item label="是否公开">
          <a-input v-model:value="addForm.WhetherPublic" />
        </a-form-item>
        <a-form-item label="添加时间">
          <a-date-picker v-model:value="addForm.creationTime" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>