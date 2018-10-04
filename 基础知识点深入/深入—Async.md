# 深入浅出——Async

> 导论：
>
> ​	首先，必须了解Promise
>
> ​	主要研究基本语法
>
> ​	对比Promise与Async
>
> ​	异常处理

## 1. 基本语法

基本语法是  方法头 添加关键字`async`,在异步前 添加`await`

#### 1.API

核心 API  就async 与 await，具体 直接将MDN中解释拿来用

 1. `async function` 声明将定义一个返回 [`AsyncFunction`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction) 对象的异步函数。异步函数是指通过事件循环异步执行的函数，它会通过一个隐式的 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 返回其结果。但是如果你的代码使用了异步函数，它的语法和结构会更像是标准的同步函数。 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function#%E7%AE%80%E5%8D%95%E4%BE%8B%E5%AD%90)

    **白话：async 返回一个 `Promise`,也就是 最后return是不是 Promise 最终都会被包装成promise**

 2. `await`  操作符用于等待一个[`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 对象。它只能在异步函数 [`async function`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function) 中使用。[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await) 

    ```javascript
    //语法
    [return_value] = await expression;
    /*
        表达式
        一个 Promise 对象或者任何要等待的值。
        返回值
        返回 Promise 对象的处理结果。如果等待的不是 Promise 对象，则返回该值本身。
    */	
    ```

    描述：

    ​	await 表达式会暂停当前 [`async function`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function) 的执行，等待 Promise 处理完成。若 Promise 正常处理(fulfilled)，其回调的resolve函数参数作为 await 表达式的值，继续执行 [`async function`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)。

    ​	若 Promise 处理异常(rejected)，await 表达式会把 Promise 的异常原因抛出。

    ​	另外，如果 await 操作符后的表达式的值不是一个 Promise，那么该值将被转换为一个已正常处理的 Promise。

#### 2. 实践

这会使 async 函数暂停执行，等待表达式中的 Promise 解析完成后继续执行 async 函数并返回解决结果。

```javascript
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
//await 必须的在 async方法内
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

#### 1.解决then 多层回调

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

#### 2.带catch

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

## 3.并行

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

#### 2.深入理解并行

参考：[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function#%E7%AE%80%E5%8D%95%E4%BE%8B%E5%AD%90)

