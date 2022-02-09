# uni-app
## 文件上传
方法一：
1.template部分
```
	<view id="file" ref="file"></view>
```
2. js部分
```
onLoad() {
			this.createFileDom()
		},
	createFileDom() {
				setTimeout(() => {
					var input = document.createElement('input');
					input.type = 'file';
					input.accept = 'image/*';
					this.$refs.file.$el.appendChild(input);
					input.addEventListener("change", (e) => {
						console.log('change e', e.target.files[0]);
					})
				})
			},
```
方法2：
直接使用`uni.chooseimage`


## 路由拦截
插件
- bobo-router
- [uni-simple-router](https://hhyang.cn/v2/)


