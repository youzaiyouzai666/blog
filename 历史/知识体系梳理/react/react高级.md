# 事件

[React 事件代理与 stopImmediatePropagation](https://github.com/youngwind/blog/issues/107)

react 自己封装实现了事件系统，但并未浏览器 事件

1. e.stopPropagation → 用来阻止 React 模拟的事件冒泡
2. e.stopImmediatePropagation → 没有这个函数
3. e.nativeEvent.stopPropagation → 原生事件对象的用于阻止 DOM 事件的进一步捕获或者冒泡
4. e.nativeEvent.stopImmediatePropagation → 原生事件对象的用于阻止 DOM 事件的进一步捕获或者冒泡，且该元素的后续绑定的相同事件类型的事件也被一并阻止。



# 探索 React 组件之间的生命周期

http://www.thewashingtonhua.com/blog/2019/05/02/react-lifecycle

