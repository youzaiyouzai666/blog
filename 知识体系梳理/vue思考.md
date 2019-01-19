# Vue 思考

## vue模板语法设计

> Vue 设计模板语法，核心需要考虑的是动态数据绑定（data变，那么html自动跟随变化）

### 1. 基本结构

[官方文档](https://cn.vuejs.org/v2/guide/syntax.html)

vue实现 前端模板使用了

```vue
{{双括号}}  //html 中text(文本插入)
v-html   //html （原始html）
v-bind   // 属性 (特性)
```



### 2. 条件语句与for（指令）





### 3. v-model

#### 普通模板

> `v-model` 会忽略所有表单元素的 `value`、`checked`、`selected` 特性的初始值而总是将 Vue 实例的数据作为数据来源

```vue
<input v-model="searchText">
```

等价:

```vue
<input
  v-bind:value="searchText"
  v-on:input="searchText = $event.target.value"
>
```

#### 组件

```vue
<custom-input v-model="searchText"></custom-input>
```

等价：

```vue
<custom-input
  v-bind:value="searchText"
  v-on:input="searchText = $event"
></custom-input>
```

custom-input组件：

- 将其 `value` 特性绑定到一个名叫 `value` 的 prop 上
- 在其 `input` 事件被触发时，将新的值通过自定义的 `input` 事件抛出

```vue
Vue.component('custom-input', {
  props: ['value'],
  template: `
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  `
})
```

#### [自定义组件的 `v-model`](https://cn.vuejs.org/v2/guide/components-custom-events.html)

```vue
Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
})
```

使用：

```vue
<base-checkbox v-model="lovingVue"></base-checkbox>
```

### 受控组件

> HTML表单元素与React中的其他DOM元素有所不同,因为表单元素生来就保留一些内部状态。





## vue 数据流







