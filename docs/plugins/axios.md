# axios源码分析
axios既支持浏览器，也可以在node项目中使用

*   从浏览器中创建 [XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
*   从 node.js 创建 [http](http://nodejs.org/api/http.html) 请求

## 目录结构
````
|--dist 
|--lib
| |-- adapters
| | |-- http.js
| | |-- xhr.js
| |-- cancel
| | |-- cancel.js
| | |-- cancelToken.js
| | |-- isCancel.js
| |-- core
| | |-- Axios.js
| | |-- createError.js
| | |-- dispatchRequest.js
| | |-- enhanceError.js
| | |-- interceptorManager.js
| | |-- settle.js  // response处理
| | |-- transformData.js // transformRequest/transformResponse的处理
| |-- helpers
| | |-- bind.js 
| | |-- buildURL.js  // params参数的处理
| | |-- combineRULs.js
| | |-- cookies.js
| | |-- deprecatedMethod.js
| | |-- isAbsoluteURL.js
| | |-- isURLSameOrigin.js
| | |-- normailizeHeaderName.js
| | |-- parseHeaders.js
| | |-- spread.js
| |-- axios.js
|-- default.js
|-- utils.js
|-- index.js
|-- index.d.ts
````

## 源码分析
* url地址拼接处理：`helpers/buildURL.js`
* 头部处理
  配置会以一个优先顺序进行合并。这个顺序是：在 lib/defaults.js 找到的库的默认值，然后是实例的 defaults 属性，最后是请求的 config 参数。后者将优先于前者


index.js--> axios.js --> Axios.js

// axios.js(入口文件)
//->Axios.js(defaults.js)
//->dispatchRequest.js(chain[]，interceptors.request放在组件面)
//->

## 核心代码（Axios.js）
```
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

```
dispatchRequest.js
```
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

 // 执行ajax请求
  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

```


## AJAX
header的Content-Type(setRequestHeader)

* application/x-www-form-urlencoded format
* application/json

* URLSearchParams
  https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams


* Accept
```
// 默认：
// 设置不同方法请求的内容类型
// 在default.js里面会对Data的类型进行判断，设置相应的Content-type
// xhr.js->adapter->put、post等：如果isFormData 会删除 Content-type,Let the browser set it
// dispatchRequest里面会在post里面的方法，拍平到headers下面，然后删除对用的方法下的头部设置项
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers.get['x-x'] = 'get-only'
axios.defaults.headers.put['x-x-x'] = 'put-only'
```
```
// request配置
axios.interceptors.request.use((config) => {
  // get请求：发送的数据data="undefined",header数据的content-type会被删除，
  // 如果是post、put请求：以下设置则会生效。
  // content-type设置发送请求的数据类型，不设置default.js会对发送的data类型进行判断，然后添加对应的类型
  // 这个应该是在default.js执行之后，在执行
  config.headers['content-type'] = 'application/json';
  return config;
});
```
