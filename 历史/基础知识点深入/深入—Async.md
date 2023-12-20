# 深入浅出——Async

了解Async 这篇就够了

> 导论：
>
> ​	首先，必须了解Promise
>
> ​	主要研究基本语法
>
> ​	对比Promise与Async
>
> ​	异常处理
>
> 参考：
>
> ​	[异步函数 - 提高 Promise 的易用性](https://developers.google.com/web/fundamentals/primers/async-functions?hl=zh-cn#_11)

## 1. 基本语法

基本语法是  方法头 添加关键字`async`,在异步前 添加`await`

#### 1. API

核心 API  就async 与 await，具体 直接将[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)中解释拿来用

 1. `async function` 声明将定义一个返回 [`AsyncFunction`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction) 对象的异步函数。异步函数是指通过事件循环异步执行的函数，它会通过一个隐式的 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 返回其结果。但是如果你的代码使用了异步函数，它的语法和结构会更像是标准的同步函数。 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function#%E7%AE%80%E5%8D%95%E4%BE%8B%E5%AD%90)

    **白话：async 返回一个 `Promise`,也就是 最后return是不是 Promise 最终都会被包装成promise**

 2. `await`  操作符用于等待一个[`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 对象。它只能在异步函数 [`async function`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function) 中使用。[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await) 

    ```javascript
    //语法
    [return_value] = await expression;   //注意，返回并不是一个Promise对象，而是结果
    ```

    > 表达式:
    >     	一个 Promise 对象或者任何要等待的值。
    > 返回值:  
    >
    > ​	(注意，返回并不是一个Promise对象，而是结果)
    >     	返回 Promise 对象的处理结果。
    >     	如果等待的不是 Promise 对象，则返回该值本身。

    描述：

    ​	await 表达式会暂停当前 [`async function`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function) 的执行，等待 Promise 处理完成。若 Promise 正常处理(fulfilled)，其回调的resolve函数参数作为 await 表达式的值，继续执行 [`async function`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)。

    ​	若 Promise 处理异常(rejected)，await 表达式会把 Promise 的异常原因抛出。

    ​	另外，如果 await 操作符后的表达式的值不是一个 Promise，那么该值将被转换为一个已正常处理的 Promise。

    

#### 2. 实践—简单用法

这会使 async 函数暂停执行，等待表达式中的 Promise 解析完成后继续执行 async 函数并返回解决结果。

```javascript
//用法1
/*
	async 返回一个 Promise
	1. return 值(value)，则返回 Promise.resolve(value)
	2. 异常，则是 Promise.reject(err);
  */
async function testAsync() {
    return "hello async";
}

const result = testAsync();
console.log(result);//返回一个promise对象
```


```javascript
//用法2
//async 函数中可能会有 await 表达式，这会使 async 函数暂停执行，等待表达式中的 Promise 解析完成后继续执行 async 函数并返回解决结果。
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
  return value;   //类似 return Promise.resolve(value)
}
//async 返回一个promise
asyncPrint('hello world', 50).then(function(d){
   console.log('then',d);
});
/** 打印
hello world
then hello world
*/
```

```javascript
//await 必须的在 async方法内，否则会报错
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

 function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
  return value;   //类似 return Promise.resolve(value)
}
//async 返回一个promise
asyncPrint('hello world', 50).then(function(d){
   console.log('then',d);
});
//Uncaught SyntaxError: await is only valid in async function
```



## 2. Async对比Promise优势

#### 1. 解决then 多层回调

参考：[理解 JavaScript 的 async/await](https://segmentfault.com/a/1190000007535316)

假设：假设一个业务，分多个步骤完成，每个步骤都是异步的，而且依赖于上一个步骤的结果。我们仍然用 `setTimeout` 来模拟异步操作： 

```javascript
/** 
 * 传入参数 n，表示这个函数执行的时间（毫秒）
 * 执行的结果是 n + 200，这个值将用于下一步骤
 */
function takeLongTime(n) {
    return new Promise(resolve => {
        setTimeout(() => resolve(n + 200), n);
    });
}

function step1(n) {
    console.log(`step1 with ${n}`);
    return takeLongTime(n);
}

function step2(n) {
    console.log(`step2 with ${n}`);
    return takeLongTime(n);
}

function step3(n) {
    console.log(`step3 with ${n}`);
    return takeLongTime(n);
}
```

```javascript
//Promise方案
function doIt() {
    console.time("doIt");
    const time1 = 300;
    step1(time1)
        .then(time2 => step2(time2))
        .then(time3 => step3(time3))
        .then(result => {
            console.log(`result is ${result}`);
            console.timeEnd("doIt");
        });
}

doIt();
// step1 with 300
// step2 with 500
// step3 with 700
// result is 900
```

```javascript
//async 写法
//对比 promise写法，
async function doIt() {
    console.time("doIt");
    const time1 = 300;
    const time2 = await step1(time1);
    const time3 = await step2(time2);
    const result = await step3(time3);
    console.log(`result is ${result}`);
    console.timeEnd("doIt");
}
doIt();
```

#### 2.  带catch

```javascript
//promise 版本
function getProcessedData(url) {
  return downloadData(url) // returns a promise
            .catch(e => {
                return downloadFallbackData(url)  // 返回一个 promise 对象
                        .then(v => {
                            return processDataInWorker(v); // 返回一个 promise 对象
                        }); 
            })
            .then(v => {
                return processDataInWorker(v); // 返回一个 promise 对象
            });
}
```

```javascript
//Async 版本
async function getProcessedData(url) {
  let v;
  try {
    v = await downloadData(url); 
  } catch (e) {
    v = await downloadFallbackData(url);
  }
  return processDataInWorker(v);
}
//注意，在上述示例中，return 语句中没有 await 操作符，因为 async function 的返回值将隐式传递给 Promise.resolve。
```

## 3.Async并行

#### 0. 背景

> 对比 [promise 并行处理](https://github.com/youzaiyouzai666/blog/blob/master/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86%E7%82%B9%E6%B7%B1%E5%85%A5/%E6%B7%B1%E5%85%A5%E2%80%94Promise.md#3-%E5%B9%B6%E8%A1%8C%E9%97%AE%E9%A2%98foreach%E5%A4%84%E7%90%86)

前面解决都是 一个promise执行完后，再执行新的promise;而下面讨论是，两个Promise如何并行

#### 1. 基本并行处理

```javascript
// 方法 1
let [res1, res2] = await Promise.all([func1(), func2()])

// 方法 2
let func1Promise = func1()
let func2Promise = func2()
let res1 = await func1Promise
let res2 = await func2Promise
```

#### 2. 深入理解并行

上文基本的并行，并不是 正在的并行

参考：[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function#%E7%AE%80%E5%8D%95%E4%BE%8B%E5%AD%90) 下面代码参考自 MDN

```javascript
var resolveAfter2Seconds = function() {
  console.log("starting slow promise");
  return new Promise(resolve => {
    setTimeout(function() {
      resolve(20);
      console.log("slow promise is done");
    }, 2000);
  });
};

var resolveAfter1Second = function() {
  console.log("starting fast promise");
  return new Promise(resolve => {
    setTimeout(function() {
      resolve(10);
      console.log("fast promise is done");
    }, 1000);
  });
};

var sequentialStart = async function() {
  console.log('==SEQUENTIAL START==');

  // 如果 await 操作符后的表达式不是一个 Promise 对象, 则它会被转换成一个 resolved 状态的 Promise 对象
  const slow = await resolveAfter2Seconds();

  const fast = await resolveAfter1Second();
  console.log(slow);
  console.log(fast);
}

var concurrentStart = async function() {
  console.log('==CONCURRENT START with await==');
  const slow = resolveAfter2Seconds(); // 立即启动计时器
  const fast = resolveAfter1Second();

  console.log(await slow);
  console.log(await fast); // 等待 slow 完成, fast 也已经完成。
}

var stillSerial = function() {
  console.log('==CONCURRENT START with Promise.all==');
  Promise.all([resolveAfter2Seconds(), resolveAfter1Second()]).then(([slow, fast]) => {
    console.log(slow);
    console.log(fast);
  });
}

var parallel = function() {
  console.log('==PARALLEL with Promise.then==');
  resolveAfter2Seconds().then((message)=>console.log(message)); // in this case could be simply written as console.log(resolveAfter2Seconds());
  resolveAfter1Second().then((message)=>console.log(message));
}

sequentialStart(); // sequentialStart 总共花了 2+1 秒
// 等到 sequentialStart() 完成
setTimeout(concurrentStart, 4000); // concurrentStart 总共花了 2 秒
// 等到 setTimeout(concurrentStart, 4000) 完成
setTimeout(stillSerial, 7000); // stillSerial 总共花了 2 秒
// 等到 setTimeout(stillSerial, 7000) 完成
setTimeout(parallel, 10000); // 真正的并行运行
```

上面代码是4中，不同处理promise并行方式。但核心是不管怎样 `await `执行都会有顺序，会等待执行。

## 4. 并行——循环

#### 1. for-of

```javascript
//不推荐，因为是串行解决
function fetch(d){
	return new Promise((resolve)=>{
        	console.log('start:',d);
			setTimeout(()=>{resolve(d)},Math.random()*1000);
		})
}
var args = [1,2,3,4,5];
async function test(args){
	for(const arg of args){
		const res = await fetch(arg);
		console.log('end:',res);
    }
}
test(args);
/**
   	start: 1
    23:00:11.331 bundle.9303569f0937a02f1c80.js:4 end: 1
    23:00:11.332 bundle.9303569f0937a02f1c80.js:4 start: 2
    23:00:12.009 bundle.9303569f0937a02f1c80.js:4 end: 2
    23:00:12.009 bundle.9303569f0937a02f1c80.js:4 start: 3
    23:00:12.248 bundle.9303569f0937a02f1c80.js:4 end: 3
    23:00:12.248 bundle.9303569f0937a02f1c80.js:4 start: 4
    23:00:12.984 bundle.9303569f0937a02f1c80.js:4 end: 4
    23:00:12.984 bundle.9303569f0937a02f1c80.js:4 start: 5
    23:00:13.184 bundle.9303569f0937a02f1c80.js:4 end: 5	
*/
```

#### 2. 使用map并行执行

```javascript
function fetch(d){
	return new Promise((resolve)=>{
			console.log('start:',d);
			setTimeout(()=>{resolve(d)},Math.random()*1000);
		})
}
var args = [1,2,3,4,5];
async function test3(args){
	const promises = args.map(async arg=>{//map 执行 可以并行执行
		const re = await fetch(arg);
		return re;
	})
	for(const p of promises){
		p.then((d)=>{
			console.log('end',d);
		})
	}
}

test3(args);
/**
    start: 1
    22:56:44.421 VM6500:3 start: 2
    22:56:44.421 VM6500:3 start: 3
    22:56:44.422 VM6500:3 start: 4
    22:56:44.422 VM6500:3 start: 5
    22:56:44.436 Promise {<resolved>: undefined}
    22:56:44.462 VM6500:15 end 2
    22:56:44.552 VM6500:15 end 1
    22:56:44.569 VM6500:15 end 5
    22:56:44.974 VM6500:15 end 3
    22:56:44.993 VM6500:15 end 4
*/
```

`Array.prototype.map`  与`Array.prototype.forEach` 执行promise数组，是并行。

但`for-in`  ` for-of `  `for`都是串行的



## 5. 异常处理

#### 0.异常分类

参考：[Promise异常分类](https://github.com/youzaiyouzai666/blog/blob/master/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86%E7%82%B9%E6%B7%B1%E5%85%A5/%E6%B7%B1%E5%85%A5%E2%80%94Promise.md#2-%E5%BC%82%E5%B8%B8%E4%B8%8D%E5%90%8C%E5%88%86%E7%B1%BB)

异常简单分为分为 执行异常和异步异常（通过是否能try-catch捕获来区分）；

#### 1. 基本套路

```javascript
//套路1
async function f() {
  await new Promise(function (resolve, reject) {
    throw new Error('出错了');
  });
  await Promise.resolve('1')
}

f()
.then(v => console.log(v))
.catch(e => console.log(e))

```

```javascript
//套路2
async function f() {
  try {
    await new Promise(function (resolve, reject) {
      throw new Error('出错了');
    });
  } catch(e) {
    console.log(e)
  }
}
f()
//为什么 Promise 无法使用try-catch捕获异常,但 async中，可以捕获？
//猜测可能是，await返回是一个值，执行上下文应该是同一个
```



#### 2. 链式处理

```javas
//在基本套路1 基础上处理 与promise 链式异常处理对比
async function f() {
  await new Promise(function (resolve, reject) {
    console.log('1')
    throw new Error('出错了');
  });
  await new Promise(function(resolve, reject){
	console.log('2');//没有打印
    resolve(2);
  })
}

f()
.then(v => console.log(v))
.catch(e => console.log(e))
/**
    1
    Error: 出错了
        at <anonymous>:4:11
        at new Promise (<anonymous>)
        at f (<anonymous>:2:9)
        at <anonymous>:12:1
*/
```

**重点：** 第二个 await没有执行，（‘2’没有打印）；也就证明，`async`遇到异常 就会中断链，与[Promise链式异常](https://github.com/youzaiyouzai666/blog/blob/master/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86%E7%82%B9%E6%B7%B1%E5%85%A5/%E6%B7%B1%E5%85%A5%E2%80%94Promise.md#3-%E5%BC%82%E5%B8%B8%E9%93%BE%E5%BC%8F%E8%B0%83%E7%94%A8)对比

```javascript
//在基本套路2 基础上处理 对比
async function f() {
  try {
    await new Promise(function (resolve, reject) {
          console.log('222');
          throw new Error('出错了');
    });
    await new Promise(function (resolve, reject) {
          console.log('222');//不会打印
		 resolve(222);
    })
  } catch(e) {
          console.log(e)
  }
}
f()
//与上例 是一样 不会执行第二个 await;
```



#### 3. 使用第三方模块bounce

参见：[github](https://github.com/hapijs/bounce)



## 6. 实现Async——todo

async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。 

```javascript
async function fn(args) {
  // ...
}

// 等同于

function fn(args) {
  return spawn(function* () {
    // ...
  });
}
```

```javascript
//generator 没有搞明白，直接是copy代码
function spawn(genF) {
  return new Promise(function(resolve, reject) {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch(e) {
        return reject(e);
      }
      if(next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v); });
      }, function(e) {
        step(function() { return gen.throw(e); });
      });
    }
    step(function() { return gen.next(undefined); });
  });
}
```



## 7. 容易出错

#### 1. await 不是在async function内

```javas
//await 与 async 中间隔了一个function
async function dbFuc(db) {
  let docs = [{}, {}, {}];

  // 报错
  docs.forEach(function (doc) { 
  // 改成 docs.forEach( await function (doc) 就没毛病
    await db.post(doc);
  });
}
```

