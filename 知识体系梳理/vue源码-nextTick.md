# vue源码-nextTick

> 参考： [Vue源码详解之nextTick：MutationObserver只是浮云，microtask才是核心！](https://github.com/Ma63d/vue-analysis/issues/6)      

> 摘要：
>
>  	1. nextTick 用法也就是作用
>  	2. event loop 重点是内部分类
>  	3. nextTick vue实现原理（vue源码中如何实现）
>  	4. **重点：**上面 event loop与 实现原理都不能解释` nextTick（）` 为什么可以在DOM**更新后** 执行回调



看来很多文章，要么讲的不清楚，要么讲的太复杂。尝试着完全讲明白

##  1.nextTick 作用



具体功能：

​	[参考API](https://cn.vuejs.org/v2/api/#vm-nextTick)   将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。 

[参见demo](https://codepen.io/youzaiyouzai666/pen/depYpN?editors=1011)  



## 2. event loop

> 参考：   [跟着 Event loop 规范理解浏览器中的异步机制](https://github.com/fi3ework/blog/issues/29)

JavaScript 代码执行分为三类

1. 同步代码

2. microtask 微任务

3. task 宏任务

   **每task执行完后 会UI重绘**

   



## 3.nextTick实现原理

> 具体 vue中nextTick实现原理

1.   nextTick是microtask 微任务 队列中的。



## 4. nextTick（） 为什么可以在DOM更新后执行回调

> 看[参考源码](https://github.com/vuejs/vue/blob/dev/src/core/util/next-tick.js#L90) 本质上是一个异步执行，但在一个event loop 中最后才执行 UI重绘，
>
> **按照上面理论，nextTick 回调中代码应该是在DOM更新前执行**