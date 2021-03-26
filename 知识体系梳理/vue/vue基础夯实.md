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



**报错：**

```
Duplicate declaration "h" (This is an error on an internal node. Probably an internal error.)
复制代码
```

解决办法：[github.com/vuejs/babel…](https://github.com/vuejs/babel-plugin-transform-vue-jsx/issues/152)

```
//在.babelrc配置，删掉"@vue/babel-preset-jsx"
{
  "presets": ["@vue/app"]
}
```



# v-bind

[vue.js - v-bind 的一些理解和思考](https://www.jianshu.com/p/98dfa4c6389c)

[demo](https://codepen.io/youzaiyouzai666/pen/agreKd?editors=1010)

## 1.基本功能

###执行运算

> 支持一个**单一 JavaScript 表达式** （`v-for` 除外）



### 执行函数





## 2.`v-bind` 用于 `class` 和 `style` 时，Vue.js 做了专门的增强

> 在将 `v-bind` 用于 `class` 和 `style` 时，Vue.js 做了专门的增强。表达式结果的类型除了字符串之外，还可以是对象或数组。







# 组件

## 1. 动态组件



## 2. 递归组件

循环组件解决两个问题

1. 模块循环加载问题（1. Es6 import  2. webpack 的异步 `import`  3.vue  beforeCreate 去注册 ）
2. Vue 找组件方式，默认 是使用组件注册方式，但在循环组件中，组件 name ，可以代替注册

// 递归组件: 组件在它的模板内可以递归的调用自己，只要给组件设置name组件就可以了。
// 设置那么House在组件模板内就可以递归使用了,不过需要注意的是，
// 必须给一个条件来限制数量，否则会抛出错误: max stack size exceeded
// 组件递归用来开发一些具体有未知层级关系的独立组件。比如：
// 联级选择器和树形控件 

```vue
<template>
  <div v-for="(item,index) in treeArr">
      子组件，当前层级值： {{index}} <br/>
      <!-- 递归调用自身, 后台判断是否不存在改值 -->
      <tree :item="item.arr" v-if="item.flag"></tree>
  </div>
</template>
<script>
export default {
  // 必须定义name，组件内部才能递归调用
  name: 'tree',
  data(){
    return {}
  },
  // 接收外部传入的值
  props: {
     item: {
      type:Array,
      default: ()=>[]
    }
  }
}
</script>

作者：火狼1
链接：https://juejin.im/post/5d9d386fe51d45784d3f8637
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```



## 3. 函数组件

