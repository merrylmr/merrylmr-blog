# VueCLI3打包优化--抽离依赖包
项目开发中，使用了很多依赖包，如`Vue`、路由管理`Vue-router`、状态管理`Vuex`、UI组件库(`ElementUI`、`Vant`)、图表（`echarts`）等。打包构建，发现有一些包体积过大，会影响首页加载速度。如下所示：
![image.png](https://upload-images.jianshu.io/upload_images/11899053-de060a0c0f6fe967.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

从上图的分析包中，可以将以下插件抽离：
- echarts
- vue-echarts
- elementUI
- vue
- vuex
- vue-router
- axios
- moment.js

需要删除的依赖包

- mock.js(在生产环境无需此依赖包)

## 如何生成分析包
VueCLI3自带了`webpack analzer`,可通过如下命令即可生成分析包内容，在`dist/report.html`
```
npm run build --report
```
更多请查看：
https://cli.vuejs.org/zh/guide/cli-service.html#vue-cli-service-serve

## 优化
减少打包体积、加快打包速度，常规的优化有以下两种：

1. **按需引用**

按需加载是通过只引用使用的组件来减少体积，这就会有一个问题：如果项目重度依赖第三方插件（如`ElementUI`、`vant`），那么此方案将无法减少打包的体积。

2. **CDN**

- 直接不参与打包，减小包体积、加快打包速度；

- 使用可靠的CDN服务可加快网站加载;


这里选择CDN的方式，**配置流程**：

1. vue.config.js下的配置如下
```
  externals: [
            {
                'vue': 'Vue',
                'vue-router': 'VueRouter',
                'vuex': 'Vuex',
                'element-ui': 'ELEMENT',
                'echarts': 'echarts',
                'vue-echarts': 'VueECharts',
                'moment': 'moment',
                'axios': 'axios',
            },  
           // vue-echarts引入的方式，需要如下去抽离
            'echarts/lib/echarts',
            /^echarts\/lib\/chart\/.+$/i,
            /^echarts\/lib\/component\/.+$/i,
        ]

```
2. 配置CDN

```
const cdn = {
    js: ['https://lib.baomitu.com/echarts/4.9.0-rc.1/echarts.min.js',
        'https://lib.baomitu.com/vue-echarts/5.0.0-beta.0/vue-echarts.min.js',
        'https://lib.baomitu.com/vue/2.6.10/vue.min.js',
        'https://lib.baomitu.com/vuex/3.1.0/vuex.min.js',
        'https://lib.baomitu.com/vue-router/3.0.6/vue-router.min.js',
        'https://lib.baomitu.com/moment.js/2.29.1/moment.min.js',
        'https://lib.baomitu.com/element-ui/2.15.1/index.min.js'],
    css: ['https://lib.baomitu.com/element-ui/2.15.1/theme-chalk/index.min.css']
}
module.exports = {
 configureWebpack:{......},
chainWebpack(config) {
    config.plugin('html').tap(opts => {
            opts[0].cdn = cdn;
            return opts
        })
  }
}


```
可根据环境变量，仅在线上采取使用CDN,开发环境直接使用npm依赖包即可。

```
const IsProd= process.env.NODE_ENV === 'production';

chainWebpack(config) {
    if (IsProd) {
        config.plugin('html').tap(opts => {
            opts[0].cdn = cdn;
            return opts
        })
  }
}

```
3. index.html文件
```
<!DOCTYPE html>
<html lang="en">
    <!-- 使用CDN的CSS文件 -->
    <% for (var i in htmlWebpackPlugin.options.cdn && htmlWebpackPlugin.options.cdn.css) { %>
      <link href="<%= htmlWebpackPlugin.options.cdn.css[i] %>" rel="preload" as="style">
      <link href="<%= htmlWebpackPlugin.options.cdn.css[i] %>" rel="stylesheet">
    <% } %>
    <!-- 使用CDN的JS文件 -->
    <% for (var i in htmlWebpackPlugin.options.cdn && htmlWebpackPlugin.options.cdn.js) { %>
      <link href="<%= htmlWebpackPlugin.options.cdn.js[i] %>" rel="preload" as="script">
    <% } %>
  </head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
    <% for (var i in htmlWebpackPlugin.options.cdn && htmlWebpackPlugin.options.cdn.js) { %>
      <script src="<%= htmlWebpackPlugin.options.cdn.js[i] %>"></script>
    <% } %>
  </body>
</html>
```

进行包分离以后，打包结果：
![image.png](https://upload-images.jianshu.io/upload_images/11899053-5cf8eba8355f9e56.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



## 注意
1. vue-charts抽离
   external需要用正则表达式来抽离
 ```
        'echarts/lib/echarts',
         /^echarts\/lib\/chart\/.+$/i,
         /^echarts\/lib\/component\/.+$/i,
```

### 多页面CDN 抽离
> 提示
> 当在 multi-page 模式下构建时，webpack 配置会包含不一样的插件 (这时会存在多个 html-webpack-plugin 和 preload-webpack-plugin 的实例)。如果你试图修改这些插件的选项，请确认运行 vue inspect。https://cli.vuejs.org/zh/config/#pages

`vue.config.js`的pages为：
```
pages: {
		// 后台管理
		index: {
			entry: 'src/pages/manage/index.js',
			template: 'src/pages/manage/index.html',
			filename: 'index.html',
			chunks: ['chunk-vendors', 'chunk-common', 'index']
		},
		// pc编辑器
		pc: {
			entry: 'src/pages/pc/index.js',
			template: 'src/pages/pc/index.html',
			filename: 'pc/index.html',
			chunks: ['chunk-vendors', 'chunk-common', 'pc']
		},
		// 渲染
		render: {
			entry: 'src/pages/render/index.js',
			template: 'src/pages/render/index.html',
			filename: 'render/index.html',
			chunks: ['chunk-vendors', 'chunk-common', 'render']
		},
	},
```
修改如下的地方：
```
//  注意：index、pc、render为pages下的名称
chainWebpack(config) {
    if (IsProd) {
    	['index', 'pc', 'render'].forEach(chunk => {
				config.plugin("html-" + chunk).tap(args => {
					args[0].cdn = cdn;
					return args;
				});
			})
  }
}


```

## 参考文档
[外部扩展(externals)](https://www.webpackjs.com/configuration/externals/)
[使用webpack的externals来指定echarts无法减少包的大小](https://github.com/ecomfe/vue-echarts/issues/92)

[vue-cli利用webpack-bundle-analyzer分析构建产物](https://blog.csdn.net/sanchuanhi/article/details/105259027)
