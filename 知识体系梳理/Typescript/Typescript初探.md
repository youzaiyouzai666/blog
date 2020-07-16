

# 用法

[参考](https://www.tslang.cn/docs/home.html)

[《深入理解 TypeScript》](https://jkchao.github.io/typescript-book-chinese/#why)





## 基本用法

### [关键字](https://juejin.im/post/5c2f87ce5188252593122c98)

#### 1.extends

#### 2.typeof

#### 3.keyof

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