# 基本使用

## 1. 安装

参考：[官网](https://koa.bootcss.com/)

###  async 方法支持

> 对比express的`next()`

要在 node < 7.6 版本的 Koa 中使用 `async` 方法, 我们推荐使用 [babel's require hook](https://babel.bootcss.com/docs/usage/babel-register/).

Step 1

```node
require('babel-register');
// 应用的其余 require 需要被放到 hook 后面
const app = require('./app');

```

Step 2

`.babelrc` 文件中:

```javascript
{
  "plugins": ["transform-async-to-generator"]
}
```







# 异常处理

[koa2 中的错误处理以及中间件设计原理](http://www.52cik.com/2018/05/27/koa-error.html)