# Vue transition探索

使用过Vue的小伙伴都知道，Vue的内置组件`transition`,在以下情况，可以给单个元素/组件添加进入/离开的过渡
* 条件渲染（v-if）
* 条件展示（v-show）
* 动态组件
* 组件根节点

这篇文章主要解密：条件展示（`v-show`）下，html+css+js实现一个简单的`transition`

先来看看vue官网文档:[进入/离开&列表过渡](https://cn.vuejs.org/v2/guide/transitions.html#CSS-%E8%BF%87%E6%B8%A1)


## Vue的过渡实现步骤
>1.自动嗅探目标元素是否应用了 CSS 过渡或动画，如果是，在恰当的时机添加/删除 CSS 类名
2.如果过渡组件提供了 JavaScript 钩子函数，这些钩子函数将在恰当的时机被调用
3.如果没有找到 JavaScript 钩子并且也没有检测到 CSS 过渡/动画，DOM 操作 (插入/删除) 在下一帧中立即执行

所以真正执行动画的是**我们写的css或者javascript钩子函数**，而Vue的`transtion`只是帮我们很好地管理了这些css的添加/删除，以及钩子函数的执行时机。




### 过渡的类名
name |定义| 添加时间 |  移除时间 |
--------- | ------------- | - | - |
v-enter| 过渡的开始状态 | 元素被插入之前 | 元素被插入的下一帧移除 |
|v-enter-active| 过渡生效时候的状态| 被插入之前|**过渡/动画完成**后|
|v-enter-to|过渡结束状态|元素被插入之后下一帧|**过渡/动画完成**后|
|v-leave|离开过渡的开始状态|离开过渡触发时刻|下一帧|
|v-leave-active|离开过渡生效的状态|离开过渡触发|**过渡/动画完成**后|
|v-leave-to|离开过渡结束状态|离开过渡触发下一帧|**过渡/动画完成**后|

过渡/动画完成后移除class：怎么判断过渡/动画是否完成?可以监听对应的事件：
* 过渡完成：`transitionend`
* 动画完成：`animationend`

了解了以上知识点，实现一个简单的transition就非常的简单了。
查看[demo](https://merrylmr.github.io/vue-theory-analysis/)效果：[https://merrylmr.github.io/vue-theory-analysis/](https://merrylmr.github.io/vue-theory-analysis/)
![效果图](https://upload-images.jianshu.io/upload_images/11899053-3f59f003db21ee52.gif?imageMogr2/auto-orient/strip)

## 核心源码
```
  class Transition {
    constructor(el, name, show) {
      this.el = el
      this.show = show || false // el初始状态，显示or隐藏
      this.x = this.autoCssTransition(name)

      this.enterCb = function () {
        el.style.display = 'block'
      }
      this.leaveCb = function () {
        el.style.display = 'none'
      }
      this.init(el)
    }

    autoCssTransition(name) {
      return {
        enterClass: `${name}-enter`, // start-class
        enterToClass: `${name}-enter-to`, // toClass
        enterActiveClass: `${name}-enter-active`, //动画完成删除
        leaveClass: `${name}-leave`,
        leaveToClass: `${name}-leave-to`,
        leaveActiveClass: `${name}-leave-active`
      }
    }

    addTransitionClass(el, cls) {
      el.classList.add(cls)
    }

    removeTransitionClass(el, cls) {
      el.classList.remove(cls)
    }

    init(el) {
      if (!this.show) {
        el.style.display = 'none'
      }

      let {
        enterToClass,
        enterActiveClass,
        leaveToClass,
        leaveActiveClass
      } = this.x

      let cb = () => {
        if (this.show) {
          this.removeTransitionClass(el, enterToClass)
          this.removeTransitionClass(el, enterActiveClass)

        } else {
          this.removeTransitionClass(el, leaveToClass)
          this.removeTransitionClass(el, leaveActiveClass)
          this.leaveCb()
        }
      }
//     监听CSS过渡执行完成
      el.addEventListener('transitionend', cb)
//      监听css动画动画执行完成
      el.addEventListener('animationend', cb)
    }

    enter() {
      this.show = true
      this.enterCb()
      this.addTransitionClass(this.el, this.x.enterClass)
      this.addTransitionClass(this.el, this.x.enterActiveClass)
      // 下一帧
      nextFrame(() => {
        this.removeTransitionClass(this.el, this.x.enterClass)
        this.addTransitionClass(this.el, this.x.enterToClass)
      })
    }

    leave() {
      this.show = false
      this.addTransitionClass(this.el, this.x.leaveClass)
      this.addTransitionClass(this.el, this.x.leaveActiveClass)
   // 下一帧
      nextFrame(() => {
        this.removeTransitionClass(this.el, this.x.leaveClass)
        this.addTransitionClass(this.el, this.x.leaveToClass)
      })
    }

    toggle() {
      if (!this.show) {
        this.enter()
      } else {
        this.leave()
      }
    }
  }
```

## 简单使用
```
// css
 .slide-top-enter,
    .slide-top-leave-to {
      transform: translateY(-100%);
    }

    .slide-top-enter-active,
    .slide-top-leave-active {
      transition: all 0.3s ease;
    }
// js:
 let instance = new Transition(box, 'slide-top')
  btn.addEventListener('click', () => {
    instance.toggle()
  })
 ```







