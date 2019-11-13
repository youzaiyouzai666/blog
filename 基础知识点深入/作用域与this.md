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





# 箭头函数与this

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



# babel

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

