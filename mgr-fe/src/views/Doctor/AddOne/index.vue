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
          <!-- <a-input v-model:value="addForm.doctorImg" /> -->
          <a-upload action="http://localhost:3000/upload/file" v-model:value="addForm.doctorImg">
          <a-button>
            <upload-outlined></upload-outlined>
            上传图片
          </a-button>
        </a-upload>
        </a-form-item>
        <a-form-item label="姓名">
          <a-input v-model:value="addForm.name" />
        </a-form-item>
        <a-form-item label="医院">
          <a-input v-model:value="addForm.hospital" />
        </a-form-item>
        <a-form-item label="职称">
          <a-input v-model:value="addForm.position" />
        </a-form-item>
        <a-form-item label="科室">
          <a-input v-model:value="addForm.department" />
        </a-form-item>
        <a-form-item label="擅长">
          <a-input v-model:value="addForm.goodAt" />
        </a-form-item>
        <a-form-item label="医院等级">
          <a-input v-model:value="addForm.hospitalGrade" />
        </a-form-item>
        <a-form-item label="添加时间">
          <a-date-picker v-model:value="addForm.creationTime" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>