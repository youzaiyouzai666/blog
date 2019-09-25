参考：

[React v16.3之后的组件生命周期函数](https://zhuanlan.zhihu.com/p/38030418)



## 演变

### 16.3 之前

![img](assets/1*sn-ftowp0_VVRbeUAFECMA.png)



### 16.3

![img](assets/v2-8c9f2b2eebc3449da805e8bd0deced47_hd.jpg)

### 16.4

[官方](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

![img](assets/v2-930c5299db442e73dbb1d2f9c92310d4_hd.jpg)

![image-20190827163725855](assets/image-20190827163725855.png)

### 总之

16.3之后添加了

- getDerivedStateFromProps
- getSnapshotBeforeUpdate

删除了

```
componentWillReceiveProps
componentWillMount
componentWillUpdate
```



### 为什么生命钩子要更新

因为React Fiber

[React Fiber是什么](https://zhuanlan.zhihu.com/p/26027085)



## 最新

### 1.`static getDerivedStateFromProps()`

[api](https://zh-hans.reactjs.org/docs/react-component.html#static-getderivedstatefromprops)

返回 对象来更新 state

> 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。
>
> 它应返回一个对象来**更新 state**，如果返回 null 则不更新任何内容。
>
> `getDerivedStateFromProps` 的存在只有一个目的：让组件在 **props 变化**时更新 state。





### 2. `getSnapshotBeforeUpdate()`

[API](https://zh-hans.reactjs.org/docs/react-component.html#getsnapshotbeforeupdate)

![image-20190828175035536](assets/image-20190828175035536.png)