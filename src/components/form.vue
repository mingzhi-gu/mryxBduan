<template>
  <a-form-model layout="inline" :model="formSearch" @submit="handleSubmit" @submit.native.prevent>
    <a-form-model-item>
      <a-input v-model="formSearch.searchWord" placeholder="搜索关键字">
      </a-input>
    </a-form-model-item>
     <a-select
    placeholder="类目"
    style="width: 200px"
    @change="handleChange"
    allowClear
  >
    <a-select-option :value="item.name" v-for="item in categoryList" :key="item.id">
      {{item.name}}
    </a-select-option>
  </a-select>
    <a-form-model-item>
      <a-button
        type="primary"
        html-type="submit"
      >
        搜索
      </a-button>
    </a-form-model-item>
        <div >
          <router-link to="/product/productAdd" class="addProduct"> 添加商品</router-link>
        </div>
  </a-form-model>

</template>
<script>
export default {
  props: ['categoryList'],
  data() {
    return {
      formSearch: {
        searchWord: '',
        category: '',
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', this.formSearch);
    },
    handleChange(val) {
      console.log(val);
      this.categoryList.forEach((item) => {
        if (item.name === val) {
          this.formSearch.category = item.id;
        }
      });
      if (!val) {
        this.formSearch.category = '';
      }
    },
  },
};
</script>
<style lang="less">
    .productList{
      position: relative;
      .addProduct{
      width: 100px;
      position: absolute;
      right: 10px;
      top: 14px;
    }
    }
</style>
