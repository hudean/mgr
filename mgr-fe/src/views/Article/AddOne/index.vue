<template>
  <div>
    <a-modal 
    title="添加文章" 
    :visible="props.show" 
    @ok="submit"
    @cancel="close"
    width="1000px"
    >
      <a-form :model="formState" :label-col="{span:6}" :wrapper-col="{span:12}">
        <a-form-item label="文章标题">
          <a-input v-model:value="addForm.ArticleTitle" />
        </a-form-item>
        <a-form-item label="文章分类">
           <a-select
            ref="select"
            v-model:value="addForm.ArticleClassification"
            style="width: 120px"
          >
            <a-select-option 
            v-for="item in store.articleClassify"
            :key="item._id"
            :value="item._id"
            >
            {{item.title}}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="发布人">
          <a-input v-model:value="addForm.Distributor" />
        </a-form-item>
        <a-form-item label="发布内容">
          <!-- <a-input v-model:value="addForm.DistributionContent" /> -->
          <WangEditor v-model:value="addForm.DistributionContent" @sendEditor='sendEditor'></WangEditor>
        </a-form-item>
        <a-form-item label="文章图片">
          <a-upload action="http://localhost:3000/upload/file" v-model:value="addForm.doctorImg">
          <a-button>
            <upload-outlined></upload-outlined>
            上传图片
          </a-button>
        </a-upload>
        </a-form-item>
        <a-form-item label="发布时间">
          <a-date-picker v-model:value="addForm.creationTime" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>