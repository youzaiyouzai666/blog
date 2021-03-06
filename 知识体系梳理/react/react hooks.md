[阮一峰blog](https://www.ruanyifeng.com/blog/2019/09/react-hooks.html)

[React Hooks 详解](https://juejin.im/post/5dbbdbd5f265da4d4b5fe57d#heading-42)

精华——[React Hooks 原理与最佳实践](https://mp.weixin.qq.com/s/2-nvV2wIJID8xCWeRW2iNQ)

[复杂状态处理：如何保证状态一致性？](https://time.geekbang.org/column/article/383084)

[React Hooks 原理](https://github.com/brickspert/blog/issues/26)

[React Hooks 常见问题及解决方案](https://juejin.cn/post/6875222549446262798#heading-3)

[useEffect 完整指南](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)

# 基础

## 动机

[官方](https://react.docschina.org/docs/hooks-intro.html#motivation)

> ### 在组件之间复用状态逻辑很难
>
> ### 复杂组件变得难以理解
>
> ### 难以理解的 class

组件的逻辑复用，https://github.com/brickspert/blog/issues/31

## hook含义

> Hook 这个单词的意思是"钩子"。
>
> **React Hooks 的意思是，组件尽量写成纯函数，如果需要外部功能和副作用，就用钩子把外部代码"钩"进来。** React Hooks 就是那些钩子。

## Hook 规则

>### 只在最顶层使用 Hook
>
>### 只在 React 函数中调用 Hook

# 使用

## 基本方法

![image-20200903160332927](/Users/eleme/Library/Application Support/typora-user-images/image-20200903160332927.png)

下面介绍 React 默认提供的四个最常用的钩子。

> - useState()
> - useContext()
> - useReducer()
> - useEffect()

## useState()：状态钩子

<iframe
     src="https://codesandbox.io/embed/nifty-waterfall-4i2dq?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="nifty-waterfall-4i2dq"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>


### 每次渲染都是独立的闭包

https://codepen.io/youzaiyouzai666/pen/oNXOZOw



### **useReducer && useContext**

[【译】在 React Hooks 中使用 useReducer 的几种用例](https://juejin.im/post/6844903817981460493)

# 进阶

## 1. useState & useMemo & useCallback

[【译】什么时候使用 useMemo 和 useCallback](https://jancat.github.io/post/2019/translation-usememo-and-usecallback/)

```react
//useMemo
import React, { memo, useState, useMemo } from "react";
function App() {
    const [value, setValue] = useState(0);
    const increase = useMemo(() => {
        if(value > 2) return value + 1;
    }, [value]);
    return (
        <div>
            <Child value={value} />
            <button
                type="button"
                onClick={() => {
                    setValue(value + 1);
                }}
            >
                value:{value},increase:{increase || 0}
            </button>
        </div>
    );
}
const Child = memo(function Child(props) {
    console.log('Child render')
    return <h1>value:{props.value}</h1>;
});
export default App;
```



# hooks中闭包的坑

> https://segmentfault.com/a/1190000020805789
>
> https://github.com/hacker0limbo/my-blog/issues/6

## useState

一开始先点击`Show alert`按钮, 然后立马点击 3 次 `Click me`按钮, 3 秒过后浏览器打印出来的结果为打印出`"You clicked on: 0"`

```javascript
function App() {
  const [count, setCount] = useState(0);

  function handleAlertClick() {
    setTimeout(() => {
      alert("You clicked on: " + count);
    }, 3000);
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <button onClick={handleAlertClick}>Show alert</button>
    </div>
  );
}
```



## useMounted

```react
import React, { useEffect, useRef, useCallback } from 'react';

export const useMounted = () => {
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  return () => mountedRef.current;
};


```



## useState vs setState

- `useState` 只能作用在函数组件，`setState` 只能作用在类组件
- `useState` 可以在函数组件中声明多个，而类组件中的状态值都必须声明在 `this` 的 `state` 对象中
- 一般的情况下，`state` 改变时：
  - `useState` 修改 `state` 时，同一个 `useState` 声明的值会被 **覆盖处理**，多个 `useState` 声明的值会触发 **多次渲染**
  - `setState` 修改 `state` 时，多次 `setState` 的对象会被 **合并处理**
- `useState` 修改 `state` 时，设置相同的值，函数组件不会重新渲染，而继承 `Component` 的类组件，即便 `setState` 相同的值，也会触发渲染



## React使用hook判断组件是否卸载

是在组件卸载后，还调用了setState，造成了内存泄漏。

Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in %s.%s a useEffect cleanup function.

```react
import React, { useEffect, useRef, useCallback } from 'react';

export const useMounted = () => {
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  return () => mountedRef.current;
};

```



