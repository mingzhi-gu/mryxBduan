<template>
  <div class="main-header">
    <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
      <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button>
    <div class="breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item>{{currentRoute[0].meta.title}}</a-breadcrumb-item>
        <a-breadcrumb-item>
          <a href>{{currentRoute[1].meta.title}}</a>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <ul class="user-info">
      <li>
        欢迎{{this.$store.state.user.username}}
        <a-icon type="down" />
      </li>
      <li @click="removeCookie" class="logout">退出</li>
    </ul>
  </div>
</template>
<script>
import cookies from '@/untils/cookie';

export default {
  data() {
    return {
      currentRoute: this.$router.currentRoute.matched,
    };
  },
  watch: {
    $route() {
      this.currentRoute = this.$router.currentRoute.matched;
    },
  },
  methods: {
    toggleCollapsed() {
      this.$store.dispatch('changeCollapsed');
    },
    removeCookie() {
      cookies.removeCookie();
      this.$router.push('/login');
    },
  },
};
</script>
<style lang="less" scoped>
  .user-info{
    position: relative;
    .logout{
      width: 135px;
      position: absolute;
      right: 0;
      top: 50px;
      z-index: 11;
    }
  }
</style>
