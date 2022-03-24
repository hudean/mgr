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
          <a-input v-model:value="editForm.Consultants" />
        </a-form-item>
        <a-form-item label="咨询内容">
          <a-input v-model:value="editForm.ConsultationContent" />
        </a-form-item>
        <a-form-item label="是否公开">
          <a-input v-model:value="editForm.WhetherPublic" />
        </a-form-item>
        <a-form-item label="添加时间">
          <a-date-picker v-model:value="editForm.creationTime" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>