# echart学习记录
* 坐标轴固定，内容区域滚动
  参考例子：
  https://echarts.apache.org/zh/option.html#dataZoom

* 两个柱状统计条重合
  https://echarts.apache.org/zh/option.html#series-bar.barGap


## 学习
* 看看demo
  https://echarts.apache.org/examples/zh/index.html#chart-type-pie
* 在对应看配置项手册，查看对应的属性
  https://echarts.apache.org/zh/option.html#title


## 坑点
- legend的width与overflow:'breakAll' 在v4.9版本不生效
  v5才可以
  echarts 4.9版本legend无法支持换行，升级到V5版本改动太大，涉及到：
- 主题色
- echart地图样式兼容；
- 引入方式不同；
