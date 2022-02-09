# 动态设置publicPath
1.public-path.js
```
__webpack_public_path__='xxxx'
```
2.entry.js 中引入
```
import './public-path';
....
```
https://webpack.js.org/guides/public-path/#on-the-fly
