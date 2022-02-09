# 开发一个NavMenu导航菜单
## 前言
elementUI的navMenu 路由使用的是js跳转

js跳转不好的地方：
* SEO不友好;
* 如果js代码出错，则导航无法跳转；

由于项目的需求，horizontal模式下，第一级子菜单宽度自适应且居中。然而elementUI的navMenu第一级子菜单是默认写死居左对齐

对于**js跳转**，我能想到的就是内嵌router-link实现；

**子菜单居中对齐**：则必须去改element的源码；
再加上项目原因，需要大量的改element的默认样式。
综上所述：自己写一个导航组件。

## 原理分析：
查看了elementUI的NavMenu源码，实现思路如下：

1.horizontal模式:使用了[popoverJs](https://popper.js.org/popper-documentation.html)
其实就更我们平时写导航子菜单思路一样
```
<ul>
  <li>
  <a>1<a>
   <ul>
    <li>
    <a>1-1</a>
     <ul>...<ul>
   </li>
  </ul>
</li>
</ul>
```
重点：如果是第一级子菜单（firstChild），则将其append到body上，对齐方式：'bottom-start（左对齐）';非第一级的子菜单对齐方式则是：start-right

关键代码截图：
![是否是第一级子菜单](https://upload-images.jianshu.io/upload_images/11899053-0d658cd3ccce9945.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![是否添加到body上](https://upload-images.jianshu.io/upload_images/11899053-9b9d7e8d71a02d88.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![子菜单对齐方式](https://upload-images.jianshu.io/upload_images/11899053-dda1b48b8e38e562.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![子菜单位置方法](https://upload-images.jianshu.io/upload_images/11899053-3413c225bfc0a3b1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


2.vertical模式：
这个模式的源码，我就没有仔细查看。因为我们项目不涉及到分组模式，就是简单的子集递归；


## 实现

有了以上的技术调研，导航组件的开发也就没有什么难题啦。

结合项目做了一个简单的导航菜单开发，实现了我上面说的功能。效果更elementUI的navMenu差不多。功能没那么强大；可以自己扩展。
![效果图](https://upload-images.jianshu.io/upload_images/11899053-eda448e752d4f8cc.gif?imageMogr2/auto-orient/strip)


结合项目：两种模式分开写的；
![](https://upload-images.jianshu.io/upload_images/11899053-3eb93dbc863e3677.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![](https://upload-images.jianshu.io/upload_images/11899053-e7dd6d692f9ec98c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这里的原因只是结合我们项目；对于不同项目需求，可以结合开发项目进行调整。


## 源码
demo地址：[https://github.com/merrylmr/menu-demo](https://github.com/merrylmr/menu-demo)
