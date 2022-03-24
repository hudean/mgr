<template>
  <div>
    <a-modal 
    title="添加医生" 
    :visible="props.show" 
    @ok="submit"
    @cancel="close"
    >
      <a-form :model="formState" :label-col="{span:6}" :wrapper-col="{span:12}">
        <a-form-item label="反馈内容">
          <a-input v-model:value="editForm.FeedbackContent" />
        </a-form-item>
        <a-form-item label="反馈人">
          <a-input v-model:value="editForm.FeedbackUsers" />
        </a-form-item>
        <a-form-item label="反馈时间">
          <a-date-picker v-model:value="editForm.creationTime" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>