# svg图片转svg标签


项目需求是这样的：将网页上面的外联的svg图像，变成内嵌的svg图像。从而我们可以写一些css样式控制这个svg图像。

在网上经过一翻的搜索，答案差不多就是使用object、embed、iframe等，但是并不能实现我的需求。

经过不懈努力，找到一个插件[svg-injector](https://github.com/iconic/SVGInjector)。
![QQ图片20190303161058.jpg](https://upload-images.jianshu.io/upload_images/11899053-df9c0b36b17f26e3.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
这个插件就是我们想要达到的效果。看了哈文档和源码，是通过发起一个AJAX，来载入SVG。

由于项目是一个可视化的项目：用户在更改svg 地址后，需要在对该外链的svg的图片颜色、大小等进行配置。于是：封装如下的一段代码，监听svg的url发生改变，则重新调用封装好的方法，实现外联的svg图片转成svg标签。
```
/**
 * 将svg的img图片转成svg标签
 * @param element
 */
function toInlineSvg(element) {
  let imgID = element.getAttribute('id')
  let imgClass = element.getAttribute('class')
  let imgURL = element.getAttribute('src')

  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var svg = xhr.responseXML.getElementsByTagName('svg')[0]

      if (imgID != null) {
        svg.setAttribute('id', imgID)
      }

      if (imgClass != null) {
        svg.setAttribute('class', imgClass + ' replaced-svg')
      }

      svg.removeAttribute('xmlns:a')

      if (!svg.hasAttribute('viewBox') && svg.hasAttribute('height') && svg.hasAttribute('width')) {
        svg.setAttribute('viewBox', '0 0 ' + svg.getAttribute('height') + ' ' + svg.getAttribute('width'))
      }
      if (element.parentElement) {
        element.parentElement.replaceChild(svg, element)
      }
    }
  }
  xhr.open('GET', imgURL, true)
  xhr.send(null)
}
```

本文完~
