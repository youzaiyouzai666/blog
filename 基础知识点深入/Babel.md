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

### 3.babel7

[babel7教程](https://blog.zfanw.com/babel-js/)

```node
//安装
npm install --save-dev @babel/core @babel/cli   
//这是 babel 7 的一大调整，原来的 babel-xx 包统一迁移到babel 域下 - 域由 @ 符号来标识，一来便于区别官方与非官方的包，二来避免可能的包命名冲突。
```





### 3. 具体使用

一般 学习研究babel编译后的代码使用babel5。具体项目中使用babel6



## babel 具体使用（包维度）

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

正在的核心编译代码包



## babel 具体使用（功能）

> Babel 只编译新标准引入的语法
>
> 而新标准引入的API（eg：Proxy，Set）默认不会被编译，需要引入polyfill来解决

### 1. 基本语法使用

> Babel 6 做了大量模块化的工作，将原来集成一体的各种编译功能分离出去，独立成插件
>
> 也就是说，babel只有配合plugin才能编译代码

安装：

```node
npm install --save-dev @babel/core @babel/cli
```

需要编译代码scirpt .js：

```javascript
let fun = () => console.log('hello babel.js')
```

执行：`npx babel script.js`

```javascript
$ npx babel script.js
let fun = () => console.log('hello babel.js');//输出没有任何变化
```



### 2. 使用插件

安装插件：

```node
yarn add -s @babel/plugin-transform-arrow-functions
```

编译指定插件：

```node
$ npx babel script.js --plugins @babel/plugin-transform-arrow-functions
//编译成功
let fun = function () {
  return console.log('hello babel.js');
};
```



### 3. 使用配置文件

`.babelrc`

```javascript
{
  "plugins": ["@babel/plugin-transform-arrow-functions"]
}
```

```node
$ npx babel script.js
let fun = function () {
  return console.log('hello babel.js');
};
```



### 4. 上面方案遇到问题

#### 例子

```javascript
const alertMe = (msg) => {
  window.alert(msg)
}
class Robot {
  constructor (msg) {
    this.message = msg
  }
  say () {
    alertMe(this.message)
  }
}
const marvin = new Robot('hello babel')
```

要编译上面代码需要的操作是：

#### 安装插件

```node
yarn add -s @babel/plugin-transform-arrow-functions @babel/plugin-transform-block-scoping @babel/plugin-transform-classes
```

#### 配置

```javascript
{
  "plugins": [
    "@babel/plugin-transform-arrow-functions",
    "@babel/plugin-transform-block-scoping",
    "@babel/plugin-transform-classes"
    ]
}
```

#### 运行 `npx babel script.js`

```javascript
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var alertMe = function (msg) {
  window.alert(msg);
};

var Robot =
/*#__PURE__*/
function () {
  function Robot(msg) {
    _classCallCheck(this, Robot);

    this.message = msg;
  }

  _createClass(Robot, [{
    key: "say",
    value: function say() {
      alertMe(this.message);
    }
  }]);

  return Robot;
}();

var marvin = new Robot('hello babel'); 
```

整个过程复杂而且混乱，当你再引入es6几个语法糖，会变得怎样？

解决这个问题，自动化的需要`  Preset `  `@babel/preset-env`



### 5. 使用`@babel/preset-env`

> 每一个小的语法糖都要1.下载`plugin` 2. 配置`plugin`,麻烦，有没有更加酸爽的招？
>
>  `@babel/preset-env`就可以解放



#### 使用安装

``` 
yarn add -s --save-dev @babel/preset-env
```

#### 改配置.babelrc

```
{
  "presets": ["@babel/preset-env"]
}
```

#### 运行

```
//和安装插件效果一样
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var alertMe = function alertMe(msg) {
  window.alert(msg);
};

var Robot =
/*#__PURE__*/
function () {
  function Robot(msg) {
    _classCallCheck(this, Robot);

    this.message = msg;
  }

  _createClass(Robot, [{
    key: "say",
    value: function say() {
      alertMe(this.message);
    }
  }]);

  return Robot;
}();

var marvin = new Robot('hello babel');
```

#### 只支持最新Chrome

 `.babelrc` 的配置

```json
{
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "browsers": ["last 1 Chrome versions"]
      }
    }]
  ]
}
```



### 6. Babel-polyfill

```javascript
[].findIndex('babel')//上面方案都无法解决
```

所以可以使用 `@babel/polyfill`

```node
$ npm install --save @babel/polyfill  //安装
```

```javascript
import '@babel/polyfill'  //全局污染
[].findIndex('babel')
```



### 7. runtime

1. 安装 

```node
yarn add -s @babel/plugin-transform-runtime
```

2. `.babelrc` 中配置：

```json
{
  "plugins": [
    "@babel/plugin-transform-object-assign",
    "@babel/plugin-transform-runtime"
  ]
}
```

3. 执行后

   ```javascript
   var _extends = require("@babel/runtime/helpers/extends");
   
   _extends({}, {});
   ```




### 8.babel-runtime 与 babel-polyfill 的区别究竟是什么

1. 引入 babel-polyfill 后的 IE 11，你可以在 console 下执行 `Object.assign({}, {})`
2. 而引入 babel-runtime 后的 IE 11，仍然提示你：`Object doesn't support property or method 'assign'`

