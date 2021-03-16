# 作用域

## 1. 静态作用域与动态作用域(JavaScript 静态作用域)

```javascript

var value = 1;

function foo() {
    console.log(value);
}

function bar() {
    var value = 2;
    foo();
}

bar(); //1

```

## 2. 作用域与执行上下文

```javascript
let name = "John";

function sayHi() {
  alert("Hi, " + name);
}

name = "Pete";

sayHi();//Pete
```







# 作用域与this对比

```javascript
var f = function () {
  console.log(name)
};
var obj = { 
  f: f,
	name:'obj' 
};
var name = 'window'

obj.f()//window
```

有this

```javascript
var f = function () {
  console.log(this.name)
};
var obj = { 
  f: f,
	name:'obj' 
};
var name = 'window'

obj.f() //obj
```





# this

## 0. 执行上下文链

```javascript
var value = 1;

var foo = {
  value: 2,
  bar: function () {
    return this.value;
  }
}

//示例1
console.log(foo.bar()); // 2
//示例2
console.log((foo.bar)()); // 2
//示例3
console.log((foo.bar = foo.bar)()); // 1
//示例4
console.log((false || foo.bar)()); // 1
//示例5
console.log((foo.bar, foo.bar)()); // 1
```



## 1. this的绑定规则

- 默认绑定
- 隐式绑定
- 显式绑定
- new 绑定



## 2. 默认绑定

```javascript
var name = 'window'
var obj = {
    name:'obj',
    a: function() {
        console.log(this)
        window.setTimeout(() => { 
            console.log(this.name) 
        }, 0)
    }
}
obj.a() //obj
var fn = obj.a
fn() //window
```





# 箭头函数与this，闭包

> “箭头函数”的`this`，总是指向定义时所在的对象，而不是运行时所在的对象。
>
> “箭头函数”的`this`，总是指向定义时所在函数的执行上下文的this，而不是运行时所在函数的执行上下文的this

```javascript
var name = 'window'
var obj = {
    name:'obj',
    a: function() {
        console.log(this)
        window.setTimeout(() => {
            console.log(this.name) 
        }, 0)
    }
}
obj.a() //
```



```javascript
var name = 'window'
var obj = {
    name:'obj',
    b: {
      name:'b',
    	c: () => {console.log(this.name)}
	}
}
obj.b.c() // window
```

//应该是执行栈

```javascript
function foo(){
  setTimeout(() => {
    console.log("id:", this.id)
  }, 100);
}

foo.call({id:42});
```



```javascript
//对照1
function foo() {
  return () => {
    console.log('id:', this.id);
  };
}

var f = foo.call({id: 1});
f.call({id:2})
```

```javascript
//对照2
function foo() {
  return () => {
    return () => {
      return () => {
        console.log('id:', this.id);
      };
    };
  };
}

var f = foo.call({id: 1});

var t1 = f.call({id: 2})()(); // id: 1
var t2 = f().call({id: 3})(); // id: 1
var t3 = f()().call({id: 4}); // id: 1
```

```javascript
//对照3
function foo() {
  return () => {
    return function() {
      return () => {
        console.log('id:', this.id);
      };
    };
  };
}

var f = foo.call({id: 1});

var t1 = f.call({id: 2})()(); 
var t2 = f().call({id: 3})();
var t3 = f()().call({id: 4});
```





除了`this`，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：`arguments`、`super`、`new.target`。

```javascript
function foo() {
  setTimeout(() => {
    console.log('args:', arguments);
  }, 100);
}

foo(2, 4, 6, 8)
// args: [2, 4, 6, 8]
```



```javascript
//因为箭头函数中没有this，是上一层执行上线问中的this，本例中最外层是window 
// 1
var obj = {
	fn:()=>{
		return ()=>{
			console.log(this);
        }
    }
}
obj.fn()();//window

//2
var obj = {
	fn:function(){
		return ()=>{
			console.log(this);
        }
    }
}
obj.fn()()//obj

//3
var obj = {
	fn:function(){
		return function(){
			console.log(this);
        }
    }
}
obj.fn()() //window
```



# 严格模式

### 1. 全局作用域中的`this`

> 在严格模式下，在全局作用域中，`this`指向`window`对象

```javascript
    "use strict";
    
    console.log("严格模式");
    console.log("在全局作用域中的this");
    console.log("this.document === document",this.document === document);//true
    console.log("this === window",this === window);//true
    this.a = 9804;
    console.log('this.a === window.a===',window.a);//9804
```

### 2. 全局作用域中函数中的`this`

> 在严格模式下，这种函数中的`this`等于`undefined`

```javascript
    "use strict";
    
    console.log("严格模式");
    console.log('在全局作用域中函数中的this');
    function f1(){
      console.log(this);
    }
    
    function f2(){
      function f3(){
        console.log(this);
      }
      f3();
    }
    f1();//undefined
    f2();//undefined
```

### 3. babel

> this如果是 window 则被转成 void 0

```javascript
function test2(){
	console.log(this)
}
const obj = {
 fn :test2
}
obj.fn.call(this)
```

转

```javascript
"use strict";

function test2() {
  console.log(this);
}

var obj = {
  fn: test2
};
obj.fn.call(void 0);
```



# 解释

#### **This 绑定：**

在全局执行上下文中，`this` 的值指向全局对象。(在浏览器中，`this`引用 Window 对象)。

在函数执行上下文中，`this` 的值取决于该函数是如何被调用的。如果它被一个引用对象调用，那么 `this` 会被设置成那个对象，否则 `this` 的值被设置为全局对象或者 `undefined`（在严格模式下）。例如：

```JavaScript
let foo = {
  baz: function() {
  console.log(this);
  }
}

foo.baz();   // 'this' 引用 'foo', 因为 'baz' 被
             // 对象 'foo' 调用

let bar = foo.baz;

bar();       // 'this' 指向全局 window 对象，因为
             // 没有指定引用对象
```


作者：子非
链接：https://juejin.cn/post/6844903682283143181
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

# 变量提升

### 进入执行上下文

当进入执行上下文时，这时候还没有执行代码，

变量对象会包括：

1. 函数的所有形参 (如果是函数上下文)
   - 由名称和对应值组成的一个变量对象的属性被创建
   - 没有实参，属性值设为 undefined
2. 函数声明
   - 由名称和对应值（函数对象(function-object)）组成一个变量对象的属性被创建
   - 如果变量对象已经存在相同名称的属性，则完全替换这个属性
3. 变量声明
   - 由名称和对应值（undefined）组成一个变量对象的属性被创建；
   - 如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性（猜测，内部实现，应该是顺序问题）

### 实参赋值与var 变量提升的顺序

```javascript
/**
* 实参赋值与var 变量提升的顺序
*/
function foo(arg){
   console.log(arg) //不是undefined,而是‘wai’，猜测，可能 先对 var arg 变量提升，然后再给形参赋值
  var arg ='nei' //如果是let const 报Uncaught SyntaxError
  console.log(arg)
}
foo('wai')
```

# 闭包

## 经典问题

```jsx
for (var i = 1; i <= 5; i++) {
    let j = i;
    setTimeout(function timer() {
        console.log(j);
    },j*1000);
}
```

解决

```jsx
for (var i = 1; i <= 5; i++) {
    (function() {
        var j = i;
        setTimeout( function timer() {
            console.log(j);
        },i*1000 ); //这一行将i*1000改为j*1000也行，并不影响
    })();
}
```

## 多层问题

```JavaScript
function createIncrement(i) {
  let value = 0;
  function increment() {
    value += i;
    console.log(value);
    const message = `Current value is ${value}`;//1
    return function logValue() {
    	//const message = `Current value is ${value}`;
      console.log(message);
    };
  }
  return increment;
}

const inc = createIncrement(1);
const log = inc(); // 打印 1
inc();             // 打印 2
inc();             // 打印 3
// 无法正确工作
log();             // 打印 "Current value is 1"
```

//解释： https://segmentfault.com/q/1010000021222813

解决1：

```javascript
function createIncrement(i) {
  let value = 0;
  function increment() {
    value += i;
    console.log(value);
    const message = `Current value is ${value}`;
    return function logValue() {
      console.log(message);
    };
  }
  
  return increment;
}

const inc = createIncrement(1);
inc(); // 打印 1
inc();             // 打印 2
const log =inc();             // 打印 3
// 正确工作
log();             // "Current value is 3"
```



解决2：

```javascript
function createIncrementFixed(i) {
  let value = 0;
  function increment() {
    value += i;
    console.log(value);
    return function logValue() {
      const message = `Current value is ${value}`;
      console.log(message);
    };
  }
  
  return increment;
}

const inc = createIncrementFixed(1);
const log = inc(); // 打印 1
inc();             // 打印 2
inc();             // 打印 3
// 正常工作
log();             // "Current value is 3"
```

解决3：

```javascript
function createIncrementFixed(i) {
  let message;
  let value = 0;
  function increment() {
    value += i;
    console.log(value);
    message = `Current value is ${value}`;
    return function logValue() {
      console.log(message);
    };
  }
  return increment;
}

const inc = createIncrementFixed(1);
const log = inc(); // 1
inc();             // 2
inc();             // 3
log();             // "Current value is 3"
```

