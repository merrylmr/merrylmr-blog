# fabric.js
## 介绍
fabric.js是一个canvas的插件


## [版本4重大改变](http://fabricjs.com/v4-breaking-changes)

* 移出了`Canvas.uniScaleTransform`。添加了`Canvas.uniformScaling`。这个属性命名的很糟糕，不能清晰的表达它的作用。如果`Canvas.uniformScaling`为true,
* 移出了`Object.lockUniScaling`，它不清晰表示老的`Canvas.uniformScaling`和`uniscaleKey`应该怎样交互？

* 移出了`Canvas.onBeforeScaleRotate`方法。请使用 Canvas.on('before:transform') 并且将你的代码移入到回调里面。

* `Object.setShadow`和 `BaseBrush.setShadow`已经被移出。请使用：
```
bject.setShadow(options);

// after
Object.set('shadow', new fabric.Shadow(options));
// or
Object.shadow = new fabric.Shadow(options);
```
同样地`Object.setGradient`也被移除。请使用：
```
// before
Object.setGradient(options);

// after
Object.set('fill', new fabric.Gradient(otherOptions));
Object.set('stroke', new fabric.Gradient(otherOptions));

// or
Object.fill = new fabric.Gradient(otherOptions));
Object.stroke = new fabric.Gradient(otherOptions));
```
选项的格式有细微的不同，但是尽管


## 基本使用
`object:selected`已经被移出；使用`selection:created`
* 画布监听选区选中的元素
```
  instance.canvas.on('selection:created', (objects) => {
      console.log('selection:created-----11111', objects);
    })
```
* 画布选中的元素发生改变
 ```
// 选中区域更新
  instance.canvas.on('selection:updated', (objects) => {
      console.log('selection:update-----22222', objects);
    })
 ```

## github地址
https://github.com/fabricjs/fabric.js

## 文档
http://fabricjs.com/docs/fabric.Image.html

http://fabricjs.com/articles/

## demo
http://fabricjs.com/demos/
http://fabricjs.com/kitchensink


## 参考文档

https://segmentfault.com/a/1190000017749198




## 介绍
技术栈：react.js+fabric.js

实现一个简单的在线图片编辑器，可以添加文本、图形、图片等元素，点击下载图片。



## TODO
- [x] 添加元素
- [ ] 更新元素基本属性
- [ ] 组合、拆分组合
- [ ] 下载图片
- [ ] 组件的缩放

## RUN

第一步：安装依赖

```javascript
yarn / npm install
```

第二步：运行
```javascript
yarn start / npm start
```
