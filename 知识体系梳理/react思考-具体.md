# 基本语法

## 1.JSX——模板语法

### createElement

### JSX

实际`jsx`语法 最终被`babel`转换为 `createElement`

```react
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```

```react
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

```react
//React.createElement()返回
// 注意: 以下示例是简化过的（不代表在 React 源码中是这样）
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world'
  }
};
```



### 思考：Vue 模板语法最终转为`render`语法



## [2.组件创建](https://segmentfault.com/a/1190000008402834)

[在React.js中使用PureComponent的重要性和使用方式](https://www.zcfy.cc/article/why-and-how-to-use-purecomponent-in-react-js-60devs)

### 1. function



### 2. React.createClass



### 3. extends React.Component



### 4. extends React.PureComponent

### 思考：Vue组件创建



## 3. 事件

声明式  vs 命令式

### 对比——基本语法

Html:

```html
<button onclick="activateLasers()">
  Activate Lasers
</button>
```

React:

- React事件绑定属性的命名采用驼峰式写法，而不是小写。
- 如果采用 JSX 的语法你需要传入一个函数作为事件处理函数，而不是一个字符串(DOM元素的写法)

```react
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

Vue:

```vue
<div id="example-2">
  <!-- `greet` 是在下面定义的方法名 -->
  <button v-on:click="greet">Greet</button>
</div>
```

**思考：为什么在HTML中监听事件？**

1. react组件和vue模板本质是JavaScript
2. 最核心是，因为组件系统，将模板文件抽的很小，复杂度很低。



### 对比——参数

Html:

```html
<!--1.必须是event 2.this表示当前节点-->
<button onclick="console.log(event.type)">
    click me
</button>
```

React:

```react
//版本1
function ActionLink() {
  function handleClick(e) {
    console.log(e);
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```

```react
//版本2——注意this
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>//1.里面再封装一层 2.事件对象e要放在最后
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
//对比 react与 vue中this在事件中的指向问题！
```

Vue：

```vue
<div id="example-3">
  <button v-on:click="say('hi', $event)">Say hi</button>
  <button v-on:click="say('what', $event)">Say what</button>
</div>
```

**思考：为什么语法会如此之不同，特别是`vue`,`react`之间？**



### 对比——事件对象

原生Event

```javascript
preventDefault()  //取消默认行为
stopPropagation() //阻止冒泡
```

React Event 对象

> 1. 是一个合成事件。React 根据 [W3C spec](https://www.w3.org/TR/DOM-Level-3-Events/) 来定义这些合成事件，所以你不需要担心跨浏览器的兼容性问题。
> 2. e.nativeEvent  //得到原生事件对象

Vue

```vue
// v-on 提供了事件修饰符
.stop
.prevent
.capture
.self
.once
.passive
```





# 组件之间关系

## 1. 父子

父——>子 props

子——>父 props function

**思考： **

1. vue 子——> 父 为什么要 `$emit()`
2. props ——能不能传方法设计的优缺点

## 2. 兄弟

通过父类



## 3. 祖孙之间

[聊一聊我对 React Context 的理解以及应用](https://juejin.im/post/5a90e0545188257a63112977)

生产者消费者模式

