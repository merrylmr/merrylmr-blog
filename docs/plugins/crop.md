# 图片裁剪组件
## 前言

此组件的效果:
- 控制图片显示的区域；
- 支持选择不同形状的蒙层，控制显示区域的形状；
  ![](https://upload-images.jianshu.io/upload_images/11899053-eb95384b92922ea4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

效果演示地址：http://admin-vuetify.bysir.top:1080/#/crop



## 控制图片的显示区域
这里我直接用七牛的图片，他们的SDK支持图片裁剪
![image.png](https://upload-images.jianshu.io/upload_images/11899053-30c25068dcccbc77.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

原图：
![原图](https://upload-images.jianshu.io/upload_images/11899053-1f78aa43c46ea8be.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
裁剪之后：
![裁剪之后的图片](https://upload-images.jianshu.io/upload_images/11899053-39145f73b633d615?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

?imageMogr2/crop/!392x338a115a24
表示从源图坐标为 x:115,y:24处截取 392x338 的子图片。


通过移动，动态设置宽高偏移即可；

[官方文档链接](https://developer.qiniu.com/dora/8256/tailoring)


## 蒙层控制显示的形状

css的[-webkit-mask-box-image](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-mask-box-image)


使用：
```
<div class="img-wrapper">
  <img src="https://dora-doc.qiniu.com/gogopher.jpg?imageMogr2/crop/!392x338a113a0" />
</div>

```
```
.img-wrapper {
  -webkit-mask-box-image-source: url(/img/triangle.svg);
    -webkit-mask-box-image-width: initial;
    -webkit-mask-box-image-outset: initial;
    -webkit-mask-box-image-repeat: initial;
}
```
呈现效果：
![image.png](https://upload-images.jianshu.io/upload_images/11899053-c00b54bd7e13afa8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


浏览器兼容性：
![image.png](https://upload-images.jianshu.io/upload_images/11899053-6b269ac88804201c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## Last
此图片裁剪组件有一定的局限性，必须配合七牛图片才可；
css的蒙版：也存在浏览器兼容问题；

源码地址：
https://github.com/merrylmr/admin-vuetify/blob/master/src/views/comps/CropDlg.vue

