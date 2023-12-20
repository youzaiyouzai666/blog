# 基本用法







# 拓展

## 1. 超时处理timeout

[让fetch也可以timeout](http://imweb.io/topic/57c6ea35808fd2fb204eef63)

[etch timeout + 缓存了解下？](https://juejin.im/post/5b2130ab518825137d78bb55)

fetch本身不支持 timeout

最简单版本：

```javascript
Promise.race([
  fetch('/api')
    .then(res => res.json())
    .then(res => console.log(555)),
    new Promise(function(resolve, reject) {
        setTimeout(() => {
            reject(new Error('request timeout'));
            console.log(111);
        }, 100);
    })
]);

作者：木鱼木心
链接：https://juejin.im/post/5b2130ab518825137d78bb55
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```



```javascript
//主要思路：
//1.创建一个promise，当超时触发reject
//2.Promise.race 触发先执行的
function _fetch(fetch_promise, timeout) {
      var abort_fn = null;

      //这是一个可以被reject的promise
      var abort_promise = new Promise(function(resolve, reject) {
             abort_fn = function() {
                reject('abort promise');
             };
      });

      //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
       var abortable_promise = Promise.race([
             fetch_promise,
             abort_promise
       ]);

       setTimeout(function() {
             abort_fn();
        }, timeout);

       return abortable_promise;
}

//usage:
_fetch(fetch('//a.com/b/c'), 2000)
    .then(function(res) {
        console.log(res)
    }, function(err) {
        console.log(err);
    });
```

