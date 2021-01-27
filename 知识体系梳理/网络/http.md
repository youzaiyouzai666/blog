参考：[解读HTTP/2与HTTP/3 的新特性](https://mp.weixin.qq.com/s/XVaQH7vE4YOuZyYgS6aGQg)

## http/1.1 缺陷





# http

## 1. 缓存

![image-20200314163322764](/Users/eleme/git/blog/知识体系梳理/assets/image-20200314163322764.png)

### 强制缓存：

1. cache-control 和 max-age ——  http 1.1 定义的，意义是缓存多少毫秒，可以覆盖 expires

2. ### expires —— 缓存多久

### 协商缓存

1. ETag —— 文件hash  （缺点：需要每次改变耗费cpu算） 【优先级高】

2. Last-Modified 的区别  —— 上次修改时间 （缺点：精确到秒）

   

   

## 2.[三次握手，四次挥手](https://juejin.im/post/5d9c284b518825095879e7a5)

### 1). 为什么需要三次握手，两次不行吗？（接受，发送）

如果两次握手，服务端建立连接后，不确定，客户端是否建立连接

> 重点是 需要各自确认（接受，发送）
>
> 需要三次握手才能确认双方的接收与发送能力是否正常

![image-20200825112051914](/Users/eleme/Library/Application Support/typora-user-images/image-20200825112051914.png)

### 2） 四次挥手

![image-20200825141213928](/Users/eleme/Library/Application Support/typora-user-images/image-20200825141213928.png)

**为什么断开连接需要四次挥手👋呢，像建立连接的时候一样，三次行不行呢？**



## 3.url输入后

```
网络（请求与响应）
浏览器渲染过程
```

### 1）网络（请求与响应）

过程：

1.DNS域名解析；
2.建立TCP连接；（3次握手，为什么三次握手）
3.发送HTTP请求；
4.服务器处理请求；
5.返回响应结果；
6.关闭TCP连接；

### 2）浏览器渲染过程

​	- 解析dom

​	- 请求css,js，图片资源。并行，有限制

 - 执行js，css会阻塞渲染和加载。

   

[原来 CSS 与 JS 是这样阻塞 DOM 解析和渲染的](https://github.com/ljf0113/how-js-and-css-block-dom)

defer和async

![image-20200315205727185](/Users/eleme/git/blog/知识体系梳理/assets/image-20200315205727185.png)



## http 演进

[http 演进解决问题](https://mp.weixin.qq.com/s/XVaQH7vE4YOuZyYgS6aGQg)

### 1.HTTP/1.1的缺陷

1. 队头阻塞

2. ### 无状态特性--带来的巨大HTTP头部(cookice)

3. ### 明文传输--带来的不安全性

4. ### 不支持服务器推送消息

### 2.HTTP/2 新特性

1. ### 二进制传输

2. ### Header 压缩 ——压缩算法不是主流的算法，是专门实现的

3. ### 多路复用

4. ### Server Push

5. https

### 3.HTTP/2 的缺点

1. TCP的队头阻塞并没有彻底解决

### 4.http3

基于 udp 连接的，而不是tcp





## [TCP队头阻塞](https://http3-explained.haxx.se/zh/why-quic/why-tcphol)

## 

