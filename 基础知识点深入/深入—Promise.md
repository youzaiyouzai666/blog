
# Promise

> 参考：[30分钟，让你彻底明白Promise原理](https://segmentfault.com/a/1190000009478377)  [阮一峰ES6入门](http://es6.ruanyifeng.com/#docs/promise)

### 1. 基本实现原理

   ```javascript
   //极简实现
   function Promise(fn) {
       var value = null,
           callbacks = [];  //callbacks为数组，因为可能同时有很多个回调
   
       this.then = function (onFulfilled) {
           callbacks.push(onFulfilled);
       };
   
       function resolve(value) {
           callbacks.forEach(function (callback) {
               callback(value);
           });
       }
   
       fn(resolve);
   }
   ```

### 2. finnaly 实现

   ```javascript
   
   Promise.prototype.finally = function (callback) {
     let P = this.constructor;
     return this.then(
       value  => P.resolve(callback()).then(() => value),
       reason => P.resolve(callback()).then(() => { throw reason })
     );
   };
   ```

   

### 3. Promse API

   Promise API 分为 :

	1. 静态方法 

   	2. `prototype`上方法

### 4. Prmise 链式调用

   首先来看看 `Promise.prototype.then()`返回一个`Promise`,但`Promise`内部有返回值，

   且 返回值，可以是个值，也可能就是一个新`Promise`

   具体规则如下：

   - 如果then中的回调函数返回一个值，那么then返回的Promise将会成为接受状态，并且将返回的值作为接受状态的回调函数的参数值。

   - 如果then中的回调函数抛出一个错误，那么then返回的Promise将会成为拒绝状态，并且将抛出的错误作为拒绝状态的回调函数的参数值。

   - 如果then中的回调函数返回一个已经是接受状态的Promise，那么then返回的Promise也会成为接受状态，并且将那个Promise的接受状态的回调函数的参数值作为该被返回的Promise的接受状态回调函数的参数值。

   - 如果then中的回调函数返回一个已经是拒绝状态的Promise，那么then返回的Promise也会成为拒绝状态，并且将那个Promise的拒绝状态的回调函数的参数值作为该被返回的Promise的拒绝状态回调函数的参数值。

   - 如果then中的回调函数返回一个未定状态（pending）的Promise，那么then返回Promise的状态也是未定的，并且它的终态与那个Promise的终态相同；同时，它变为终态时调用的回调函数参数与那个Promise变为终态时的回调函数的参数是相同的。

     参考：[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then#%E8%BF%94%E5%9B%9E%E5%80%BC)

   上面是官方规则，神马，具体白话就是 核心是 返回参数及返回promise的状态

   ```javascript
   //正常状态
   const promise1 = new Promise((resolve, reject) => {
       resolve('no')// 
   })
   promise1.then(result => {
       console.log(result) //
   	return '1111';//类似于 return Promise.resolve('1111'); 参数是data，promise 状态时 resolve
   }).then(data => {
       console.log(data) // 1111
   })
   ```
### 5. 异常处理

>   异常分类：
>
>   1. 同步异常
>   2. 异步异常 无法`try-catch` 得到
>   3. 多层Promise嵌套，获异常取具体的一个promise异常，而不是全部

   1. Promise 异常处理基本套路

      ```javascript
      //方案1 使用 Promise.prototype.catch()来catch
      const promise1 = new Promise((resolve, reject) => {
          reject('no')// 
      })
      promise1.then(result => {
          console.log(result) // 永远不会执行
      }).catch(error => {
          console.log(error) // no
      })
      ```

      ```javascript
      //方案2 使用 Promise.prototype.then()中第二个参数 来处理
      const promise1 = new Promise((resolve, reject) => {
          reject('no')// 
      })
      promise1.then(result => {
          console.log(result) // 永远不会执行
      }，error => {
          console.log(error) // no
      })
      ```

      ```javascript
      //方案1  方案2 对比
      var promise2 = new Promise((resolve, reject) => {
          resolve('yes')// 
      })
      promise2.then(result => {
          throw new Error('then');
          console.log(result) 
      },error => {
          console.log('1111',error) // no
      }).catch(error=>{
         console.log('2222',error)// 最终 err在此处被捕获，而不是 then 中
      })
      ```

      

   2. 异常不同分类

      Promise可能遇到的异常种类

      ```javascript
      //1.异常 reject()
      const promise1 = new Promise((resolve, reject) => {
          reject('no')// 
      })
      promise1.then(result => {
          console.log(result) // 永远不会执行
      }).catch(error => {
          console.log(error) // no
      })
      
      ```

      ```javascript
      //2.异常 显示throw
      const promise1 = new Promise((resolve, reject) => {
          throw Error('no')
      })
      promise1.then(result => {
          console.log(result) // 永远不会执行
      }).catch(error => {
          console.log(error) // 
      })
      ```

      ```javascript
      //3.执行异常
      const promise1 = new Promise((resolve, reject) => {
          aaaa;
      })
      promise1.then(result => {
          console.log(result) // 永远不会执行
      }).catch(error => {
          console.log(error) // 
      })
      ```

      

   3. 异常链式调用

      ```javascript
      // promise链式调用，catch住异常后，后面就不会处理异常了
      Promise.reject().then(()=>{
        console.log(2222);
      },(err)=>{
      	console.log(333,err)
      	return err})
      .catch((err)=>{
        console.log(1111,err);
      })
      //333 undefined  ，没有打印 1111
      ```

      ```javascript
      //
      Promise.reject().then(()=>{
        console.log(2222);
      },(err)=>{
      	console.log(333,err) //reject 
      	return err；
      }).then((data)=>{
          console.log(4444,data)；//resolve 执行
      },(err)=>{
        console.log(1111,err); //未执行
      })
      //4444 没有执行 1111
      ```

      

   4. 异常丢失

      很多情况下，promise无法捕获异常

      **场景1** macrotask 队列中抛出异常：

      ```javascript
      //场景1
      //永远不要在 macrotask 队列中抛出异常，因为 macrotask 队列脱离了运行上下文环境，异常无法被当前作用域捕获。
      function fetch(callback) {
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                   throw Error('用户不存在')
              })
          })
      }
      
      fetch().then(result => {
          console.log('请求处理', result) // 永远不会执行
      }).catch(error => {
          console.log('请求处理异常', error) // 永远不会执行
      })
      
      // 程序崩溃
      // Uncaught Error: 用户不存在
      
      /*
          参考
          作者：黄子毅
          链接：https://www.jianshu.com/p/78dfb38ac3d7
          來源：简书
          简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。
      */
      ```

      ```javascript
      //解决场景1 怎么解决，因为setTimeout 是macrotask任务，执行上下文完全不同
      /**
      	如何解决？
      	调用reject
      */
      function fetch() {
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  reject('收敛一些')
              })
          })
      }
      fetch().then((resolve, reject) => {
          console.log('resolve');
      }).catch(error => {
          console.log('捕获异常', error) // 捕获异常 收敛一些
      })
      ```

      **场景二** Promise 状态只能改变一次

      ```javascript
       //异常丢失
         const promise2 = new Promise((resolve, reject) => {
             reject('no')
             console.log('reject after')
           throw Error('no') //异常丢失
         })
         promise1.then(result => {
             console.log(result) // 永远不会执行
         }).catch(error => {
             console.log('err',error) // no
         }).catch(error => {
             console.log('err2',error) // 也无法捕获异常
         })
      ```

      

   

   



   

   