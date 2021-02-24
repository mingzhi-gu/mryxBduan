<template>
    <div class="productList">
        <list  @submit="searchsumit" :categoryList="categoryList"/>
        <tables
        :data="tableData"
         :page="page"
         @change="changePage"
         @edit="editProduct"
         @remove="remoevProduct"
         />
    </div>
</template>
<script>
import list from '@/components/form.vue';
import tables from '@/components/table.vue';

export default {
  components: {
    list,
    tables,
  },
  data() {
    return {
      formSearch: {
        searchWord: '',
        category: '',
      },
      tableData: [],
      page: {
        pageSize: 10,
        current: 1,
        showSizeChanger: true,
        total: 1,
      },
      categoryList: '',
      categoryObj: {},
    };
  },
  methods: {
    searchsumit(from) {
      this.formSearch = from;
      console.log(this.formSearch);
      this.productData();
    },
    productData() {
      this.$axios.getproductList({
        page: this.page.current,
        size: this.page.pageSize,
        ...this.formSearch,
      }).then((res) => {
        console.log(res.data.data);
        this.page.total = res.data.data.total;
        this.tableData = res.data.data.data.map((item) => ({
          ...item,
          categoryName: this.categoryObj[item.category].name,
        }));
        console.log(this.tableData);
      });
    },
    changePage(page) {
      this.page = page;
      this.productData();
    },
    editProduct(record) {
      this.$router.push({
        name: 'productEdit',
        params: {
          id: record.id,
        },
      });
    },
    remoevProduct(record) {
      this.$confirm({
        title: '删除该数据',
        content: () => <div style="color:red;">{`确定该数据${record.title}么`}</div>,
        onOk: () => {
          console.log(record.id);
          this.$axios.removeData(record).then(() => {
            this.productData();
          });
        },
        onCancel() {
          console.log('Cancel');
        },
        class: 'test',
      });
    },
  },
  async created() {
    await this.$axios.getCategoryList().then((res) => {
      console.log(res);
      this.categoryList = res.data.data.data;
      res.data.data.data.forEach((item) => {
        this.categoryObj[item.id] = item;
        console.log(this.categoryObj);
      });
    });
    this.productData();
  },
};
</script>
