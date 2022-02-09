# webpack | 发布一个npm包
## 版本
webpack5

## 流程

- 安装`webpack`,`webpack-cli`
```
npm install webpack webpack-cli -D
```

- 项目根目录下新建`webpack.config.js`

```
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
module.exports = {
    entry: {
        index: './index.js',
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
        chunkFilename: "[name].js",
        // 这将在所有模块定义下暴露你的库, 允许它与 CommonJS、AMD 和作为全局变量工作
        libraryTarget: 'umd'
    },
    plugins: [new CleanWebpackPlugin({})],
    watchOptions: {
        ignored: /node_modules/,
    },
}
```


## 浏览器兼容
如何让浏览器支持一些`es6`等语法或者新的API,没错，需要使用`babel-loader`,

什么是`babel`
> Babel 是一个 JavaScript compiler
Babel 是一个工具链，主要用于在当前和旧的浏览器或环境中，将 ECMAScript 2015+ 代码转换为 JavaScript 向后兼容版本的代码。以下是 Babel 可以做的主要事情：
> *   转换语法
> *   Polyfill 目标环境中缺少的功能（通过如 [core-js](https://github.com/zloirock/core-js) 的第三方 `polyfill`）
> *   源代码转换(codemods)

**babel-loader+@babel/polyfill**
- 全部引入 `@babel/polyfill`
```
  entry: {
        index: ['@babel/polyfill', './index.js']
    },
```
不建议全部加载，这个包非常大；如下图打包之后：
![image.png](https://upload-images.jianshu.io/upload_images/11899053-3853f80eac291694.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 按使用的引入
  设置`useBuiltIns:usage`
> Since `@babel/polyfill` was deprecated in 7.4.0, we recommend directly adding `core-js` and setting the version via the [`corejs`](https://babel.docschina.org/docs/en/babel-preset-env/#corejs) option.

```
{
                        presets: [['@babel/preset-env',
                            {
                                "targets": {
                                    "chrome": "58",
                                    "ie": "11"
                                },
                                useBuiltIns: 'usage',
                                //  必须配置
                                corejs: {version: "3", proposals: true}
                            }
                        ]],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
```
相同的项目，打包之后，如下图所示：
![image.png](https://upload-images.jianshu.io/upload_images/11899053-a21d2ddb94b126e9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



## 压缩
https://webpack.docschina.org/plugins/terser-webpack-plugin/#uglify-js
- 安装
```
npm install terser-webpack-plugin --save-dev
```
## 问题记录
- webpack5 打包之后还有箭头函数问题
  将`target`选项设置为`['web','es5']`

https://webpack.docschina.org/configuration/target/
## 参考文档
[Implement NodeList.prototype.forEach](https://github.com/zloirock/core-js/issues/329)
[包含babel polyfill，但forEach在NodeLists上的IE11中仍然不起作用(babel polyfill being included, but forEach still doesn&#39;t work in IE11 on NodeLists)](https://www.it1352.com/1962975.html)

[babel官方文档](https://babel.docschina.org/docs/en/babel-preset-env/)

