# 数值3为添加逗号
## 数值添加逗号
将10000->10,000

- 方案1
```
function formatNum(num) {
    if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(num)) {
        alert("wrong!");
        return num;
    }
    var a = RegExp.$1, b = RegExp.$2, c = RegExp.$3;
    b = b.replace(/\B(?=(?:\d{3})+\b)/g, ',')
    return a + "" + b + "" + c;
}
```
此方案的问题：如果小数点后全为0，则最终显示的是无小数点。与echart处理的方案一致。

- 方案2
```
  num.toLocaleString();
```

问题：小数点最多支持3位
