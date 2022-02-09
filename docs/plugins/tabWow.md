# 解决切换tab ,wow动画不生效问题
## 问题描述
在tab非激活项为`display:none`时候，里面的组件设置了`wow`动画，切换到其他项，组件不显示。  `wow`动画未执行。


## 解决方案

```
  const instance = new WOW({
    live: false
  });
  instance.init();
 // 就是以下两行代码
  document.addEventListener('click', () => {
    instance.scrolled = true;
  }, true)
```
## 关键源码解析
*  **wow的轮询**
   this.interval = setInterval(this.scrollCallback, 50)

轮询里面有一个变量：this.scrolled为true时 才会去判断页面上的组件动画显示与否。

当滚动的时候，this.scrolled=true；

但是我们需要在tab切换之后，里面的组件也需要去执行`wow`动画，所以将scrolled设置为true,去执行滚动回调即可。

scrollCallback源码
```
    WOW.prototype.scrollCallback = function() {
      var box;
      if (this.scrolled) {
        this.scrolled = false;
        this.boxes = (function() {
          var j, len, ref, results;
          ref = this.boxes;
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            box = ref[j];
            if (!(box)) {
              continue;
            }
            if (this.isVisible(box)) {
              this.show(box);
              continue;
            }
            results.push(box);
          }
          return results;
        }).call(this);
        if (!(this.boxes.length || this.config.live)) {
          return this.stop();
        }
      }
    };
```



## 知识点
* element.offsetParent
> **`HTMLElement.offsetParent`** 是一个只读属性，返回一个指向最近的（指包含层级上的最近）包含该元素的定位元素或者最近的 `table,``td,``th,``body`元素。当元素的 `style.display` 设置为 "none" 时，`offsetParent` 返回 `null`。`offsetParent` 很有用，因为 [`offsetTop`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetTop) 和 [`offsetLeft`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetLeft) 都是相对于其内边距边界的。

* element.offsetTop
> **`HTMLElement.offsetTop`** 为只读属性，它返回当前元素相对于其 [`offsetParent`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetParent) 元素的顶部内边距的距离


所以当某一层父级有`display:none`时候，里面的元素获取 `element.offsetTop=0`


## 参考教程
[HTMLElement.offsetParent](
https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetParent)
[HTMLElement.offsetTop](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetTop)
