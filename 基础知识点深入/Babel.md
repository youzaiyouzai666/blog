# Babel 使用

参考：

​	[babel 中文](https://www.babeljs.cn/)

​	[你真的会用 Babel 吗?](https://juejin.im/entry/59ba1a3c5188255e723b8cae)



## 命令行

```node
npx babel script.js --out-file script-compiled.js --presets=es2015,react
```



## 历史问题

### 1.babel5 

Babel5 是一个大全家桶，所有的东西都在babel 一个包里。（也就是，一次`install`，所有的功能都能用）

### 2.babel6

> Babel 项目是作为一个 monorepo 来进行管理的，它由无数 npm 包组成

为什么babel6 要完全重构[6.0.0 Released](https://babeljs.io/blog/2015/10/29/6.0.0)

具体变化

- 拆分成几个核心包，`babel-core`,`babel-node`,`babel-cli`...
- 没有了默认的转换，现在你需要手动的添加 plugin。也就是插件化
- 添加了 preset，也就是预置条件。
- 增加了 .babelrc 文件，方便自定义的配置。



### 3. 具体使用

一般 学习研究babel编译后的代码使用babel5。具体项目中使用babel6



## babel6 具体使用（包维度）

### 1. babel-core

[官方文档](https://www.babeljs.cn/docs/core-packages/)

```
js --> ast --> 最终代码
```



### 2. babel-cli

[官方文档](https://www.babeljs.cn/docs/usage/cli/)

提供命令行运行的babel



### 3. babel-node



### 4. babel-polyfill

Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如`Object.assign`）都不会转码。



### 5. Runtime transform

[官方](https://www.babeljs.cn/docs/plugins/transform-runtime/)

> Babel 使用了非常小的 helpers 来实现诸如 `_extend` 等常用功能。默认情况下，它将被添加到每个通过 require 引用它的文件中。这种重复（操作）有时是不必要的，特别是当你的应用程序被拆分为多个文件时。



开发依赖

```node
npm install --save-dev babel-plugin-transform-runtime
```

生产依赖

```node
npm install --save babel-runtime
```



### 6. core-js





## babel6 具体使用（功能）

> Babel 只编译新标准引入的语法
>
> 而新标准引入的API（eg：Proxy，Set）默认不会被编译，需要引入polyfill来解决





