# Vue多页面应用配置
最近由于工作驱动，项目包含pc端及mobile端，pc端和mobile端核心功能一致，最大的不同是UI,为了减少维护的成本，决定使用Vue的多页面开发。

项目线上部署在一个子目录下，为了解决在本地和线上路径保持一致，需要修改一些配置。所以以此篇文章来记录一下配置过程中的问题。

这里是我放在github上的项目，里面有整个配置文件。感兴趣的朋友可以参考一下：[vue-multiple-page](https://github.com/merrylmr/vue-multiple-page)

**此篇文章记录了先在根路径下的多页面配置，再从根路径修改成子路径的配置**


## 准备工作

vue脚手架vue-cli3及以上；
在本地用vue-cli新建一个项目；



## 目录结构大致如下
```
|- public
|- src
|  |--assets
|  |--components
|  |--pages
|  |  |--index
|  |  |  |--index.html
|  |  |  |--index.js
|  |  |  |--App.vue
|  |  |  |--Home.vue
|  |  |  |--About.vue
|  |  |--mobile
|  |  |  |--mobile.html
|  |  |  |--index.js
|  |  |  |--mobile.vue
|  |  |  |--Home.vue
|  |  |  |--About.vue
|  |--router  
|  |  |--index.js
|  |  |--mobile.js
| - vue.config.js
| - package.json
```


## 在根路径配置多页面应用
> 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上,
例如 https://www.my-app.com/

### 实现的效果
* 本地路径如下：

```
 // pc端
index: localhost:8080
// mobile端
mobile:location:8080/mobile
```

* 不同页面，可以实现路由。如下：
```
// pc端的关于我们
localhost:8080/about 
 // mobile端的关于我们
localhost:8080/mobile/about 
```
### 修改配置

* 修改 `vue.config.js` 配置
```
module.exports = {
 pages: {
    index: {
      entry: 'src/pages/index/index.js',
      template: 'src/pages/index/index.html',
      filename: 'index.html',
    },
    mobile: {
      entry: 'src/pages/mobile/index.js',
      template: 'src/pages/mobile/mobile.html',
      filename: 'mobile.html'
    },
  },
}
```
* [路由配置](https://router.vuejs.org/zh/api/#base)
  pc端路由文件保持不变；
  mobile端`mobile.js` 添加 ` base: '/mobile'`,

```
// mobile.js
import Router from 'vue-router'
import Home from 'mobile/views/Editor.vue'


export default new Router({
  mode: 'history',
  base: '/mobile',
  routes: [
    ...
  ]
})
```
`vue3.js`:路由配置修改的是`  history: createWebHistory('/mobile/')`


## 在子路径下配置多页面应用

> 如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/。

### 实现效果

* 本地路径访问如下：
```
// pc端
localhost:8080/e/
// mobile端
localhost:8080/e/mobile/
```

* 不同页面，可以实现路由。如下：
```
// pc端的关于我们
localhost:8080/e/about 
 // mobile端的关于我们
localhost:8080/e/mobile/about 
```

### 修改配置
* 修改`vue.config.js`
```
module.exports = {
  publicPath:'/e/',
  pages: {
    index: {
      entry: 'src/pages/index/index.js',
      template: 'src/pages/index/index.html',
      filename: 'index.html',
    },
    'e/mobile': {
      entry: 'src/pages/mobile/index.js',
      template: 'src/pages/mobile/mobile.html',
      filename: 'mobile.html'
    },
  },
}
```
* 修改路由文件
  pc端的：`index.js` 添加`base:'/e/'`
```
import Router from 'vue-router'
import Home from '../pages/pc/views/Editor.vue'


export default new Router({
  mode: 'history',
  // 添加base
  base: '/e/',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Home
    }
  ]
})
```
`vue3.js`:路由配置修改的是`  history: createWebHistory('/e/')`


mobile端mobile.js的base修改成` base: '/e/mobile'`
```
import Router from 'vue-router'
import Home from 'mobile/views/Editor.vue'

export default new Router({
  mode: 'history',
  base: '/e/mobile/',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Home
    },
  ]
})
```
`vue3.js`:路由配置修改的是`  history: createWebHistory('/e/mobile')`

**特别注意的地方**
* 将pages下的key为`mobile`修改成`e/mobile`;如果不修改，不能进入到对应的mobile入口。

* public下的资源，如果在根路径下访问路径是`/img/xxx.jpg`，在子路径下需要修改成`/e/img/xxx.jpg`








