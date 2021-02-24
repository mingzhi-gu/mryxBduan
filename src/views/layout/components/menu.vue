<template>
      <div class="menu-list">
      <a-menu
        :default-selected-keys="[SelectedKeys]"
        :default-open-keys="[openKeys]"
        mode="inline"
        theme="dark"
        :inline-collapsed="$store.state.collapsed"
      >
      <template v-for=" route in this.$store.state.getRoutes">
          <a-sub-menu   :key="route.name" v-if="route.meta.show">
          <span slot="title" :key="route.name">
            <a-icon type="mail" />
            <span>
             {{route.meta.title}}
             </span>
          </span>
          <template v-for="child in route.children">
            <a-menu-item
          :key="child.name"
           v-if="child.meta.show"
            >
            <router-link :to="{name: child.name }"> {{child.meta.title}}</router-link>
            </a-menu-item>
          </template>
        </a-sub-menu>
      </template>
      </a-menu>
    </div>
</template>

<script>
export default {
  computed: {
    SelectedKeys: {
      get() {
        return this.$router.currentRoute.matched[1]
          ? this.$router.currentRoute.matched[1].name : '';
      },
    },
    openKeys: {
      get() {
        return this.$router.currentRoute.matched[0].name;
      },
    },
  },
};
</script>
