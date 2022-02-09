# vue 手机端日历组件
## 介绍
支持两种模式，周、月；类似于钉钉日历交互；

![效果图.gif](https://upload-images.jianshu.io/upload_images/11899053-d628be5fa4a7c842.gif?imageMogr2/auto-orient/strip)

## 插件效果
http://admin-vuetify.bysir.top:1080/#/calendar


## 安装
```
npm install v-calendar-mobile
// or
yarn add v-calendar-mobile
```
## 使用
1. main.js
```
import vCalendarMobile from 'v-calendar-mobile'
Vue.use(vCalendarMobile)
```
2. 组件中使用：
```
 <v-calendar-mobile
        :changeMode="true">
    </v-calendar-mobile>
```


## 参数
参数 | 说明
--------- | ------------- 
mode | 日历的模式（week/month）默认值为：week
changeMoe | 是否支持切换日历模式（默认：false）
swiperActive| 切换页是否默认选中一个日期（默认：true）

## 事件
事件名称| 说明  | 回调参数
--------- | -------------  | ----
change | 切换日期 | 选中的日期

## slot
name | 说明
--------- | -------------  
dateCell| 每个单元格插槽，参数为{day}

```
<v-calendar-mobile
        :changeMode="true">
      <template slot="dateCell" slot-scope="{day}">
        {{day.day}}
      </template>
    </v-calendar-mobile>
```



## github地址
https://github.com/merrylmr/v-calendar-mobile#readme



## 参考文档
https://blog.csdn.net/yxgd_1442962728/article/details/109717249

