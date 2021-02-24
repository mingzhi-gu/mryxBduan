import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
// import filterRouter from '@/untils/filterRouter';
import Home from '../views/layout/Home.vue';

Vue.use(VueRouter);
// const asyncRouter = [
//   // {
//   //   path: '/product',
//   //   name: 'Product',
//   //   component: Home,
//   //   meta: {
//   //     title: '商品',
//   //     show: true,
//   //   },
//   //   children: [
//   //     {
//   //       path: 'productList',
//   //       name: 'ProductList',
//   //       component: () => import('../views/page/productList.vue'),
//   //       meta: {
//   //         title: '商品列表',
//   //         show: true,
//   //       },
//   //     },
//   //     {
//   //       path: 'productAdd',
//   //       name: 'ProductAdd',
//   //       component: () => import('../views/page/productAdd.vue'),
//   //       meta: {
//   //         title: '添加商品',
//   //         show: true,
//   //       },
//   //     },
//   {
//     path: 'category',
//     name: 'CateGory',
//     component: () => import('../views/page/category.vue'),
//     meta: {
//       title: '类目',
//       show: true,
//     },
//   },
//   //     {
//   //       path: '/product/edit/:id',
//   //       name: 'productEdit',
//   //       component: () => import('../views/page/productAdd.vue'),
//   //       meta: {
//   //         title: '编辑',
//   //         show: false,
//   //       },
//   //     },
//   //   ],
//   // },
// ];

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/statistics',
    meta: {
      title: '首页',
      show: true,
    },
    children: [
      {
        path: 'statistics',
        name: 'Statistics',
        component: () => import('../views/page/statistics.vue'),
        meta: {
          title: '统计',
          show: true,
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/layout/login.vue'),
    meta: {
      title: '登录',
      show: false,
    },
  },
  {
    path: '/product',
    name: 'Product',
    component: Home,
    meta: {
      title: '商品',
      show: true,
    },
    children: [
      {
        path: '/product/productList',
        name: 'ProductList',
        component: () => import('../views/page/productList.vue'),
        meta: {
          title: '商品列表',
          show: true,
        },
      },
      {
        path: '/product/productAdd',
        name: 'ProductAdd',
        component: () => import('../views/page/productAdd.vue'),
        meta: {
          title: '添加商品',
          show: true,
        },
      },
      // {
      //   path: '/product/category',
      //   name: 'CateGory',
      //   component: () => import('../views/page/category.vue'),
      //   meta: {
      //     title: '类目',
      //     show: true,
      //   },
      // },
      {
        path: '/product/edit/:id',
        name: 'productEdit',
        meta: {
          title: '编辑',
          show: false,
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
// let isAddRouter = false;
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    // if (!isAddRouter) {
    if (store.state.user.appkey && store.state.user.username && store.state.user.role) {
      // const filterRouters = filterRouter(store.state.user.role, asyncRouter);
      // if (store.state.user.role === 'coustomer') {
      // router.options.routes = routes.concat(asyncRouter[0]);
      // router.addRoute('Product', {
      //   path: 'category',
      //   name: 'CateGory',
      //   component: () => import('../views/page/category.vue'),
      //   meta: {
      //     title: '类目',
      //     show: true,
      //   },
      // });
      // }
      // routes = router.options.routes;
      store.dispatch('getRoutes', routes);
      // isAddRouter = true;
      return next();
    }
    // }
    return next('/login');
  }
  // isAddRouter = false;
  return next();
});

export default router;
