module.exports = file => () => import('@/views/' + file + '.vue')

//module.exports = r => require.ensure(file => () => import('@/views/' + file + '.vue'))
// const _import = require('@/router/_import_' + process.env.NODE_ENV)//获取组件的方法

// const Index1 = r => require.ensure([],() => r(require('@/components/Index1')), 'Index1');

// module.exports = function (file) {
//     return function () {
//       return import('@/views/' + file + '.vue');
//     };
//   };

  
//   "use strict";

//   var Index1 = function Index1(r) {
//     return require.ensure([], function () {
//       return r(require('@/components/Index1'));
//     }, 'Index1');
//   };