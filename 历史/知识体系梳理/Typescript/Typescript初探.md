# 用法






[参考](https://www.tslang.cn/docs/home.html)

[《深入理解 TypeScript》](https://jkchao.github.io/typescript-book-chinese/#why)

[TypeScript - 一种思维方式](https://zhuanlan.zhihu.com/p/63346965)



[[子类型](https://en.wikipedia.org/wiki/Subtyping) 在编程理论上是一个复杂的话题，而他的复杂之处来自于一对经常会被混淆的现象，我们称之为*协变*与*逆变*](https://jkchao.github.io/typescript-book-chinese/tips/covarianceAndContravariance.html#%E4%B8%80%E4%B8%AA%E6%9C%89%E8%B6%A3%E7%9A%84%E9%97%AE%E9%A2%98)

## vscode中如何直接运行ts文件，只需两步：

 step1：typescript和ts-node的安装

```
npm install -g typescript
npm install -g ts-node
复制代码
```

step2: VScode插件安装 Code Runner

完成以上两步，vscode右上角会有三角运行标志，即可


作者：前端草履虫
链接：https://juejin.cn/post/6979879230318329869
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

## 注释
   // @ts-ignore
## 基本用法

### 数据类型

#### [interface vs type](https://github.com/SunshowerC/blog/issues/7#type-extends-type)

####  Any 类型

在 TypeScript 中，任何类型都可以被归为 any 类型。这让 any 类型成为了类型系统的顶级类型（也被称作全局超级类型）。

```
let notSure: any = 666;
notSure = "Semlinker";
notSure = false;
```

`any` 类型本质上是类型系统的一个逃逸舱。作为开发者，这给了我们很大的自由：TypeScript 允许我们对 `any` 类型的值执行任何操作，而无需事先执行任何形式的检查。比如：

```
let value: any;

value.foo.bar; // OK
value.trim(); // OK
value(); // OK
new value(); // OK
value[0][1]; // OK
```

在许多场景下，这太宽松了。使用 `any` 类型，可以很容易地编写类型正确但在运行时有问题的代码。如果我们使用 `any` 类型，就无法使用 TypeScript 提供的大量的保护机制。为了解决 `any` 带来的问题，TypeScript 3.0 引入了 `unknown` 类型。



#### Unknown 类型

就像所有类型都可以赋值给 `any`，所有类型也都可以赋值给 `unknown`。这使得 `unknown` 成为 TypeScript 类型系统的另一种顶级类型（另一种是 `any`）。下面我们来看一下 `unknown` 类型的使用示例：

```
let value: unknown;

value = true; // OK
value = 42; // OK
value = "Hello World"; // OK
value = []; // OK
value = {}; // OK
value = Math.random; // OK
value = null; // OK
value = undefined; // OK
value = new TypeError(); // OK
value = Symbol("type"); // OK
```

对 `value` 变量的所有赋值都被认为是类型正确的。但是，当我们尝试将类型为 `unknown` 的值赋值给其他类型的变量时会发生什么？

```
let value: unknown;

let value1: unknown = value; // OK
let value2: any = value; // OK
let value3: boolean = value; // Error
let value4: number = value; // Error
let value5: string = value; // Error
let value6: object = value; // Error
let value7: any[] = value; // Error
let value8: Function = value; // Error
```

`unknown` 类型只能被赋值给 `any` 类型和 `unknown` 类型本身。直观地说，这是有道理的：只有能够保存任意类型值的容器才能保存 `unknown` 类型的值。毕竟我们不知道变量 `value` 中存储了什么类型的值。

现在让我们看看当我们尝试对类型为 `unknown` 的值执行操作时会发生什么。以下是我们在之前 `any` 章节看过的相同操作：

```
let value: unknown;

value.foo.bar; // Error
value.trim(); // Error
value(); // Error
new value(); // Error
value[0][1]; // Error
```

将 `value` 变量类型设置为 `unknown` 后，这些操作都不再被认为是类型正确的。通过将 `any` 类型改变为 `unknown` 类型，我们已将允许所有更改的默认设置，更改为禁止任何更改。

### 类型断言

#### 1. 类型断言 vs 类型声明[§](https://ts.xcatliu.com/basics/type-assertion#类型断言-vs-类型声明)

#### 2. 类型断言 vs 类型声明[§](https://ts.xcatliu.com/basics/type-assertion#类型断言-vs-类型声明)

在这个例子中：

```ts
function getCacheData(key: string): any {
    return (window as any).cache[key];
}

interface Cat {
    name: string;
    run(): void;
}

const tom = getCacheData('tom') as Cat;
tom.run();
```

但实际上还有其他方式可以解决这个问题：

```ts
function getCacheData(key: string): any {
    return (window as any).cache[key];
}

interface Cat {
    name: string;
    run(): void;
}

const tom: Cat = getCacheData('tom');
tom.run();
```

#### 3. 类型断言 vs 泛型

还是这个例子：

```ts
function getCacheData(key: string): any {
    return (window as any).cache[key];
}

interface Cat {
    name: string;
    run(): void;
}

const tom = getCacheData('tom') as Cat;
tom.run();
```

我们还有第三种方式可以解决这个问题，那就是泛型：

```ts
function getCacheData<T>(key: string): T {
    return (window as any).cache[key];
}

interface Cat {
    name: string;
    run(): void;
}

const tom = getCacheData<Cat>('tom');
tom.run();
```

通过给 `getCacheData` 函数添加了一个泛型 `<T>`，我们可以更加规范的实现对 `getCacheData` 返回值的约束，这也同时去除掉了代码中的 `any`，是最优的一个解决方案。

### [类型守卫](https://juejin.im/post/5e538750f265da5762133042)

- 类型判断：`typeof`
- 实例判断：`instanceof`
- 属性判断：`in`
- 字面量相等判断：`==`, `===`, `!=`, `!==`

#### 1.自定义守卫——is



### [TypeScript 类型拓宽](https://mp.weixin.qq.com/s?__biz=MzI2MjcxNTQ0Nw==&mid=2247484206&idx=1&sn=74f422b2294812075faea2f31994d8b6&chksm=ea47a276dd302b60f9ed3709807f7880b8a5806a31de43910d9dbe3de07b1c3843d11e0d0225&scene=21#wechat_redirect)



### [关键字](https://juejin.im/post/5c2f87ce5188252593122c98)

#### 1.extends

#### 2.typeof

#### 3.keyof

##### typeof 和 keyof 操作符

在 TypeScript 中，`typeof` 操作符可以用来获取一个变量或对象的类型。而 `keyof` 操作符可以用于获取某种类型的所有键，其返回类型是联合类型。了解完 `typeof` 和 `keyof` 操作符的作用，我们来举个例子，介绍一下它们如何结合在一起使用：

```
const COLORS = {
  red: 'red',
  blue: 'blue'
}

// 首先通过typeof操作符获取Colors变量的类型，然后通过keyof操作符获取该类型的所有键，
// 即字符串字面量联合类型 'red' | 'blue'
type Colors = keyof typeof COLORS 
let color: Colors;
color = 'red' // Ok
color = 'blue' // Ok

// Type '"yellow"' is not assignable to type '"red" | "blue"'.
color = 'yellow' // Error
```

#### 4. in

`in` 可以遍历枚举类型：

```
type Keys = "a" | "b"
type Obj =  {
  [p in Keys]: any
} // -> { a: any, b: any }
复制代码
```

上面 `in` 遍历 `Keys`，并为每个值赋予 `any` 类型。

#### 5.infer





### [内置类型别名](https://juejin.im/post/5c2f87ce5188252593122c98#heading-6)

#### 1.Partial

`Partial` 的作用就是可以将某个类型里的属性全部变为可选项 `?`。

源码：

```
// node_modules/typescript/lib/lib.es5.d.ts

type Partial<T> = {
    [P in keyof T]?: T[P];
};
```

#### 2.Required







### 类型注解

```typescript
function greeter(person: string) {
    return "Hello, " + person;
}

let user = [0, 1, 2];

document.body.innerHTML = greeter(user);
```

### 接口

```typescript
interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Jane", lastName: "User" };

document.body.innerHTML = greeter(user);
```

### 对象——接口

```typescript
//任意属性
interface Person {
    name: string;
    age?: number;
    [propName: string]: string | number;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
}
```


4. 类型推断

   ```ts
   const foo = {};
   foo.bar = 123; // Error: 'bar' 属性不存在于 ‘{}’
   foo.bas = 'hello'; // Error: 'bas' 属性不存在于 '{}'
   ```

   解决

   ```ts
   //方案1
   interface Foo {
     bar: number;
     bas: string;
   }
   
   const foo = {} as Foo;
   foo.bar = 123;
   foo.bas = 'hello';
   
   //方案2
   interface Foo {
       bar?: number;
       bas?: string;
   }
   let foo:Foo = {} 
   foo.bar = 123;
   foo.bas = 'hello';
   ```

### unknown vs  any

https://juejin.im/post/5d04ac745188250a8b1fd203

`unknown` 类型只能被赋值给 `any` 类型和 `unknown` 类型本身





### 枚举

我们可以使用 `keyof` 类型运算符创建类型，其元素是枚举成员的 key。当我们这样做，我们需要结合 `keyof` 和 `typeof` 一起使用：

```
enum HttpRequestKeyEnum {
  'Accept',
  'Accept-Charset',
  'Accept-Datetime',
  'Accept-Encoding',
  'Accept-Language',
}

type HttpRequestKey = keyof typeof HttpRequestKeyEnum;
  // = 'Accept' | 'Accept-Charset' | 'Accept-Datetime' |
  //   'Accept-Encoding' | 'Accept-Language'

function getRequestHeaderValue(request: Request, key: HttpRequestKey) {
  // ···
}
```

作者：阿宝哥
链接：https://juejin.im/post/5e8567d5e51d454708477302
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

## 高阶用法

###  [interface vs type](https://github.com/SunshowerC/blog/issues/7#type-extends-type)



###  [Object, object, {}](http://semlinker.com/ts-object-type/) 

####  1. {} 类型

```typescript
// Type {}
const obj = {};

// Error: Property 'prop' does not exist on type '{}'.
obj.prop = "semlinker";
```

#### 2. Object

```javascript
var test : keyof Object //var test: "constructor" | "toString" | "toLocaleString" | "valueOf" | "hasOwnProperty" | "isPrototypeOf" | "propertyIsEnumerable"
```

```typescript
// node_modules/typescript/lib/lib.es5.d.ts

interface Object {
  constructor: Function;
  toString(): string;
  toLocaleString(): string;
  valueOf(): Object;
  hasOwnProperty(v: PropertyKey): boolean;
  isPrototypeOf(v: Object): boolean;
  propertyIsEnumerable(v: PropertyKey): boolean;
}
```

#### 3. object 类型

object 类型是：TypeScript 2.2 引入的新类型，它用于表示非原始类型。

```typescript
// node_modules/typescript/lib/lib.es5.d.ts
interface ObjectConstructor {
  create(o: object | null): any;
  setPrototypeOf(o: any, proto: object | null): any;
  // ...
}
```

```
const proto = {};

Object.create(proto);     // OK
Object.create(null);      // OK
Object.create(undefined); // Error
Object.create(1337);      // Error
Object.create(true);      // Error
Object.create("oops");    // Error
```



### [keyof 操作符](http://semlinker.com/ts-keyof/)

```typescript
//接口
interface Person {
  name: string;
  age: number;
  location: string;
}

type K1 = keyof Person; // "name" | "age" | "location"
type K2 = keyof Person[];  // number | "length" | "push" | "concat" | ...
type K3 = keyof { [x: string]: Person };  // string | number  对象任意类型
```



```typescript
//操作类
class Person {
  name: string = "Semlinker";
}

let sname: keyof Person;
sname = "name";
sname = "age"; //报错

//对比
  const obj = {
    name:'age'
  }
  let sname: keyof obj;//'obj' refers to a value, but is being used as a type here.ts(2749)
```



易错：

```typescript
function prop(obj: object, key: string) {
  return obj[key];
}
//等效
function get(o: {}, name: string) {
    return o[name]
  }
//Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'.No index signature with a parameter of type 'string' was found on type '{}'.ts(7053)


//暴力解法
function prop(obj: object, key: string) {
  return (obj as any)[key];
}


//优雅解法
function prop<T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
```

### [泛型](http://semlinker.com/master-ts-generic/)

#### 基础

<img src="/Users/eleme/Library/Application Support/typora-user-images/image-20200624155010622.png" alt="image-20200624155010622" style="zoom:50%;" />

```ts
//可以直接省略掉<T, U>
function identity <T, U>(value: T, message: U) : T {
  console.log(message);
  return value;
}

console.log(identity(68, "Semlinker"));//省略掉<T, U>
```

> 泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

不用泛型

```typescript
function createArray(length: number, value: any): Array<any> {
    let result = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
//问题，输入类型与输出类型一致，但上面代码，并不能保证
```

使用泛型

```typescript
//注意：语法细节 方法上面多了个<T>
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
```

#### 函数

一些像下面这样的正常工作：

```ts
function foo<T>(x: T): T {
  return x;
}
```

然而不能使用箭头泛型函数：

```ts
const foo = <T>(x: T) => T; // Error: T 标签没有关闭
```

**解决办法**：在泛型参数里使用 `extends` 来提示编译器，这是个泛型：

```ts
const foo = <T extends {}>(x: T) => x;
```



## [工具](me.ele.family.petrel.soa.descriptor.dto.nelebiz.BusinessEstablishConfigDto)

### Partial——Partial 作用是将传入的属性变为可选项.



### [tsconfig.json](https://www.tslang.cn/docs/handbook/tsconfig-json.html)

[API](https://www.tslang.cn/docs/handbook/compiler-options.html)

[ Typescript tsconfig.json全解析](https://lq782655835.github.io/blogs/project/ts-tsconfig.html)

如果一个目录下存在一个`tsconfig.json`文件，那么它意味着这个目录是TypeScript项目的根目录。 `tsconfig.json`文件中指定了用来编译这个项目的根文件和编译选项。 一个项目可以通过以下方式之一来编译：



[interface 和 type ](https://github.com/SunshowerC/blog/issues/7#type-extends-type)





# react

TODO： [TypeScript 2.8下的终极React组件模式](https://juejin.im/post/5b07caf16fb9a07aa83f2977)

## [RouteComponentProps](https://stackoverflow.com/questions/48138111/what-typescript-type-should-i-use-to-reference-the-match-object-in-my-props)

```typescript
import { RouteComponentProps } from 'react-router';

// example route
<Route path="/products/:name" component={ProductContainer} />

interface MatchParams {
    name: string;
}

interface Props extends RouteComponentProps<MatchParams> {
}

// from typings
export interface RouteComponentProps<P> {
  match: match<P>;
  location: H.Location;
  history: H.History;
  staticContext?: any;
}

export interface match<P> {
  params: P;
  isExact: boolean;
  path: string;
  url: string;
}
```