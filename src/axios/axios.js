import axios from 'axios';
import store from '../store';

const api = axios.create({
  baseURL: ' https://mallapi.duyiedu.com/',
});
// api.interceptors.request.use((config) =>
//   // if (config.url.includes('/passport')) {
//  console.log(config)
//   // }

//   // return {
//   //   ...config,
//   //   params: {
//   //     ...config.params,
//   //     appkey: store.state.user.appkey,
//   //   },
//   // };
// );
// api.interceptors.response.use((res) => {
//   console.log(res);
// });
api.interceptors.request.use((config) => {
  if (config.url.includes('/passport')) {
    return config;
  }

  return {
    ...config,
    params: {
      ...config.params,
      appkey: store.state.user.appkey,
    },
  };
});
const login = (params) => api.post('/passport/login', params);
const getCategoryList = () => api.get('/category/all');
const getproductList = (params) => api.get('/products/all', { params });
const removeData = (params) => api.delete(`/products/${params.id}`);
const addProduct = (params) => api.post('/products/add', params);
const actionImg = (params) => api.post('/upload/images', { params });
const productData = (params) => api.get(`/products/${params}`);
export default {
  login,
  getCategoryList,
  getproductList,
  removeData,
  addProduct,
  actionImg,
  productData,
};
