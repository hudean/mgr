<template>
  <div>
    <a-modal 
    title="修改信息" 
    :visible="props.show" 
    @ok="submit"
    @cancel="close"
    >
      <a-form :model="formState" :label-col="{span:6}" :wrapper-col="{span:12}">
        <a-form-item label="价格">
          <a-input v-model:value="editForm.price" />
        </a-form-item>
        <a-form-item label="药品名称">
          <a-input v-model:value="editForm.drugName" />
        </a-form-item>
        <a-form-item label="药房">
          <a-input v-model:value="editForm.pharmacy" />
        </a-form-item>
        <a-form-item label="库存">
          <a-input v-model:value="editForm.count" />
        </a-form-item>
        <a-form-item label="药物图片">
          <a-upload 
              action="http://localhost:3000/upload/file" 
              v-model:value="editForm.medicineImg"
              @change="handleChange"
          >
          <a-button>
            <upload-outlined></upload-outlined>
            上传图片
          </a-button>
        </a-upload>
        </a-form-item>
        <a-form-item label="生产企业">
          <a-input v-model:value="editForm.manufacturer" />
        </a-form-item>
        <a-form-item label="药品规格">
          <a-input v-model:value="editForm.specification" />
        </a-form-item>
        <a-form-item label="药品成分">
          <a-input v-model:value="editForm.element" />
        </a-form-item>
        <a-form-item label="主治功能">
          <a-input v-model:value="editForm.indications" />
        </a-form-item>
        <!-- <a-form-item label="添加时间">
          <a-date-picker v-model:value="editForm.creationTime" />
        </a-form-item> -->
      </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>