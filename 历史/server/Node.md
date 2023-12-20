

## nvm

```node
nvm alias default 10 //设置默认版本
nvm install stable //安装最稳定版本
export NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node/    //切换淘宝源

```



# path 配置

查看npm全局包可执行文件路径

> npm -g bin

查看PATH环境变量

> echo $PATH



## 基本使用

### 创建events

```node
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('触发事件');
});
myEmitter.emit('event');
```

### 创建过程中 this

```node
const myEmitter = new MyEmitter();
myEmitter.on('event', function(a, b) {
  console.log(a, b, this, this === myEmitter);
  // 打印:
  //   a b MyEmitter {
  //     domain: null,
  //     _events: { event: [Function] },
  //     _eventsCount: 1,
  //     _maxListeners: undefined } true
});
myEmitter.emit('event', 'a', 'b');
```



//使用箭头函数

```node
const myEmitter = new MyEmitter();
myEmitter.on('event', (a, b) => {
  console.log(a, b, this);
  // 打印: a b {}     
});
myEmitter.emit('event', 'a', 'b');
```



# 调试

## 方案一：

[node官方]([http://nodejs.cn/api/debugger.html#debugger_v8_inspector_integration_for_node_js](http://nodejs.cn/api/debugger.html#debugger_v8_inspector_integration_for_node_js))

```node
node  --inspect-brk xxxx.js  //
```



## 方案二：

https://www.bookstack.cn/read/node-in-debugging/4.3VisualStudioCode.md

### 1. launch.json

launch.json 有以下常用选项：

必需字段如下：

      type：调试器类型。这里是 node（内置的调试器），如果安装了 Go 和 PHP 的扩展后，则对应的 type 分别为 go 和 php。
      request：请求的类型，支持 launch 和 attach。launch 就是以 debug 模式启动调试，attach 就是附加到已经启动的进程开启 debug 模式并调试，跟在上一小节中提到的用 node -e "process._debugProcess(PID)" 作用一样。
      name：下拉菜单显示的名字。

可选字段（括号里表示适用的类型）如下：

      program：可执行文件或者调试器要运行的文件 (launch)。
      args：要传递给调试程序的参数 (launch)。
      env：环境变量 (launch)。
      cwd：当前执行目录 (launch)。
      address：IP 地址 (launch & attach)。
      port：端口号 (launch & attach)。
      skipFiles：想要忽略的文件，数组类型 (launch & attach)。
      processId：进程 PID (attach)。
    		…

变量替换：

      ${workspaceFolder}：当前打开工程的路径。
      ${file}：当前打开文件的路径。
      ${fileBasename}：当前打开文件的名字，包含后缀名。
      ${fileDirname}：当前打开文件所在的文件夹的路径。
      ${fileExtname}：当前打开文件的后缀名。
      ${cwd}：当前执行目录。
    		…


