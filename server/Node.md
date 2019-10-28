# Events

## 0. nvm

```node
nvm alias default 10 //设置默认版本
nvm install stable //安装最稳定版本

```



## 1.基本使用

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

