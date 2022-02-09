# 百度地图使用总结
## nuxt 项目（IE兼容问题）
最好使用全局注册方式
```
第一步：plugins目录下新建 baidu-map.js

import Vue from 'vue'
import BaiduMap from 'vue-baidu-map'
import {MAP_AK} from '@/assets/js/const/index'

Vue.use(BaiduMap, {
  ak: MAP_AK
})


第二步.in nuxt.config.js
plugins:[
 {src: '@/plugins/baidu-map.js', ssr: false},
]
```
使用组件方式：在IE下，会有es6语法问题



## 踩坑记录

* centerAndZoom:undefined
```
错误事列：

data(){
   return{
       center:{lat:'',lng:''}
   }
 }
mounted(){
   this.center={}
  }
正确用法：
需要在ready方法里面去修改center
<baidu-map :center="center" :zoom="zoom" @ready="handler"></baidu-map>
handler ({BMap, map}) {
      this.center.lng = 116.404
      this.center.lat = 39.915
      this.zoom = 15
    }
```
* 多窗口切换(bm-info-window)
```
1.需要注意visible属性，必须是**动态属性**。
marker:{
 point:{},
 visible:false,
 window:{}
}
2. 需要使用this.markers[index].visible=true 代替 item.visible=true
        <!--坐标点-->
      <bm-marker
            v-for="(item,index) in markerList" 
            :key="index"
            :position="{lng: item.position[0], lat: item.position[1]}"
            @click="infoWindowOpen(item,index)" >
            <!--窗体信息-->
            <bm-info-window
              :position="{lng: item.position[0], lat: item.position[1]}"
              :show="item.visible"
              :title="item.merchantName">
              ...
    </bm-info-window>
  </bm-marker>

<script>
export default {
  infoWindowOpen(item,index){
    this.markerList[index].visible = true
  }
}
</script>
```
*  异步加载
>  JavaScript API支持异步加载，您可以在引用脚本的时候添加callback参数，当脚本加载完成后callback函数会被立刻调用

此功能则可以实现：**按需加载**
列如：项目提供一个定位功能，用户可以选择开启或者关闭。
```
<!DOCTYPE html>  
<html>  
<head>  
<meta charset="utf-8"/>  
<title>异步加载</title>  
<script type="text/javascript">  
function initialize() {  
  var mp = new BMap.Map('map');  
  mp.centerAndZoom(new BMap.Point(121.491, 31.233), 11);  
}  
   
function loadScript() {  
  var script = document.createElement("script");  
  script.src = "http://api.map.baidu.com/api?v=2.0&ak=您的密钥&callback=initialize";
  document.body.appendChild(script);  
}  
   
window.onload = loadScript;  
</script>  
</head>  
<body></body>  
</html> 
```
