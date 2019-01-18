# 基本语法

1. jsx——模板语法

2. 组件

   [创建不同方式](https://segmentfault.com/a/1190000008402834)

   生命周期

   props vs states

3. 事件





# [一般开发流程](https://react.docschina.org/docs/thinking-in-react.html)

1. 确定原型与JSON接口

2. 按照UI抽组件(边界问题)

3. 用React创建一个静态版本

   只有props，而不适用State

   自底向上（较大）|| 自顶而下（较小）

4. 设置state（最小原则）

   props  vs state

5. 确定State位于哪个组件(一般是父子)

6. 添加子向父的数据流





#组件之间关系

1. 父子
2. 兄弟
3. 祖孙
4. 任意组件



# 组件之间通信

可以粗粗分为两种：

1. 状态提升

2. 发布者订阅（vue子——>父之间使用，但使用观察者模式的缺点是如何克服的）



# [拆分组件](https://blog.csdn.net/zhendong9860/article/details/76785242)

1. 分割Render函数

2. [Render Props](https://react.docschina.org/docs/render-props.html)

   ![Component Tree](../../../ppt/react思考/img/components.png)



# 组件之间抽象与复用

1. 继承（A is B）
2. 组合（A has B）



# 组件之间组合与复用





#   组件之间引用

1. 组件之间不仅仅是数据共享，还有代码之间共享
2. 继承
3. mixin
4. 



# 抽取组件难点及react提供方案

1. 难点： 状态应该在父组件还是子组件
2. 代码可读性： 在模板文件中，能很识别出整个逻辑
3. [容器组件和展示组件相分离](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)

# react-router

1. 对比 react-router2 与react-router3的



# 状态管理

1. 动机（多个组价间状态相互影响）
2. 变化|异步
3. 



# 第三方状态管理库介绍

1. redux

   基于 [容器组件和展示组件相分离](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) 的开发思想

2. [mobx](https://cn.mobx.js.org/)

3. Vuex

![Action, State, View](assets/action-state-view.png)

# 第三方状态管理库的对比



# 你可能不需要 状态管理库

- 你有着相当大量的、随时间变化的数据
- 你的 state 需要有一个单一可靠数据来源
- 你觉得把所有 state 放在最顶层组件中已经无法满足需要了



# setState

1. 异步
2. 批处理
3. 更新如何触发

## 基本

> `setState()`不是立刻更新组件。其可能是批处理或推迟更新。这使得在调用`setState()`后立刻读取`this.state`的一个潜在陷阱。代替地，使用`componentDidUpdate`或一个`setState`回调（`setState(updater, callback)`），当中的每个方法都会保证在更新被应用之后触发。

#### 1. API

```JavaScript
setState(stateChange|updater, [calback])
/*
*第一个参数  
*  stateChange 一个参数——仅是将stateChange浅合并到新状态中
*  updater 一个function  (prevState, props) => stateChange //prevState表示最新state
*第二个参数
*  [calback]——表示DOM批处理完成后再执行,类似vue $nextTick( [callback] )
*/
```



#### 2. 代码片段1

```react
() => {
  this.setState({ count: this.state.count + 1 })
  this.setState({ count: this.state.count + 1 })
  this.setState({ count: this.state.count + 1 })
}
```

等同：

```javascript
Object.assign(  
  {},
  { count: this.state.count + 1 },
  { count: this.state.count + 1 },
  { count: this.state.count + 1 },
)
```

**所以答案是：1 而不是 3**

那如何让答案是3呢？

```react
//方案一
setState((prevState, props)=>{
    count: prevState.count+1
})
```

```react
//方案二
this.setState(({ count: this.state.count + 1 },()=>{
    this.setState(({ count: this.state.count + 1 },()=>{
    	this.setState(({ count: this.state.count + 1 })
	})
})
```

```react
//方案三
//使用生命周期钩子
```



#### 3. 代码片段2

[参考](https://zhuanlan.zhihu.com/p/20328570)

```react
class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      val: 0
    };
  }
  
  componentDidMount() {
    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 1 次 log

    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 2 次 log

    setTimeout(() => {
      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 3 次 log

      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 4 次 log
    }, 0);
  }

  render() {
    return null;
  }
};
```

> 上面代码简单总结就是：
>
> ​	当在React事件处理控制之内，则state是一个批处理过程（展现是异步的）
>
> ​	当不在react掌控之内（setTimeout/addEventListener）中，则是一个同步过程。
>
> ​	具体如何判断，则看Transaction

![img](assets/4fd1a155faedff00910dfabe5de143fc_hd.png)



## setState Promise 化思考

### 1. 基本

因为 `setState()`本身是`callback`回调，会引起**回调地狱**

```javascript
setStateAsync(state){
    return new Promise((resolve)=>{
        this.setState(state,resolve)
    })
}
```

但可以使用：

### componentDidUpdate

```
componentDidUpdate(prevProps, prevState, snapshot)
```

React 更新组件后，调用`componentDidUpdate`。该方法在初始渲染时候不会被调用。

