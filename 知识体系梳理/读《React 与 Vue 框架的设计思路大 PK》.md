https://mp.weixin.qq.com/s/Rxc8yOvHqWKq-tBYu4akew

# 框架发展

主要需要解决问题：

1. 开发效率，开发体验
2. 性能
   - CPU的瓶颈：当项目变得庞大、组件数量繁多、遇到 **大计算量** 的操作或者 **设备性能不足** 使得页面掉帧，导致卡顿。——卡顿
   - IO的瓶颈：发送网络请求后，由于需要等待数据返回才能进一步操作导致不能快速响应。——白屏

## 字符串模板

JQuery 时代的渲染层，大部分都是基于字符串的模板，典型的框架就是 Underscore，baiduTemplate。

原理就是把 template 解析成一个函数，然过模板字符串，渲染出html

缺点：就是每次数据变化，模板内部要全部重新渲染

![image-20210402101428529](/Users/eleme/Library/Application Support/typora-user-images/image-20210402101428529.png)

更新是，命令式的。——开发体验，效率低下

## 最初响应式

>  响应式，提升了效率
>
> 响应式，就是 实现了 数据变化，框架自动实现dom变化

vue1   

 vue是 以监听数据（依赖收集），来实现响应式

据依赖收集，监听器太多，引起性能 diff雪崩 



![image-20210402101634750](/Users/eleme/Library/Application Support/typora-user-images/image-20210402101634750.png)

React15 

react 是虚拟DOM tree来实现响应式

架构中，dom diff 的时间超过 16.6ms，就可能会让页面卡顿，

![image-20210402101650603](/Users/eleme/Library/Application Support/typora-user-images/image-20210402101650603.png)



## 优化响应式（虚拟DOM）

### vue——组件作为颗粒度

Vue 选择了权衡，以组件作为颗粒度，组件层面用响应式通知，组件内部通过 dom diff 计算

![image-20210402102104743](/Users/eleme/Library/Application Support/typora-user-images/image-20210402102104743.png)

### react 时间切片——Fiber

简单的来说就是把 diff 的任务按照元素拆开，利用浏览器的空闲时间去算 diff，React 把各种优化的策略都留给了开发者，Vue 则是帮开发者做了很多优化的工作

[完全理解React Fiber](http://www.ayqy.net/blog/dive-into-react-fiber/)

[六个问题助你理解 React Fiber](https://segmentfault.com/a/1190000039682751)

![image-20210402102336279](/Users/eleme/Library/Application Support/typora-user-images/image-20210402102336279.png)

原来的 tree是 一颗树，更新时，只能遍历一颗树，递归遍历一颗树，不能中断。

现在 变成一个链表，可以中断

![image-20210402102350384](/Users/eleme/Library/Application Support/typora-user-images/image-20210402102350384.png)

## 未来

### vue3.0

![image-20210402102516593](/Users/eleme/Library/Application Support/typora-user-images/image-20210402102516593.png)

### react

Fiber实现了框架，可以中断执行，拆成一个个fiber。现在问题转换成，一个调度问题，优化调度算法，使其最优

####  Concurrent Mode【实验室功能】

https://zhuanlan.zhihu.com/p/109971435

#### react 17 无新功能

react 15升级16 代价很大，以后升级可能很好，一个项目，可以使用不同版本的react

https://zh-hans.reactjs.org/blog/2020/10/20/react-v17.html

[React17新特性：启发式更新算法](https://zhuanlan.zhihu.com/p/182411298)





# 为什么vue与react解决方案差如此多？

![image-20210402112438742](/Users/eleme/Library/Application Support/typora-user-images/image-20210402112438742.png)

## 根本原因——JSX vs Template

![image-20210402130848047](/Users/eleme/Library/Application Support/typora-user-images/image-20210402130848047.png)

- JSX 具有 JavaScript 的完整表现力，可以构建非常复杂的组件。但是**灵活**的语法，也意味着**引擎难以理解**，无法预判开发者的用户意图，从而难以优化性能。
- Template 模板是一种非常有**约束**的语言，你只能以某种方式去编写模板。

  既然存在以上**编译时先天不足**，在运行时优化方面，React一直在努力。比如，React15实现了batchedUpdates（批量更新）。即**同一事件回调函数上下文**中的多次setState只会触发一次更新。

## 



## 预处理

![image-20210402135649732](/Users/eleme/Library/Application Support/typora-user-images/image-20210402135649732.png)

## 可变数据 VS 不可变数据

![image-20210402135956549](/Users/eleme/Library/Application Support/typora-user-images/image-20210402135956549.png)

