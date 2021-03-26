# 模块加载

### es6

ES6 的`import`有点像 Unix 系统的“符号连接”，原始值变了，`import`加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

demo1:

```javascript
// lib.js
export let counter = 3;
export function incCounter() {
  counter++;
}

// main.js
import { counter, incCounter } from './lib';
console.log(counter); // 3
incCounter();
console.log(counter); // 4
```

demo2:

```javascript
// m1.js
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);

// m2.js
import {foo} from './m1.js';
console.log(foo);
setTimeout(() => console.log(foo), 500);

//结果
bar
baz
```



## 循环加载

### node循环加载



### ES6 模块的循环加载

[参考](https://es6.ruanyifeng.com/#docs/module-loader#ES6-%E6%A8%A1%E5%9D%97%E7%9A%84%E5%BE%AA%E7%8E%AF%E5%8A%A0%E8%BD%BD)

ES6 处理“循环加载”与 CommonJS 有本质的不同。ES6 模块是动态引用，如果使用`import`从一个模块加载变量（即`import foo from 'foo'`），那些变量不会被缓存，而是成为一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值。

```javascript
//a.mjs
import {bar} from './b.mjs';
console.log('a.mjs');
console.log(bar);
export let foo = 'foo';
```

```javascript
//b.mjs
import {foo} from './a.mjs';
console.log('b.mjs');
console.log(foo());
function bar() { return 'bar' }
export {bar};
```

```node

$ node --experimental-modules a.mjs
b.mjs
ReferenceError: foo is not defined
```

解析：

首先 在执行之前（编译），将a.mjs与b.mjs 载入内存

执行：  

	1. 先执行`a.mjs`，在第一行发现`import b`,发现b未执行，则a.mjs 暂停执行，去执行 `b.mjs`
 	2. 执行 `b.mjs`，在第一行发现`import a`,发现a已执行，则继续执行b，在第三行，发现foo未定义，报ReferenceError



### 猜测是，模块加载器存了个状态，表示，是否执行；重复引用只执行一次

```javascript
//mod.js
function C() {
    this.sum = 0;
    this.add = function () {
      this.sum += 1;
    };
    this.show = function () {
      console.log(this.sum);
    };
  }
  
  export let c = new C();
```

```javascript
//x.js
import {c} from './mod.js';
c.add();
```

```javascript
//y.js
import {c} from './mod.js';
c.show();
```

```javascript
//main.js
import './x.js';
import './y.js';
```

执行：npx babel-node  main.js 

结果为1

