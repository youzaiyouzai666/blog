# react 初探

参考： [官方文档](https://react.docschina.org)   [React入门看这篇就够了](https://segmentfault.com/a/1190000012921279#articleHeader16)

### JSX与DOM

```JavaScript 
JSX --> bebal --> HTML
```

#### 1. JSX 解析

> 谁来解析jsx？

也可以使用` React.createElement()`来创建



#### 2. 基本使用

- 注意：JSX语法，最终会被编译为 createElement() 方法
- 推荐：**使用 JSX 的方式创建组件**
- JSX - JavaScript XML
- 安装：`npm i -D babel-preset-react` （依赖与：babel-core/babel-loader）

> 注意：JSX的语法需要通过 babel-preset-react 编译后，才能被解析执行

```javascript
/* 1 在 .babelrc 开启babel对 JSX 的转换 */
{
  "presets": [
    "env", "react"
  ]
}

/* 2 webpack.config.js */
module: [
  rules: [
    { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
  ]
]

/* 3 在 js 文件中 使用 JSX */
const dv = (
  <div title="标题" className="cls container">Hello JSX!</div>
)

/* 4 渲染 JSX 到页面中 */
ReactDOM.render(dv, document.getElementById('app'))
```



#### 3. 条件与循环

**因为 for是通过`key`来判断唯一标识的，所以，在组件上设置`key`会导致`props`无法取到**



#### 4. 表单

> 表单按照实现方式分为：受控组件与[非受控组件](https://react.docschina.org/docs/uncontrolled-components.html

##### 受控组件

[官方文档](https://react.docschina.org/docs/forms.html)



#### 5. 注意

- 注意 1: 如果在 JSX 中给元素添加类, 需要使用 `className` 代替 class
  - 类似：label 的 for属性，使用`htmlFor`代替
- 注意 2：在 JSX 中可以直接使用 JS代码，直接在 JSX 中通过 {} 中间写 JS代码即可
- 注意 3：在 JSX 中**只能使用表达式**，但是不能出现 语句！！！
- 注意 4：在 JSX 中注释语法：`{/* 中间是注释的内容 */}`



 ### 组件

#### 1. 创建组件

​	js函数（无状态）

​	通过class创建（有状态）



#### 2. 注意点：

- 注意：1 函数名称必须为大写字母开头，React通过这个特点来判断是不是一个组件
- 注意：2 函数必须有返回值，返回值可以是：JSX对象或`null`
- 注意：3 返回的JSX，必须有*一个*根元素
- 注意：4 组件的返回值使用`()`包裹，避免换行问题



#### 3. JavaScript 函数创建

```javascript
function Welcome(props) {
  return (
    // 此处注释的写法 
    <div className="shopping-list">
      {/* 此处 注释的写法 必须要{}包裹 */}
      <h1>Shopping List for {props.name}</h1>
      <ul>
        <li>Instagram</li>
        <li>WhatsApp</li>
      </ul>
    </div>
  )
}

ReactDOM.render(
  <Welcome name="jack" />,
  document.getElementById('app')
)
```

#### 4. class创建

```javascript
// 创建react对象
// 注意：基于 `ES6` 中的class，需要配合 `babel` 将代码转化为浏览器识别的ES5语法
// 安装：`npm i -D babel-preset-env`
 
//  react对象继承字React.Component
class ShoppingList extends React.Component {
  constructor(props) { 
    super(props)
  }
  // class创建的组件中 必须有rander方法 且显示return一个react对象或者null
  render() {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
        </ul>
      </div>
    )
  }
}
```

#### 5. 组件生命周期

组件的生命周期包含三个阶段：创建阶段（Mounting）、运行和交互阶段（Updating）、卸载阶段（Unmounting）

- Mounting：

> constructor()  ——初始化state，获取props
> componentWillMount() 
> render() 
> componentDidMount()

- Updating——多次执行

> componentWillReceiveProps() ——监听props 改变
> shouldComponentUpdate() ——是否重新渲染，return boolean
> componentWillUpdate() ——组件将要更新，不能修改状态，否则会循环渲染
> render() 
> componentDidUpdate(prevProps, prevState)

- Unmounting

> componentWillUnmount()



### 组件数据

> 数据核心关注：
>
>  	1. 数据流转（数据怎么来，怎么传）
>  	2. 数据如何更新

#### 1.props与state

​	props 默认是父组件传来的数据

​	state是组件内部的局部变量



#### 2. 数据不可变(更新机制)

[为什么不可变性在React当中非常重要](https://react.docschina.org/tutorial/tutorial.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E5%8F%AF%E5%8F%98%E6%80%A7%E5%9C%A8react%E5%BD%93%E4%B8%AD%E9%9D%9E%E5%B8%B8%E9%87%8D%E8%A6%81)

[会突变的数据的力量](https://react.docschina.org/docs/optimizing-performance.html#%E4%B8%8D%E4%BC%9A%E7%AA%81%E5%8F%98%E7%9A%84%E6%95%B0%E6%8D%AE%E7%9A%84%E5%8A%9B%E9%87%8F)

[MobX 和 React 十分钟快速入门](https://www.zcfy.cc/article/mobx-ten-minute-introduction-to-mobx-and-react-4306.html?t=new)

[使用mobx开发高性能rea](https://foio.github.io/mobx-react/)



###### state 改变时机

[不要直接更新状态](https://react.docschina.org/docs/state-and-lifecycle.html#%E4%B8%8D%E8%A6%81%E7%9B%B4%E6%8E%A5%E6%9B%B4%E6%96%B0%E7%8A%B6%E6%80%81)

`state`分为在` constructor `和 在其它地方

​	`constructor`中可以直接给`state`重新赋值

   而在其它地方，则必须使用

```react
 this.setState({})
```

具体事例对比：

 [codepen1](https://codepen.io/youzaiyouzai666/pen/BGjqoW?editors=0010)

[codepen2](https://codepen.io/youzaiyouzai666/pen/vQLvpq?editors=0010)

###### 状态更新是异步的（更新状态）



#### 3. 父—>子

- 组件中有一个 `只读的对象` 叫做 `props`，无法给props添加属性
- 获取方式：函数参数 `props`
- 作用：将传递给组件的属性转化为 `props` 对象中的属性

```javascript
function Welcome(props){
  // props ---> { username: 'zs', age: 20 }
  return (
    <div>
      <div>Welcome React</div>
      <h3>姓名：{props.username}----年龄是：{props.age}</h3>
    </div>
  )
}

// 给 Hello组件 传递 props：username 和 age(如果你想要传递numb类型是数据 就需要向下面这样)
ReactDOM.reander(<Hello username="zs" age={20}></Hello>, ......)
```



### 事件

#### 1. 基本

对比原生js事件绑定与vue事件绑定

传统html

```html
<button onclick="activateLasers()">
  Activate Lasers
</button>
```

React

```React
<button onClick={activateLasers}>
  Activate Lasers
</button>
```



阻止默认事件`e.preventDefault();`



#### 2. This问题

`this`问题（vue中没有，主要是JavaScript函数执行上下文的问题）

```react
// 使用 在 constructor中bind 函数  
// This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
```



```react
//使用箭头函数
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}
```



#### 3. 传递参数

```JavaScript
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

参数中event 如何拿到？



#### 4. 合成事件

> 特别注意: 事件池概念

`SyntheticEvent` 对象是通过合并得到的。 这意味着在事件回调被调用后，`SyntheticEvent` 对象将被重用并且所有属性都将被取消。 这是出于性能原因。 因此，您无法以异步方式访问该事件。

```react
function onClick(event) {
  console.log(event); // => nullified object.
  console.log(event.type); // => "click"
  const eventType = event.type; // => "click"

  setTimeout(function() {
    console.log(event.type); // => null
    console.log(eventType); // => "click"
  }, 0);

  // 不能工作。 this.state.click 事件只包含空值。
  this.setState({clickEvent: event});

  // 您仍然可以导出事件属性。
  this.setState({eventType: event.type});
}
```

> 注意：
>
> 如果要以异步方式访问事件属性，应该对事件调用 `event.persist()` ，这将从池中删除合成事件，并允许用户代码保留对事件的引用。



###虚拟DOM





### Router



#### 1. 基本使用

1. 根节点

   [Router](https://reacttraining.com/web/api/Router)  

​       HashRouter

​       BrowserRouter

2. Route 

   通过`path`匹配路由，可以多个

3. Switch

   路由选择

   ```react
   import { Switch, Route } from 'react-router'
   
   <Switch>
     <Route exact path="/" component={Home}/>
     <Route path="/about" component={About}/>
     <Route path="/:user" component={User}/>
     <Route component={NoMatch}/>
   </Switch>
   ```

#### 2. 异步加载（动态加载）

[【翻译】基于 Create React App路由4.0的异步组件加载](https://segmentfault.com/a/1190000010067597)

[React-Router动态路由设计最佳实践](https://segmentfault.com/a/1190000011765141)

[React中的async/await生命周期函数](https://zhuanlan.zhihu.com/p/30401565)

### MobX 

[官方文档](https://cn.mobx.js.org/)  [mobox学习总结](https://segmentfault.com/a/1190000013810512)

#### 1. 核心概念

> 原则：state尽可能的小



1. State

2. computed ——autorun (区别是autorun不会被GCC自动回收)

3. action—— 唯一修改state的途径

   ```javascript
   @action.bound //类似于 bind(所以不能与箭头函数一起使用)
   ```



#### 2. 异步处理

只需要`action`就可以了

**需要注意： action中异步处理回调需要修改observable的值，那么该回调也需要绑定action，且注意action中回调的this问题**

解决this问题

```javascript
//方案1 使用@action.bound
const Mobx = require("mobx");
Mobx.configure({ enforceActions: true });
const { observable, autorun, computed, extendObservable, action } = Mobx;
class Store {
  @observable a = 123;

  @action
  changeA() {
    this.a = 0;
    setTimeout(this.changeB, 1000);
  }
  @action.bound
  changeB() {
    this.a = 1000;
  }
}
var s = new Store();
autorun(() => console.log(s.a));
s.changeA();
```



```javascript
//方案2——直接包裹action

  @action
  changeA() {
    this.a = 0;
    setTimeout(action('changeB',()=>{
      this.a = 1000;
    }), 1000);
  }
}

```



```javascript
//方案3 使用runInAction 解释：runInAction(f) 是 action(f)() 的语法糖。
@action
  changeA() {
    this.a = 0;
    setTimeout(
      runInAction(() => {
        this.a = 1000;
      }),
      1000
    );
  }
```

#### 3. 一些难点

1. 无法监听`Object`新增属性，但可以通过`extendObservable(target, props)`来实现
2. 作用域的问题



#### 4. mobx-react

[MobX：MobX 和 React 十分钟快速入门](https://www.zcfy.cc/article/mobx-ten-minute-introduction-to-mobx-and-react-4306.html?t=new)

### API 梳理

#### [`setState()`](https://react.docschina.org/docs/react-component.html#setstate)

State 改变，并不会立即更新（可能是批处理或者推迟更新）

```javascript
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

当参数为function时，为异步的。**感觉有点像watch**

```javascript
// Correct 第一个参数 为改变前状态；第二个参数 更新后
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```



### 