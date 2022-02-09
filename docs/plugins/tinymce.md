# tinymce-vue 使用总结
## 前言
由于项目的需求，需要使用tinymce富文本编辑器；分享一下在项目中使用tinymce的一些注意点。
当前代码采用的是Vue版本：2.x

## github地址
https://github.com/tinymce/tinymce-vue

[官方文档](https://www.tiny.cloud/docs/integrations/vue/#tinymce-script-src)


## 基本使用
### 安装`tinymce-vue`
`vue2.x`安装 `tinymce-vue 3`的相关版本
```
$ npm install --save "@tinymce/tinymce-vue@^3"
```
`vue3.x`安装`tinymce-vue 4`的相关版本:
```
$ npm install --save "@tinymce/tinymce-vue@^4"
```
###  通过组件配置api-key的方式
Demo:
```
<template>
  <editor
      :apiKey="apiKey"
      v-model="value"
      :init="init">
  </editor>
</template>

 <script>
import Editor from '@tinymce/tinymce-vue'
export default {
  name: 'tinymce-comp',
  data() {
    return {
      value: '',
      init: {
        language_url: '/tinymce/langs/zh_CN.js',// 语言包的路径
        language: 'zh_CN',//语言
        height: 300,//编辑器高度
        branding: false,//是否禁用“Powered by TinyMCE”
        menubar: true,//顶部菜单栏显示,
        toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | code codesample link help',
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
          'codesample'
        ],
      },
      apiKey: 'xxx'
    }
  },
  components: {Editor},
}
</script>
```





### 通过包管理方式下载 [tinymce](https://www.tiny.cloud/get-tiny/package-managers/)
```
npm install tinymce -S
```

Demo:
````
<template>
<editor  v-model="value" :init="init"></editor>
</template>
<script>
// 引入基本文件
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'

// 引入你需要的插件
import 'tinymce/plugins/paste';
import 'tinymce/plugins/link';

export default{
  data() {
      return {
        value:' ',
        init: {
       base_url: '/tinymce',
       language_url: '/tinymce/langs/zh_CN.js',// 语言包的路径
      language: 'zh_CN',//语言
      skin_url: '/tinymce/skins/ui/oxide',// skin路径
      height: 300,//编辑器高度
      branding: false,//是否禁用“Powered by TinyMCE”
      menubar: false,//顶部菜单栏显示,
      toolbar:' undo redo | fontsizeselect bold italic underline strikethrough ',
      plugins:'paste  link'
        }
      }
   },
  components:{Editor},
  mounted() {
    // Initialize the app
      tinymce.init({ });
  }
}
</script>
````
**注意：**
1. 需要将 node_modules下的`tinymce/skins`文件夹复制到项目的`public/tinymce`文件夹下，保持对应的目录结构。

2. icon图标加载失败，如下图所示：
   ![](https://upload-images.jianshu.io/upload_images/11899053-1a1936db73200ec5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**解决方案:**
查看安装的`tinymce`版本，若`>5.0.8`，则需要将 node_modules下的`tinymce/icons`文件夹复制到项目的`public/tinymce`下，保持对应的目录结构;
init中配置:
```
init:{
  base_url: '/tinymce'
}
```

### 两种方式的比较
1.通过组件配置api-key的方式，这种需要你注册或者购买了tinymce服务,核心功能是不收费；
2. 通过包下载的方式优点：加载更快，`api-key`方式访问的CDN非常缓慢。
   ![image.png](https://upload-images.jianshu.io/upload_images/11899053-2c3f446e59e14315.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 常见操作
#### 字体列表修改
````
init:{
 fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px 50px 56px 60px 64px',

}
````
#### 自定义工具栏 ([注册一个新的工具栏按钮](https://www.tiny.cloud/docs/api/tinymce.editor.ui/tinymce.editor.ui.registry/#addbutton)
)
在init数据里面
````
 init:{
 setup:(editor)=>{
  editor.ui.registry.addButton('customBtn',{
             tooltip: '自定义工具栏按钮',
              text: 自定义'',
              onAction: () => {
              window.alert('新的工具栏按钮')
              }
     })
  }
}
````
同时需要在`toolbar`配置项中添加`customBtn`;
#### 粘贴图片([使用远程图片地址](https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler))
1.引入粘贴插件
```
 import 'tinymce/plugins/paste'; // 张贴
```
2.插件列表里面写入'paste'
```
  plugins: 'paste',
```
3.init里面添加下面语句
```
 init:{
 paste_data_images: true,
}
```
4.粘贴的图片上传到服务器或者七牛配置如下
````
init:{
  images_upload_handler: function (blobInfo, success, failure) {
    var xhr, formData;

    xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.open('POST', 'postAcceptor.php');

    xhr.onload = function() {
      var json;

      if (xhr.status != 200) {
        failure('HTTP Error: ' + xhr.status);
        return;
      }

      json = JSON.parse(xhr.responseText);

      if (!json || typeof json.location != 'string') {
        failure('Invalid JSON: ' + xhr.responseText);
        return;
      }

      success(json.location);
    };

    formData = new FormData();
    formData.append('file', blobInfo.blob(), blobInfo.filename());

    xhr.send(formData);
  }
}
````
####  扩展插件

项目里面需要富文本可以设置字间距；但是tinymce并没有提供，所以自己去扩展一个letterspacing插件

[如何制造一个插件](http://tinymce.ax-z.cn/advanced/creating-a-plugin.php)
1.创建letterspacing文件夹，里面放入plugin.js
![image.png](https://upload-images.jianshu.io/upload_images/11899053-0c49abf42f673ead.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
2.引入插件
![image.png](https://upload-images.jianshu.io/upload_images/11899053-4cfd08c7b62c897e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


3.toolbar上加入创建的插件即可
![image.png](https://upload-images.jianshu.io/upload_images/11899053-3cc637c5e9a34d91.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


[http://tinymce.ax-z.cn/advanced/creating-a-plugin.php](http://tinymce.ax-z.cn/advanced/creating-a-plugin.php)


## 项目demo
演示地址：http://admin-vuetify.bysir.top:1080/#/tinymce

[https://github.com/merrylmr/vue-tinymce-demo](https://github.com/merrylmr/vue-tinymce-demo)

## tinymce中文参考文档
[http://tinymce.ax-z.cn/](http://tinymce.ax-z.cn/)

## 参考文档
[https://liubing.me/vue-tinymce-5.html](https://liubing.me/vue-tinymce-5.html)



