(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{331:function(t,e,a){"use strict";a.r(e);var n=a(14),s=Object(n.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"uni-app"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#uni-app"}},[t._v("#")]),t._v(" uni-app")]),t._v(" "),e("h2",{attrs:{id:"文件上传"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#文件上传"}},[t._v("#")]),t._v(" 文件上传")]),t._v(" "),e("p",[t._v("方法一：\n1.template部分")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('\t<view id="file" ref="file"></view>\n')])])]),e("ol",{attrs:{start:"2"}},[e("li",[t._v("js部分")])]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("onLoad() {\n\t\t\tthis.createFileDom()\n\t\t},\n\tcreateFileDom() {\n\t\t\t\tsetTimeout(() => {\n\t\t\t\t\tvar input = document.createElement('input');\n\t\t\t\t\tinput.type = 'file';\n\t\t\t\t\tinput.accept = 'image/*';\n\t\t\t\t\tthis.$refs.file.$el.appendChild(input);\n\t\t\t\t\tinput.addEventListener(\"change\", (e) => {\n\t\t\t\t\t\tconsole.log('change e', e.target.files[0]);\n\t\t\t\t\t})\n\t\t\t\t})\n\t\t\t},\n")])])]),e("p",[t._v("方法2：\n直接使用"),e("code",[t._v("uni.chooseimage")])]),t._v(" "),e("h2",{attrs:{id:"路由拦截"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#路由拦截"}},[t._v("#")]),t._v(" 路由拦截")]),t._v(" "),e("p",[t._v("插件")]),t._v(" "),e("ul",[e("li",[t._v("bobo-router")]),t._v(" "),e("li",[e("a",{attrs:{href:"https://hhyang.cn/v2/",target:"_blank",rel:"noopener noreferrer"}},[t._v("uni-simple-router"),e("OutboundLink")],1)])])])}),[],!1,null,null,null);e.default=s.exports}}]);