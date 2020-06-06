const path = require('path')
module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
	  configureWebpack: {
	    // provide the app's title in webpack's name field, so that
	    // it can be accessed in index.html to inject the correct title.
	    // name: name,
	    resolve: {
	      alias: {
	        // '@': resolve('src')
	      }
	    }
	  },
    // devServer: {
    //     proxy: {
    //         '/api':{
    //             target:'http://jsonplaceholder.typicode.com',
    //             changeOrigin:true,
    //             pathRewrite:{
    //                 '/api':''
    //             }
    //         }
    //     }
    // }
}
