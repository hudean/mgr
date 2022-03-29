<template>
  <div>
    <a-modal 
    title="添加医生" 
    :visible="props.show" 
    @ok="submit"
    @cancel="close"
    >
      <a-form :model="formState" :label-col="{span:6}" :wrapper-col="{span:12}">
        <a-form-item label="姓名">
          <a-input v-model:value="editForm.name" />
        </a-form-item>
        <a-form-item label="医院">
          <a-input v-model:value="editForm.hospital" />
        </a-form-item>
        <a-form-item label="职称">
          <a-input v-model:value="editForm.position" />
        </a-form-item>
        <a-form-item label="科室">
          <a-input v-model:value="editForm.department" />
        </a-form-item>
        <a-form-item label="擅长">
          <a-input v-model:value="editForm.goodAt" />
        </a-form-item>
        <a-form-item label="医院等级">
          <a-input v-model:value="editForm.hospitalGrade" />
        </a-form-item>
        <a-form-item label="个人简介">
          <a-input v-model:value="editForm.personalProfile" />
        </a-form-item>
        <a-form-item label="添加时间">
          <a-date-picker v-model:value="editForm.creationTime" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>