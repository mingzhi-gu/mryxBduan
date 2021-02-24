<template>
  <a-form-model ref="ruleForm"
  :model="form" :rules="rules"
  :label-col="{span: 4}"
  :wrapper-col="{span: 13  }">
    <a-form-model-item label="副标题" prop="title" required>
      <a-input v-model="form.title" />
    </a-form-model-item>
    <a-form-model-item label="商品描述" prop="desc">
      <a-input v-model="form.desc" />
    </a-form-model-item>
    <a-form-model-item label="商品类目" required prop="category">
      <a-select v-model="form.category" placeholder="请选择商品类目" @change="changeCategory">
        <a-select-option
          :value="item.id"
          v-for="item in categoryList"
          :key="item.id"
        >
          {{ item.name }}
        </a-select-option>
      </a-select>
      <a-select
       v-model="form.c_items"
       placeholder="请选择商品子类目">
        <a-select-option
         :value="item"
         v-for="item in categoryItem"
         :key="item">
          {{ item }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="商品标签" prop="tags" required>
      <a-select
        mode="tags"
        placeholder="填写商品标签"
        :default-value="['限时秒杀']"
        v-model="form.tags"
      >
        <a-select-option
        value="限时秒杀"
        > 限时秒杀 </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-button @click="next" style="primary">下一步</a-button>
  </a-form-model>
</template>
<script>
export default {
  data() {
    return {
      categoryList: [],
      categoryItem: [],
      rules: {

      },
    };
  },
  props: ['form'],
  created() {
    this.$axios.getCategoryList().then((res) => {
      this.categoryList = res.data.data.data;
      console.log(res.data.data.data);
    });
  },
  methods: {
    changeCategory(id) {
      console.log(id);
      for (let i = 0; i < this.categoryList.length; i += 1) {
        if (this.categoryList[i].id === id) {
          this.categoryItem = this.categoryList[i].c_items;
          console.log(this.categoryItem);
        }
      }
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
  },
};
</script>
