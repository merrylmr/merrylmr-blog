# prerender-spa-plugin
- 可以优化首屏白屏
- SEO

### 缺陷
- 无法动态的请求数据（不同站点 不同数据）；原因：在打包的时候，已经生成了html文件


## 理想的方案
- 可以动态定制首页（index.html）;需要加载数据

## 解决方案
- nuxt.js
- vue-ssr(自己去实现)
