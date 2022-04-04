<template>
  <div>
    <a-modal 
    title="添加咨询" 
    :visible="props.show" 
    @ok="submit"
    @cancel="close"
    width="1000px"
    >
      <a-form :model="formState" :label-col="{span:6}" :wrapper-col="{span:12}">
        <a-form-item label="咨询者">
          <a-input v-model:value="editForm.Consultants" disabled />
        </a-form-item>
        <a-form-item label="咨询内容">
          <!-- <a-input v-model:value="editForm.ConsultationContent" /> -->
           <a-textarea v-model:value="editForm.ConsultationContent"  :rows="4" disabled />
        </a-form-item>
        <a-form-item label="附加图片">
          <a-input v-model:value="editForm.ConsultImg" />
        </a-form-item>
        <a-form-item label="是否公开">
          <a-input v-model:value="editForm.WhetherPublic" disabled />
        </a-form-item>
        <a-form-item label="回复内容">
          <!-- <a-input v-model:value="editForm.Reply" /> -->
          <a-textarea v-model:value="editForm.Reply"  :rows="4" required="required"  />
        </a-form-item>
        <a-form-item label="回复者">
          <a-input v-model:value="editForm.Responder" required="required"  />
        </a-form-item>
        <a-form-item label="添加时间">
          <a-date-picker v-model:value="editForm.creationTime" disabled />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>