[阮一峰blog](https://www.ruanyifeng.com/blog/2019/09/react-hooks.html)

[React Hooks 详解](https://juejin.im/post/5dbbdbd5f265da4d4b5fe57d#heading-42)

# 基础

## 动机

[官方](https://react.docschina.org/docs/hooks-intro.html#motivation)

> ### 在组件之间复用状态逻辑很难
>
> ### 复杂组件变得难以理解
>
> ### 难以理解的 class

## hook含义

> Hook 这个单词的意思是"钩子"。
>
> **React Hooks 的意思是，组件尽量写成纯函数，如果需要外部功能和副作用，就用钩子把外部代码"钩"进来。** React Hooks 就是那些钩子。

> - 

## Hook 规则

>### 只在最顶层使用 Hook
>
>### 只在 React 函数中调用 Hook

# 使用

## 基本方法

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

