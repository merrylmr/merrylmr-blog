# webpack 打包原理
原理：
通过入口文件，构建出一个依赖图，输出代码


基本流程：
1.定义compiler类
2.解析入口文件，获取AST( @babel/parser  ast语法抽象树)
3.找出依赖模块 （ @babel/traverse 找出依赖模块）
4. AST转换为code (@babel/preset-env AST转换为code)
5. 递归解析所有依赖项，生成依赖关系图
   6.重写require函数，输出bundle



## 参考文档
[webpack打包原理 ? 看完这篇你就懂了 !](https://juejin.im/post/5e116fce6fb9a047ea7472a6)

[深入浅出webpack](https://webpack.wuhaolin.cn/)

[webpack中文文档](https://www.webpackjs.com/)


