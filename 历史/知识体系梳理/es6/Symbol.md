[简单了解ES6/ES2015 Symbol() 方法-张金鑫](https://www.zhangxinxu.com/wordpress/2018/04/known-es6-symbol-function/)

# 作用

>  Symbol的作用非常的专一，换句话说其设计出来就只有一个目的——**作为对象属性的唯一标识符**，防止对象属性冲突发生。

```javascript
let info1 = {
    name: '婷婷',
    age: 24,
    job: '公司前台',
    [Symbol('description')]: '平时喜欢做做瑜伽，人家有男朋友，你别指望了'
}
let info2 = {
    [Symbol('description')]: '这小姑娘挺好的，挺热情的，嘿嘿嘿……'
}
```

合并：

```javascript
let target = {};
Object.assign(target, info1, info2);
```

# 语法

### Symbol()的语法

语法如下：

```css
Symbol([description])
```

其中`description`为可选参数，字符串，没什么特别的作用，就是debug调试的时候可以用来作为标记。

#### 如何获取Symbol()对应属性值？

拿上面`target`举例，如何获得对妹纸的`description`描述信息呢？

我们可以使用`Object.getOwnPropertySymbols(obj)`这个方法进行获取，可以返回`obj`对象中的Symbol信息，例如：

```css
Object.getOwnPropertySymbols(target);
```

# 使用

#### 1.Symbol与for…in迭代

Symbols在`for...in`迭代中不可枚举，如果想要达到效果，借助`Object.getOwnPropertySymbols(obj)`这个方法。

```javascript
var obj = {};

obj[Symbol("a")] = "a";
obj[Symbol.for("b")] = "b";
obj["c"] = "c";
obj.d = "d";

for (var i in obj) {
   console.log(i);   // 输出 "c" 和 "d"
}
```

#### 2.Symbol与JSON.stringify()

当使用`JSON.strIngify()`时以`symbol`值作为键的属性会被完全忽略，示意代码：

```javascript
JSON.stringify({[Symbol("foo")]: "foo"});    // '{}'              
```

#### 3. Symbol包装器对象作为属性的键

围绕原始数据类型创建一个显式包装器对象从ECMAScript 6开始不再被支持，所以`new Symbol()`会报错，然而，现有的原始包装器对象，如 `new Boolean`、`new String`以及`new Number`因为遗留原因仍可被创建。

此时，如果我们想创建一个`Symbol`包装器对象 (Symbol wrapper object)，你可以使用`Object()`函数：

```javascript
var sym = Symbol("foo");
typeof sym;     // "symbol"
var symObj = Object(sym);
typeof symObj;  // "object"
```

当一个`Symbol`包装器对象作为一个属性的键时，这个对象将被强制转换为它包装过的`symbol`值：

```javascript
var sym = Symbol("foo");
var obj = {[sym]: 1};
obj[sym];            // 1
obj[Object(sym)];    // 还是1
```