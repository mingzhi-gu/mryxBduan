<template>
     <a-form-model ref="ruleForm"
  :model="form" :rules="rules"
  :label-col="{span: 4}"
  :wrapper-col="{span: 13  }">
    <a-form-model-item label="商品价格" prop="price" required>
      <a-input v-model="form.price" />
    </a-form-model-item>
    <a-form-model-item label="商品折扣价" prop="price_off">
      <a-input v-model="form.price_off" />
    </a-form-model-item>
    <a-form-model-item label="商品库存" required prop="inventory">
       <a-input v-model="form.inventory" />
    </a-form-model-item>
    <a-form-model-item label="计算单位" prop="unit" required>
      <a-input v-model="form.unit" />
    </a-form-model-item>
    <a-form-model-item label="商品相册" prop="images" >
      <a-upload
      :action="'https://mallapi.duyiedu.com/upload/images?appkey=' + $store.state.user.appkey"
      list-type="picture-card"
      :file-list="fileList"
      @preview="handlePreview"
      @change="handleChange"
      name="avatar"
    >
      <div v-if="fileList.length < 8">
        <a-icon type="plus" />
        <div class="ant-upload-text">
          Upload
        </div>
      </div>
       <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
    </a-upload>
    </a-form-model-item>
     <a-button @click="prev" style="primary">上一步</a-button>
    <a-button @click="next" style="primary">提交</a-button>
  </a-form-model>
</template>
<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  created() {
    console.log(this.form);
    if (this.form.images.length > 0) {
      this.fileList = this.form.images.map((item, index) => ({
        uid: index,
        name: `image${index}.png`,
        status: 'done',
        url: item,
      }));
    }
  },
  props: ['form'],
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      rules: {

      },
      fileList: [
      ],
      imgArr: [],
    };
  },
  methods: {
    async handlePreview(file) {
      const obj = file;
      if (!file.url && !file.preview) {
        obj.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ file, fileList }) {
      this.fileList = fileList;
      console.log(file);
      if (file.status === 'done') {
        this.form.images.push(file.response.data.url);
      } else if (file.status === 'removed') {
        const { url } = file.response.data;
        this.form.images = this.form.images.filter((item) => item !== url);
      }
      console.log(this.form.images);
      // }
    },
    handleCancel() {
      this.previewVisible = false;
    },
    next() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          alert('submit!');
          this.$emit('next', this.form);
          return true;
        }
        console.log('error submit!!');
        return false;
      });
    },
    prev() {
      this.$emit('prev');
    },
    // getactionImg() {
    //   return 'https://mallapi.duyiedu.com/upload/images?appkey=' + this.$store.state.user.appkey;
    // },
  },
};
</script>
<style>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
