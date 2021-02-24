// const routerName = {
//   coustomer: [
//     {
//       name: 'Product',
//     },
//     {
//       name: 'ProductList',
//     },
//     {
//       name: 'ProductAdd',
//     },
//     {
//       name: 'CateGory',
//     },
//   ],
//   admin: [
//     {
//       name: 'Product',
//     },
//     {
//       name: 'ProductList',
//     },
//     {
//       name: 'ProductAdd',
//     },
//   ],

// };

// function filterRouter(role, router) {
//   // const roleName = routerName[role].map((i) => i.name);
//   // const allRouterName = router.filter((j) => {
//   //   const obj = j;
//   //   if (roleName.indexOf(j.name) !== -1) {
//   //     obj.children.filter((item) => roleName.indexOf(item.name) !== -1);
//   //     return true;
//   //   }
//   //   return false;
//   // });
//     const roleName = routerName[role].map((i) => i.name);
//     if (role === 'coustomer') {
//     let allRouterName = null;
//     allRouterName = router.filter((item) => {
//       if (roleName.indexOf(item.name) !== -1) {
//         return true;
//       }
//       return false;
//     });
//   }
//   // return allRouterName;
// }

// export default filterRouter;
