# 项目升级到vue-cli3
## 步骤
* 第一步：安装Vue CLI的脚手架；（如安装，则跳过此步骤）
````
npm install -g @vue/cli
# OR
yarn global add @vue/cli
````
* 第二步：创建一个项目A
````
vue create A
````
* 第三步：**代码合并**
  1、 将需要升级的项目(本文中缩写为：B)的webpack配置相关的代码        删除；主要是文件夹：  `config`、   `build`

  2、将`A`中的`pubic `复制`B`；将`B`的 `static`文件夹移入到`public`下;
  此步骤直接将整个static移入到public下的好处是：无需修改引用了static下资源的文件。
  如：![](https://upload-images.jianshu.io/upload_images/11899053-9a3b40b0d4f5fa1f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
  另外：需要对应在`vue.config.js`配置：`  assetsDir `
````
  assetsDir: 'static'
````
3、对比A、B的package.json，`yarn install`。

## 运行项目，你可能就会遇到下面的问题。

### You are using the runtime-only build of Vue......
````
module.exports ={
   configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js' 
      },
    }
  },
}

````
###  Uncaught TypeError: Cannot redefine property: $router

解决方案参考地址：[https://www.cnblogs.com/mengyouyouyou/p/10936171.html](https://www.cnblogs.com/mengyouyouyou/p/10936171.html)


###  eslint报错
1.简单粗暴：关闭eslint
````
// vue.config.js
module.exports ={
  lintOnSave:false
}
````
2.配置`eslint`，修复eslint报错
* .eslintignore
* .eslintrc.js/或则在`package.json`的`eslintConfig`配置
```
module.exports = {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/essential",
      "standard"
    ],
    "parserOptions": {
      "parser": "babel-eslint"
    },
    "rules": {}
  },
```

###  依赖警告

安装依赖包时，出现如下warning
````
[plugin] has has unmet peer dependency "webpack@^2.0.0 || ^3.0.0 || ^4.0.0".
````
解决方案:安装`webpack`即可。
````
yarn add webpack --dev
````
[https://nodejs.org/es/blog/npm/peer-dependencies/](https://nodejs.org/es/blog/npm/peer-dependencies/)

###  alias/extental
通过`configureWebpack`字段配置
````
module.exports ={
   configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': path.join(__dirname, 'src')
      },
    },
    externals: [
      {
        'vue': 'Vue'
      }],
  },
}
````
###  PostCss
** Vue CLI 内部使用了 PostCSS.**；可以通过以下几种方式配置postcss
* postcss.config.js
* `. postcssrc `
* vue.config.js的`css.loaderOptions.postcss`

````
//  postcss.config.js
module.exports = {
  parser: 'sugarss',
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {},
    'cssnano': {}
  }
}
````
* 默认开启了 [autoprefixer](https://github.com/postcss/autoprefixer)。如果要配置目标浏览器，可使用 `package.json` 的 [browserslist](https://cli.vuejs.org/zh/guide/browser-compatibility.html#browserslist) 字段。
### sass 共享全局变量
通过`vue.config.js`的`css.loaderOptions`选项
````
module.exports ={
  // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.sass` 这个文件
        // 注意：在 sass-loader v7 中，这个选项名是 "data"
        prependData: `@import "~@/variables.sass"`
      },
      // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
      // 因为 `scss` 语法在内部也是由 sass-loader 处理的
      // 但是在配置 `data` 选项的时候
      // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
      // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
      scss: {
        prependData: `@import "~@/variables.scss";`
      }
}
````
### 生产环境剔除console.log
* 安装`babel-plugin-transform-remove-console`
````
yarn add babel-plugin-transform-remove-console --dev
````
* babel.config.js添加如下代码(如果没有，则在项目根目录下新建一个)
````
const isProduction = process.env.NODE_ENV === 'production';
const plugins = [];
if (isProduction) {
  plugins.push(['transform-remove-console', {"exclude": ["error", "warn"]}])
}
module.exports = {
  plugins: plugins
}
````

##  打包文件上CND的路径配置
使用vue.config.js的`publicPath`
````
// vue.config.js
{
 module.exports ={
      publicPath: process.env.NODE_ENV === 'production' ? '//static.test.zhuzi.me/editor/' : '/',
  } 
}
````
## webpack Analyzer
无需安装`webpack-bundle-analyzer`依赖，只需要打包时通过`vue-cli-service build --report`即可。


## 打包时，mini-css-extract-plugin Conflicting order 警告
解决方案参考地址：(https://blog.csdn.net/peade/article/details/84890399)

## 扩展
### 配置多页面应用
使用`pages`字段,配置如下
````
module.exports = {
  pages: {
    index: {
      entry: 'src/core/app/index.js',
      template: 'src/core/app/index.html',
      filename: 'index.html',
    },
    editor: {
      entry: 'src/core/editor/editor.js',
      template: 'src/core/editor/editor.html',
      filename: 'editor.html',
    }
  },
}
````
### 审查项目的 webpack 配置
因为 @vue/cli-service 对 webpack 配置进行了抽象，所以理解配置中包含的东西会比较困难。vue-cli-service暴露了`inspect` 来审查一个 Vue CLI 项目的 webpack config
````
vue-cli-service inspect > output.js
````

更多配置，请查看[Vue Cli官方文档]([https://cli.vuejs.org/zh/guide/](https://cli.vuejs.org/zh/guide/)
)


