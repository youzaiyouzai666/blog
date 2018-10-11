# 深度copy

## 方案1—JSON.parse(JSON.stringify())

这个方案广为流传，但有瑕疵

#### 1. 循环引用

```javascript
var a = {name : b};
var b = {name : a}
var c = Object.assign(a, b);

JSON.parse(JSON.stringify(c));
//VM361:1 Uncaught TypeError: Converting circular structure to JSON 直接报错
```

#### 2. 会忽略 `undefined`，而`null`不会被忽略 

#### 3. 不能序列化`function`

```javascript
var obj = {
      a: 1,
      b: {
        c: 2,
        d: 3,
      },
      o:null,
      f: undefined,
	 fn: function(){}
    }
JSON.parse(JSON.stringify(obj));
/*直接忽略
	{
      a: 1,
      b: {
        c: 2,
        d: 3,
        o:null, //不会被忽略
      }}*/
```



## 方案二—MessageChannel

##### [MessageChannel](https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel)

能解决 `undefined`, 循环嵌套，但不能解决`function `

```javascript
// 有undefined + 循环引用
    let obj = {
      a: 1,
      b: {
        c: 2,
        d: 3,
      },
      f: undefined
    }
    obj.c = obj.b;
    obj.e = obj.a
    obj.b.c = obj.c
    obj.b.d = obj.b
    obj.b.e = obj.b.c

    function deepCopy(obj) {
      return new Promise((resolve) => {
        const {port1, port2} = new MessageChannel();
        port2.onmessage = ev => resolve(ev.data);
        port1.postMessage(obj);
      });
    }

    deepCopy(obj).then((copy) => {           // 请记住`MessageChannel`是异步的这个前提！
        let copyObj = copy;
        console.log(copyObj, obj)
        console.log(copyObj == obj)
    });
/*
作者：ceido
链接：https://www.jianshu.com/p/4f07ef18b5d7
來源：简书
*/

```

注意：`MessageChannel`是异步



##  方案三—递归循环

```javascript
//循环引用无法实现 递归调用陷入死循环了
var deepCopy = function(obj) {
    if (typeof obj !== 'object') return;
    var newObj = obj instanceof Array ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
        }
    }
    return newObj;
}
```

```javascript
//Test 
var a = {name : b};
var b = {name : a}
var c = Object.assign(a, b);

deepCopy(c)
//VM127:3 Uncaught RangeError: Maximum call stack size exceeded，
```





## 方案四—Immutable

[参考](https://juejin.im/post/5bbad07ce51d450e894e4228?utm_source=gold_browser_extension)  [Immutable.js了解一下？](https://juejin.im/post/5ac437436fb9a028c97a437c)

