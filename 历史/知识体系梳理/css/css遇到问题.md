

https://juejin.cn/post/6844903633109139464



## 普通 css 的不足

随着大家对新开发模式（组件化）下 css 使用的各种反思，个人总结主要有三个：

1. 样式与状态相关的情况越来越多，需要动态、能直接访问组件state的css。
2. 现代web开发已经是组件化的天下，而css并不是为组件化而生的语言。
3. 一切样式都是全局，产生的各种命名的痛苦，BEM等命名规则能解决一部分问题，但当你使用三方插件时却无法避免命名冲突。



## React中遇到问题

- 是否解决了React开发的痛点：局部css，动态css？
- 是否支持所有css甚至是sass用法？伪类,嵌套，动画，媒体查询？
- 是否兼容你需要使用的第三方UI库？
- 是否能和纯css，或者是其他css框架很好共存，以备遇到特殊情况可以有方案B？
- 性能？大小？



## Vue 的解决法

https://cn.vuejs.org/v2/guide/class-and-style.html

```
<style>
/* 全局样式 */
</style>

<style scoped>
/* 本地样式 */
</style>
复制代码
```

一旦加上 `scoped` 属性，css 就只作用于所在组件。简洁漂亮的解决。美中不足的是样式并不能直接访问组件状态，于是乎需要另外规定动态css的语法与此合并使用。

## 回顾 React 的解决法

### 1. 原生

```
const textStyles = {
  color: 'white',
  backgroundColor: this.state.bgColor
};

<p style={textStyles}>inline style</p>
复制代码
```

原生的解决方式就是inline style，这种在旧式开发上不推崇的css写法却非常适合组件化开发。inline style解决了之前提到的三个问题。但相对的，个人觉得不喜欢的地方在于：

1. 发明了一套新的 css-in-js 语法，使用驼峰化名称等一些规则，需要重新熟悉不说，也没有自动补完（方便讨论下面称这类写法jss）
2. 并且并不支持所有的 css，例如媒体查询，`:before`和`:nth-child`等 pseudo selectors
3. inline 写法如果直接同行写影响代码阅读，如果提取出来再namespace，比起传统css要繁琐
4. 第三方插件如果只接受 className 不接受 style 就没法了

由于1,3只是个人偏好问题，所以之后一批css-in-js库都坚持了inline和jss，只是致力于解决对css的不完全支持问题。这些虽然不是我的菜，但都是流行的解决方式：

作者：FateRiddle
链接：https://juejin.cn/post/6844903633109139464
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。





## umi方案

https://umijs.org/zh-CN/docs/assets-css

