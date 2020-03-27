# React-Vue对比

## 1. React 是以函数为基本点，vue 还是以html来

react 高阶组件，renderProps 其实本质出发点是function

vue slot 是以html为出发点











## 2. React 为什么没有Vue 中的组件注册

https://github.com/youngwind/blog/issues/92

https://github.com/youngwind/blog/issues/104

### 问题描述：

Vue:

```vue
<div id="app">
    <my-component message="hello liangshaofeng!"></my-component>
    <my-component message="hello Vue!"></my-component>
</div>
import Vue from 'Vue';

var MyComponent = Vue.extend({
    template: '<p>{{message}}</p>'
});

Vue.component('my-component', MyComponent);//多的一步

const app = new Vue({
    el: '#app'
});
```

React:

```react
var HelloMessage = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});
// 你看，React不需要将HellMessage注册成<hello-message>
ReactDOM.render(<HelloMessage name="John" />, mountNode);
```



### 解决分析

> 不管是`Vue`还是`React`都是把`tpl`处理，然后转换为`DOM`，需要处理点

#### 1. 首先，要搞明白`Vue.component`做了什么？





#### 2. Vue|React组件如何创建与渲染





#### 1. react 解决方案

```react
import {render} from 'preact';

render((
    <div id="foo">
        <span>Hello, world!</span>
        <button>按钮</button>
    </div>
), document.body);
```

被babel编译解析：

![jsx](/Users/didi/git/blog/知识体系梳理/assets/60cc7362-4132-11e7-8279-edc3f52fe814.png)

其中babel会注入一个h函数，h函数完全可以实现把`tpl`处理，然后转换为`DOM`



#### 2. vue方案

Vue注册组件，核心工作是：组件与标签名的映射

```vue
<div id="app">
    <my-component message="hello liangshaofeng!"></my-component>
    <my-component message="hello Vue!"></my-component>
</div>
Vue.component('my-component', { template: '<p>{{message}}</p>'});//Vue 中`import `仅仅是个引入文件，并没有做特殊处理

const app = new Vue({
    el: '#app'
});
```

Vue 中`import `仅仅是个引入文件，并没有做特殊处理，所以需要`Vue.component`进行显示的注册组件

有人会说[vue Loader](https://vue-loader.vuejs.org/zh/)来处理，但实际功能并没有注册组件



vueLoader 功能：

- 允许为 Vue 组件的每个部分使用其它的 webpack loader，例如在 `<style>` 的部分使用 Sass 和在 `<template>` 的部分使用 Pug；
- 允许在一个 `.vue` 文件中使用自定义块，并对其运用自定义的 loader 链；
- 使用 webpack loader 将 `<style>` 和 `<template>` 中引用的资源当作模块依赖来处理；
- 为每个组件模拟出 scoped CSS；
- 在开发过程中使用热重载来保持状态。

简而言之，webpack 和 Vue Loader 的结合为你提供了一个现代、灵活且极其强大的前端工作流，来帮助撰写 Vue.js 应用。

为什么不在`vue Loader `中实现自动注册组件

1. 可能是设计理念，
2. Vue需要直接应用在普通的DOM结构上，然而，在这些普通的DOM结构当中，可能之前就已经存在[自定义标签](http://www.cnblogs.com/rubylouvre/p/3307413.html)了，Vue提供的注册功能正好可以解决这个命名冲突的问题。
   也就是说，假如没有注册功能，直接把组件MyComponent对应成标签，要是万一之前的DOM结构里面已经有这样一个自定义的标签，也叫mycomponent，这不就懵逼了吗？



#### 3. vue 实现自动全局注册组件

使用`webpack`的`require.context`来，自动的读取特定目录下面的组件，然后，程序自动的调用`Vue.component`来注册组件

```vue
import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  // 其组件目录的相对路径
  './components',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 剥去文件名开头的 `./` 和结尾的扩展名
      fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
    )
  )

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})

```



## 状态改变

```vue
this.data.a = 'b'
```



```rea
this.state.a = 'b'//错误
this.setState({
	a:'b'
})
//列外
constructor(){
 super()
 this.state = {
 	a:'a'
 }
 this.state.a = 'c'
}
```



```react

```



