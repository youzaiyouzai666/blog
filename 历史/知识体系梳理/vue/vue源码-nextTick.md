# vue源码-nextTick

> 参考： [Vue源码详解之nextTick：MutationObserver只是浮云，microtask才是核心！](https://github.com/Ma63d/vue-analysis/issues/6)      

> 摘要：
>
>    	1. nextTick 用法也就是作用
>    	2. event loop 重点是内部分类
>    	3. nextTick vue实现原理（vue源码中如何实现）
>    	4. **重点：**上面 event loop与 实现原理都不能解释` nextTick（）` 为什么可以在DOM**更新后** 执行回调



>核心： 将所有的状态改变放在一个队列里，等所有的状态改变完成后，再拿着**最终的状态**去进行DOM更新
>
>难点是： 如何知道什么时间点是最终的状态
>
>vue做法是：
>
>​	分为两步，
>
>​	第一步是: 状态更改  
>
>​	  第二步是：`microtask`触发（认为是state已经是最终的），
>
>​	`microtask`本身也是一个队列（先进先出），`nextTick`其实就是对`microtask`向执行队列`push`类似			操作



看来很多文章，要么讲的不清楚，要么讲的太复杂。尝试着完全讲明白

## [0. DOM操作是同步的](https://segmentfault.com/a/1190000005803237)

[codepen](https://codepen.io/youzaiyouzai666/pen/GPVXLQ?editors=1010)

> 浏览器对JavaScriptDOM操作本身是有优化的，将其放在一个队列里，批处理。但并不意味着DOM操作是异步的。

JavaScript 操作DOM会引起 重绘与回流

```javascript
var element = document.getElementById('mydiv');
element.style.height = "100px";  // 步骤1 将DOM操作放在一个队列中，并没有执行GUI dom操作
element.style.borderLeft = "1px"; //步骤2 因为是同步操作， 要等待步骤1(触发步骤1 GUI DOM 操作) 完成DOM后，然后计算
element.style.padding = "20px";
```





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