# npm发布Vue组件包
## 方案一：
### 版本

- webpack: 5.60.0
- webpack-cli: 4.9.1

### 前提准备
1. 用npm账号
2. npm镜像：确保你的registry是[www.npmjs.com/](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2F "https://www.npmjs.com/"), 而不是淘宝源


### 步骤
1. 编写一手机端日记组件 calendar/Index.vue
2. 在根目录创建一个index.js文件,内容大致如下
```
import vCalendar from './calendar/Index.vue'

const install = function (Vue) {
    Vue.component(vCalendar.name, vCalendar)
}
// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue) // 通过use方式全部引入
}
vCalendar.install = install;
export default vCalendar
```

3. 在根目录新建一个webpack.config.js
```
const TerserPlugin = require("terser-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    target: ['web', 'es5'],
    entry: {
        index: ['./index.js']
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
        chunkFilename: "[name].js",
        // 这将在所有模块定义下暴露你的库, 允许它与 CommonJS、AMD 和作为全局变量工作
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            },

            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: ['vue-style-loader',
                            'css-loader',
                            'sass-loader'],
                    },
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
        //  处理图片
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]',
                    esModule: false,
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({}),
      // important
        new VueLoaderPlugin()
    ],
    watchOptions: {
        ignored: /node_modules/,
    },
}
```

## 方案二：



https://cli.vuejs.org/zh/guide/build-targets.html#%E5%BA%94%E7%94%A8






[Webpack打包图片路径问题](https://www.jianshu.com/p/794c5f301169?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation)

参考文档
https://blog.csdn.net/henjuewang/article/details/100561172
[vue组件发布npm最佳实践](https://juejin.cn/post/6844903620916281358)



https://cn.vuejs.org/v2/cookbook/form-validation.html
https://www.yuque.com/femessage
