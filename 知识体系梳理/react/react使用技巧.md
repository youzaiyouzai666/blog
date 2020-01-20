

# react技巧

[官网—React 理念](https://react.docschina.org/docs/thinking-in-react.html)

## 开发流程

1. 确定原型与JSON接口

2. 按照UI抽组件

3. 用React创建一个静态版本

   只有props，而不适用State

   自底向上|| 自顶而下

4. 设置state（最小原则）

5. 确定State位于哪个组件

6. 添加子向父的数据流



### JSX

```jsx
style={{'word-break':'break-all'}} //外面层{}表示 js，里面{}表示是一个Object
```







## 组件分类

### 1. 函数式组件

### 2. class 组件

### 3. Fragments

> [官方](https://react.docschina.org/docs/fragments.html)
>
> React 中的一个常见模式是一个组件返回多个元素。Fragments 允许你将子列表分组，而无需向 DOM 添加额外节点。

```react
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}
```

#### 带 key 的 Fragments

```react
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // 没有`key`，React 会发出一个关键警告
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
```



### 4.Portals

> Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案。







## react组件通信





## 共享代码

> 下面几种方法并不是孤立的

### 1. mixin



### 2. Render Props

[官方文档](https://react.docschina.org/docs/render-props.html)

[demo](https://codepen.io/youzaiyouzai666/pen/EOLReX?editors=0010)





### 3. 高阶组件





## 组件拆分原则

[官方-组合优与继承](https://react.docschina.org/docs/composition-vs-inheritance.html)



## Render Props

[官方](https://react.docschina.org/docs/render-props.html)

有点类似 `vue`的[`slot`插槽](https://cn.vuejs.org/v2/guide/components-slots.html)





## 高阶组件

[官网-高阶组件](https://react.docschina.org/docs/higher-order-components.html)

[React 高阶组件(HOC)入门指南](https://juejin.im/post/5914fb4a0ce4630069d1f3f6)

[深入理解 React 高阶组件](https://zhuanlan.zhihu.com/p/24776678)

[eact进阶之高阶组件](https://github.com/sunyongjian/blog/issues/25)



### 0.使用方式

#### 基本引用

```react
import React, { Component } from 'react';
import simpleHoc from './simple-hoc';

class Usual extends Component {
  render() {
    console.log(this.props, 'props');
    return (
      <div>
        Usual
      </div>
    )
  }
}
export default simpleHoc(Usual);
```

```react
import React, { Component } from 'react';

const simpleHoc = WrappedComponent => {
  console.log('simpleHoc');
  return class extends Component {
    render() {
      return <WrappedComponent {...this.props}/>
    }
  }
}
export default simpleHoc;
```



#### 装饰器模式引用

```react
import React, { Component } from 'react';
import simpleHoc from './simple-hoc';

@simpleHoc
export default class Usual extends Component {
  render() {
    return (
      <div>
        Usual
      </div>
    )
  }
}
```



### 1. 高阶组件作用

#### 属性代理

 	1. 操作props
 	2. 

#### 反向继承



### 2. 对比

####与mixin进行对比

![img](../../../ppt/react思考/img/mixin.png)



#### container对比





## Refs & DOM

参考：[官方-Refs & DOM](https://react.docschina.org/docs/refs-and-the-dom.html)

[从React官方文档看 refs 的使用和未来](https://juejin.im/post/5927f51244d904006414925a)

## React Hooks

[30分钟精通React今年最劲爆的新特性——React Hooks](https://juejin.im/post/5be3ea136fb9a049f9121014)

[React Hook的实现原理和最佳实践](https://zhuanlan.zhihu.com/p/75146261)