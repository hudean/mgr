<template>
  <div>
    <a-modal 
    title="添加医生" 
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
        <a-form-item label="反馈内容">
          <a-input v-model:value="addForm.FeedbackContent" />
        </a-form-item>
        <a-form-item label="反馈用户">
          <a-input v-model:value="addForm.FeedbackUsers" />
        </a-form-item>
        <a-form-item label="反馈时间">
          <a-date-picker v-model:value="addForm.creationTime" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>