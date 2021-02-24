<template>
  <div>
    <a-steps :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
        <bas-info v-if="current === 0" @next="next" :form="form" />
        <sales-info v-else-if="current === 1"  @next="next" @prev="prev" :form="form"/>
    </div>
  </div>
</template>
<script>
import basInfo from '@/components/basInfo.vue';
import salesInfo from '@/components/salesInfo.vue';

export default {
  data() {
    return {
      current: 0,
      steps: [
        {
          title: '填写商品基本信息',
        },
        {
          title: '填写商品销售信息',
        },
      ],
      form: {
        title: '',
        desc: '',
        category: '',
        c_items: [],
        tags: [],
        price: '',
        price_off: '',
        unit: '',
        inventory: '',
        images: [],

      },
    };
  },
  components: {
    basInfo,
    salesInfo,
  },
  methods: {

    next(form) {
      if (this.current === 1) {
        console.log(form);
        this.$axios.addProduct(form).then((res) => {
          console.log(res);
          this.$message.success('添加成功');
          this.$router.push({
            name: 'ProductList',
          });
        });
      } else {
        this.current += 1;
      }
      this.form = {
        ...this.form,
        form,
      };
    },
    prev() {
      this.current -= 1;
    },
  },
  created() {
    console.log(this.$route);
    const { id } = this.$route.params;
    if (id) {
      this.$axios.productData(id).then((res) => {
        this.form = res.data.data;
      });
    }
  },
};
</script>
<style scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}

.steps-action {
  margin-top: 24px;
}
</style>
