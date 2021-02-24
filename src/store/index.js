import Vue from 'vue';
import Vuex from 'vuex';
// import router from '../router';
import cookies from '../untils/cookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 用于切换菜单的闭合状态  false 代表不闭合  true代表闭合
    collapsed: false,
    user: cookies.getCookie(),
    getRoutes: [],
  },
  mutations: {
    changeCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    setUser(state, userInfo) {
      state.user = userInfo;
    },
    removeUser(state) {
      state.user = {
        username: '',
        appkey: '',
        role: '',
        email: '',
      };
    },
    getRoutes(state, route) {
      state.getRoutes = route;
    },
  },
  actions: {
    changeCollapsed({ commit }) {
      commit('changeCollapsed');
    },
    setUser({ commit }, userInfo) {
      commit('setUser', userInfo);
      cookies.setCookie(userInfo);
    },
    removeUser({ commit }) {
      commit('setUser');
      cookies.removeCookie();
    },
    getRoutes({ commit }, route) {
      commit('getRoutes', route);
    },
  },
  modules: {
  },
});
