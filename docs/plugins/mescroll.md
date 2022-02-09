# mescroll
## 官方文档
http://www.mescroll.com/demo.html

## 多个tab切换，上拉加载更多
关键代码

 ```
      class="will-tab"
            v-model="activeStatus"
            color="#2859EF"
            @change="switchList"
            title-active-color="#000"
            title-inactive-color="#BFBFBF">
            <van-tab
                v-for="(item,index) in socialStatus"
                :key="index"
                :title="item.label"
                :name="item.key">
            </van-tab>
        </van-tabs>

   // 切换列表，重新加载
        async switchList() {
            this.willList = []
            this.mescroll.resetUpScroll() // 刷新列表数据
        },
```
```
   配置项：
      // 上拉
            mescrollUp: {
                callback: this.upCallback,
                // page: {
                //     size: 3,
                //     num: 0
                // }
            },

    // 上拉加载更多
        async upCallback(page, mescroll) {
            try {
                if (page.num === 1) this.willList = []
                this.currentPage = page.num;
                const res = await this.requestData();
                this.willList = this.willList.concat(res.data)

                this.$nextTick(() => {
                    mescroll.endSuccess(res.data.length)
                })
            } catch (err) {
                console.error(err);
            }
        }
```

## 参考文档
https://www.jianshu.com/p/e5968239acf7
