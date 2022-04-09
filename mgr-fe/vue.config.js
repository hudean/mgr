//  module.exports = {
//   lintOnSave: false,
// }
// module.exports = {
//   pages: {
//     index: {
//           entry:"src/main.js",
//       },
//   },
//   devServer: {
//     proxy: {
//         '/api': {
//             target: 'https://yspm.api.storeapi.net/api/94/219?format=json&appid=14504&sign=05a9eb86624aead124f9aa5b742f0929',
//             pathRewrite:{'^/api':''},
//             ws: true,
//             changeOrigin: true
//         }
//     }
// },
//   lintOnSave: false,
// };


// module.exports = {
//   dev: {
//     assetsSubDirectory: 'static',
//     assetsPublicPath: '/',
//     proxyTable: {
//       '/api':{
//         target:'https://yspm.api.storeapi.net/api/94/219?format=json&appid=14504&sign=05a9eb86624aead124f9aa5b742f0929', //后期可以改
//         changeOrigin:true,
//         pathRewrite:{
//           '^/api': ''
//         }
//       }
//     }
//   },
//   lintOnSave: false,
// }

module.exports = {
  proxyTable: {
    '/api':{
      target:'https://yspm.api.storeapi.net/api/',
      changeOrigin:true,
      pathRewrite:{
        '^/api': ''
      }

    }
  }
}