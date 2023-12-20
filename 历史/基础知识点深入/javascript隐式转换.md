

[参考](https://juejin.im/post/5a7172d9f265da3e3245cbca)

[What is {} + {} in JavaScript?](https://2ality.com/2012/01/object-plus-object.html)

## 总论

### 1. 为什么会有隐式类型转换且如此复杂







## 触发隐式触发的条件

> 一般触发条件

#### 1. ==

#### 2. 数学运算



## 隐式转换的的过程

> 核心问题是：
>
> ​	1. 先调用 `valueOf()`还是 先调用`toString()`方法(顺序问题)
>
> 	2. 如果 先调用的返回不是 原始类型(基本类型)，则继续调用后续方法



## 遇到问题

[What is {} + {} in JavaScript?](https://2ality.com/2012/01/object-plus-object.html)

```
1 + {} //"1[object Object]"
{} + 1 //1 问题是JavaScript将第一个{}解释为空代码块并忽略它
```

