# 渲染函数

## 基础

```vue
<anchored-heading :level="1">Hello world!</anchored-heading>
```

```vue
<script type="text/x-template" id="anchored-heading-template">
  <h1 v-if="level === 1">
    <slot></slot>
  </h1>
  <h2 v-else-if="level === 2">
    <slot></slot>
  </h2>
  <h3 v-else-if="level === 3">
    <slot></slot>
  </h3>
  <h4 v-else-if="level === 4">
    <slot></slot>
  </h4>
  <h5 v-else-if="level === 5">
    <slot></slot>
  </h5>
  <h6 v-else-if="level === 6">
    <slot></slot>
  </h6>
</script>

Vue.component('anchored-heading', {
  template: '#anchored-heading-template',
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
```

Render 函数

```javascript
Vue.component('anchored-heading', {
  render: function (createElement) {
    return createElement(
      'h' + this.level,   // 标签名称
      this.$slots.default // 子节点数组
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
```



## 数据

[官方](https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1)

> Vue 组件有哪些数据(源码)



## JavaScript代替v-if 等指令





## demo

一个完备的DEMO<https://codepen.io/youzaiyouzai666/pen/qzavqN>





# JSX

[GIT：vue-jsx](<https://github.com/vuejs/jsx#installation>)

[在Vue中使用JSX的正确姿势](<https://zhuanlan.zhihu.com/p/37920151>)

**React中父子之间传递的所有数据都是属性，即所有数据均挂载在`props`下（style, className, children, value， onChange等等）。**

**Vue则不然，仅仅属性就有三种：组件属性`props`，普通html属性`attrs`，Dom属性`domProps`。**



#函数式组件







