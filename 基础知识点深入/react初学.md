# react 初探

参考： [官方文档](https://react.docschina.org/docs)   [React入门看这篇就够了](https://segmentfault.com/a/1190000012921279#articleHeader16)

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



#### 3. 注意

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

#### 1.props与state



#### 2. 父—>子

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



#### 2. 传递参数

```JavaScript
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

参数中event 如何拿到？



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


### MobX 

[官方文档](https://cn.mobx.js.org/)

#### 1. 核心概念



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