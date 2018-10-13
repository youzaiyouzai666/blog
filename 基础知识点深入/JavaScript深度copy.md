# 深度copy

## 测试用例创建

#### 1. 各种数据类型

```javascript
const test = {
    num: 0,
    str: '',
    boolean: true,
    unf: undefined,
    nul: null,
    obj: {
        name: '我是一个对象',
        id: 1
    },
    arr: [0, 1, 2],
    func: function() {
        console.log('我是一个函数')
    },
    date: new Date(0),
    reg: new RegExp('/我是一个正则/ig'),
    err: new Error('我是一个错误')
}


/*
作者：云峰yf
链接：https://juejin.im/post/5ad6b72f6fb9a028d375ecf6
来源：掘金
*/
```



#### 2. 深度和广度数据创建

```javascript
function createData(deep, breadth) {
    var data = {};
    var temp = data;

    for (var i = 0; i < deep; i++) {
        temp = temp['data'] = {};
        for (var j = 0; j < breadth; j++) {
            temp[j] = j;
        }
    }

    return data;
}

createData(1, 3); // 1层深度，每层有3个数据 {data: {0: 0, 1: 1, 2: 2}}
createData(3, 0); // 3层深度，每层有0个数据 {data: {data: {data: {}}}}

/*
作者：颜海镜
链接：https://juejin.im/post/5bc1ae9be51d450e8b140b0c
来源：掘金
*/
```





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
//上面代码解析
//如何创建循环引用

```javascript
var a = {name: a}//a === undefined
console.log(a) 
//{name: undefined} 无法满足
```
```javascript
//可以形成 循环引用
var a = {};
a.a = a;
```

```javascript
var a = {name : b};//b === undefined
var b = {name : a}
console.log(a);
/*{name:
		{name: undefined}
        }*/
//无法满足
```

```javascript
var a = {name : b};//b === undefined
var b = {name : a}
var c = Object.assign(a, b);
/**解析
step1: a={name:b}  -->  a={name:a} -->  a={name:{name:{name:{...}}}}

*/
```



```javascript
var target = { a: { b: 'c', d: 'e' } }
var source = { a: { b: 'hello' } }
Object.assign(target, source)
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
      o: null,
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
      }}
 */
```



## 方案二—MessageChannel

##### [MessageChannel](https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel)

能解决 `undefined`, 循环嵌套，但不能解决`function `

```javascript
// 有undefined + 循环引用，单不能解决function问题
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



## 方案四—循环非递归

循环递归调用，当递归层级太大时，就会引起内存溢出问题（爆栈）。

```javascript
function cloneLoop(x) {
    const root = {};

    // 栈
    const loopList = [
        {
            parent: root,
            key: undefined,
            data: x,
        }
    ];

    while(loopList.length) {
        // 深度优先
        const node = loopList.pop();
        const parent = node.parent;
        const key = node.key;
        const data = node.data;

        // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
        let res = parent;
        if (typeof key !== 'undefined') {
            res = parent[key] = {};
        }

        for(let k in data) {
            if (data.hasOwnProperty(k)) {
                if (typeof data[k] === 'object') {
                    // 下一次循环
                    loopList.push({
                        parent: res,
                        key: k,
                        data: data[k],
                    });
                } else {
                    res[k] = data[k];
                }
            }
        }
    }

    return root;
}
/**
作者：颜海镜
链接：https://juejin.im/post/5bc1ae9be51d450e8b140b0c
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
*/
```



## 方案四—Immutable

[参考](https://juejin.im/post/5bbad07ce51d450e894e4228?utm_source=gold_browser_extension)  [Immutable.js了解一下？](https://juejin.im/post/5ac437436fb9a028c97a437c)

