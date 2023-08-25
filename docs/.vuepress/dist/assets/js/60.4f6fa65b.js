(window.webpackJsonp=window.webpackJsonp||[]).push([[60],{341:function(e,t,a){"use strict";a.r(t);var s=a(14),n=Object(s.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"vue多页面应用配置"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#vue多页面应用配置"}},[e._v("#")]),e._v(" Vue多页面应用配置")]),e._v(" "),t("p",[e._v("最近由于工作驱动，项目包含pc端及mobile端，pc端和mobile端核心功能一致，最大的不同是UI,为了减少维护的成本，决定使用Vue的多页面开发。")]),e._v(" "),t("p",[e._v("项目线上部署在一个子目录下，为了解决在本地和线上路径保持一致，需要修改一些配置。所以以此篇文章来记录一下配置过程中的问题。")]),e._v(" "),t("p",[e._v("这里是我放在github上的项目，里面有整个配置文件。感兴趣的朋友可以参考一下："),t("a",{attrs:{href:"https://github.com/merrylmr/vue-multiple-page",target:"_blank",rel:"noopener noreferrer"}},[e._v("vue-multiple-page"),t("OutboundLink")],1)]),e._v(" "),t("p",[t("strong",[e._v("此篇文章记录了先在根路径下的多页面配置，再从根路径修改成子路径的配置")])]),e._v(" "),t("h2",{attrs:{id:"准备工作"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#准备工作"}},[e._v("#")]),e._v(" 准备工作")]),e._v(" "),t("p",[e._v("vue脚手架vue-cli3及以上；\n在本地用vue-cli新建一个项目；")]),e._v(" "),t("h2",{attrs:{id:"目录结构大致如下"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#目录结构大致如下"}},[e._v("#")]),e._v(" 目录结构大致如下")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("|- public\n|- src\n|  |--assets\n|  |--components\n|  |--pages\n|  |  |--index\n|  |  |  |--index.html\n|  |  |  |--index.js\n|  |  |  |--App.vue\n|  |  |  |--Home.vue\n|  |  |  |--About.vue\n|  |  |--mobile\n|  |  |  |--mobile.html\n|  |  |  |--index.js\n|  |  |  |--mobile.vue\n|  |  |  |--Home.vue\n|  |  |  |--About.vue\n|  |--router  \n|  |  |--index.js\n|  |  |--mobile.js\n| - vue.config.js\n| - package.json\n")])])]),t("h2",{attrs:{id:"在根路径配置多页面应用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#在根路径配置多页面应用"}},[e._v("#")]),e._v(" 在根路径配置多页面应用")]),e._v(" "),t("blockquote",[t("p",[e._v("默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上,\n例如 https://www.my-app.com/")])]),e._v(" "),t("h3",{attrs:{id:"实现的效果"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#实现的效果"}},[e._v("#")]),e._v(" 实现的效果")]),e._v(" "),t("ul",[t("li",[e._v("本地路径如下：")])]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v(" // pc端\nindex: localhost:8080\n// mobile端\nmobile:location:8080/mobile\n")])])]),t("ul",[t("li",[e._v("不同页面，可以实现路由。如下：")])]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("// pc端的关于我们\nlocalhost:8080/about \b\n // mobile端的关于我们\nlocalhost:8080/mobile/about \b\n")])])]),t("h3",{attrs:{id:"修改配置"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#修改配置"}},[e._v("#")]),e._v(" 修改配置")]),e._v(" "),t("ul",[t("li",[e._v("修改 "),t("code",[e._v("vue.config.js")]),e._v(" 配置")])]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("module.exports = {\n pages: {\n    index: {\n      entry: 'src/pages/index/index.js',\n      template: 'src/pages/index/index.html',\n      filename: 'index.html',\n    },\n    mobile: {\n      entry: 'src/pages/mobile/index.js',\n      template: 'src/pages/mobile/mobile.html',\n      filename: 'mobile.html'\n    },\n  },\n}\n")])])]),t("ul",[t("li",[t("a",{attrs:{href:"https://router.vuejs.org/zh/api/#base",target:"_blank",rel:"noopener noreferrer"}},[e._v("路由配置"),t("OutboundLink")],1),e._v("\npc端路由文件保持不变；\nmobile端"),t("code",[e._v("mobile.js")]),e._v(" 添加 "),t("code",[e._v("base: '/mobile'")]),e._v(",")])]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("// mobile.js\nimport Router from 'vue-router'\nimport Home from 'mobile/views/Editor.vue'\n\n\nexport default new Router({\n  mode: 'history',\n  base: '/mobile',\n  routes: [\n    ...\n  ]\n})\n")])])]),t("p",[t("code",[e._v("vue3.js")]),e._v(":路由配置修改的是"),t("code",[e._v("history: createWebHistory('/mobile/')")])]),e._v(" "),t("h2",{attrs:{id:"在子路径下配置多页面应用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#在子路径下配置多页面应用"}},[e._v("#")]),e._v(" 在子路径下配置多页面应用")]),e._v(" "),t("blockquote",[t("p",[e._v("如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/。")])]),e._v(" "),t("h3",{attrs:{id:"实现效果"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#实现效果"}},[e._v("#")]),e._v(" 实现效果")]),e._v(" "),t("ul",[t("li",[e._v("本地路径访问如下：")])]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("// pc端\nlocalhost:8080/e/\n// mobile端\nlocalhost:8080/e/mobile/\n")])])]),t("ul",[t("li",[e._v("不同页面，可以实现路由。如下：")])]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("// pc端的关于我们\nlocalhost:8080/e/about \b\n // mobile端的关于我们\nlocalhost:8080/e/mobile/about \b\n")])])]),t("h3",{attrs:{id:"修改配置-2"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#修改配置-2"}},[e._v("#")]),e._v(" 修改配置")]),e._v(" "),t("ul",[t("li",[e._v("修改"),t("code",[e._v("vue.config.js")])])]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("module.exports = {\n  publicPath:'/e/',\n  pages: {\n    index: {\n      entry: 'src/pages/index/index.js',\n      template: 'src/pages/index/index.html',\n      filename: 'index.html',\n    },\n    'e/mobile': {\n      entry: 'src/pages/mobile/index.js',\n      template: 'src/pages/mobile/mobile.html',\n      filename: 'mobile.html'\n    },\n  },\n}\n")])])]),t("ul",[t("li",[e._v("修改路由文件\npc端的："),t("code",[e._v("index.js")]),e._v(" 添加"),t("code",[e._v("base:'/e/'")])])]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("import Router from 'vue-router'\nimport Home from '../pages/pc/views/Editor.vue'\n\n\nexport default new Router({\n  mode: 'history',\n  // 添加base\n  base: '/e/',\n  routes: [\n    {\n      path: '/',\n      name: 'index',\n      component: Home\n    }\n  ]\n})\n")])])]),t("p",[t("code",[e._v("vue3.js")]),e._v(":路由配置修改的是"),t("code",[e._v("history: createWebHistory('/e/')")])]),e._v(" "),t("p",[e._v("mobile端mobile.js的base修改成"),t("code",[e._v("base: '/e/mobile'")])]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("import Router from 'vue-router'\nimport Home from 'mobile/views/Editor.vue'\n\nexport default new Router({\n  mode: 'history',\n  base: '/e/mobile/',\n  routes: [\n    {\n      path: '/',\n      name: 'index',\n      component: Home\n    },\n  ]\n})\n")])])]),t("p",[t("code",[e._v("vue3.js")]),e._v(":路由配置修改的是"),t("code",[e._v("history: createWebHistory('/e/mobile')")])]),e._v(" "),t("p",[t("strong",[e._v("特别注意的地方")])]),e._v(" "),t("ul",[t("li",[t("p",[e._v("将pages下的key为"),t("code",[e._v("mobile")]),e._v("修改成"),t("code",[e._v("e/mobile")]),e._v(";如果不修改，不能进入到对应的mobile入口。")])]),e._v(" "),t("li",[t("p",[e._v("public下的资源，如果在根路径下访问路径是"),t("code",[e._v("/img/xxx.jpg")]),e._v("，在子路径下需要修改成"),t("code",[e._v("/e/img/xxx.jpg")])])])])])}),[],!1,null,null,null);t.default=n.exports}}]);