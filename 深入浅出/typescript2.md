# typescript 升级打怪

# 一、引言

为什么，会讲 ts？

:::
[官方文档较简单](https://www.typescriptlang.org/)；市面上，ts 的内容讲解很多，但感觉整个知识体系较乱，无处下手（学习成本和记忆理解成本较高）：

质量良莠不齐，很混乱，一般都是以知识点来讲，没有形成体系；

ts 有各种各样的类型体操，看的眼花缭乱，不知道从哪里下手；

各种各样的内置工具，并且 ts 语法在持续更新，不知道这些工具解决什么问题，在什么场景使用。
:::

上面问题我的解法

:::
主要内容（看目录）：

ts 组成部分——整个 ts 生态

ts 核心的类型系统组成——静态描述

流动的类型——类型推断

类型运算  ——类型编程，也就是对类型参数做一系列运算产生新的类型

内置工具——分类及梳理
:::
:::
目的：

较全面按照一定逻辑讲解一下整个 ts 的组成部分  -  建立一个较为全面的 ts 全体系（可以做的参考集）

尝试 ts 中一些较复杂的概念，较简单清晰介绍一下，并明确这些概念产生的原因及解决问题

引导大家 ts  能力升级打怪，ts 类型体操的价值及使用场景，及如何逐步提升（现在   给较好的开源库贡献，可能拦截你的不是代码，而是给代码写完善的 ts；可能日常业务代码中使用高阶语法的机会较少，但现在一个好的公共组件，完备的 ts 很重要）
:::
:::
本次分享使用手册

核心期望将  ts 的类型系统组成原理   讲解明白（重点），很多基础部分不会讲（基本类型，泛型等）

如果想深入研究 ts，提供一个学习思路（重点）

一些 api  使用细节和容易坑的地方（这部分   主要是了解，大家使用过程中遇到问题有印象，提升一下解决效率）

开拓一下    视野，重点是类型运算，可能很多技术日常开发用的较少（公共组件，建议尝试使用一下）

本文有很多代码，因时间问题，会跳重点讲解；如遇到问题或想深入了解可以直接打断（也可以评论，看到必回）。

会留一些问题，大家下来可以思考交流一下（会后交流，会全力给你解决）

很期望和大家一起碰撞交流学习
:::

### 开始之前   大家先简单自测一下自己的 ts 水平

[以大佬整理的 ts 类型体操姿势合集来分为简单、中等、困难、地狱四个级别](type-challenges/README.zh-CN.md at main · type-challenges/type-challenges · GitHub)是 antfu （Vue  团队成员，以及  Vite、Vitest、Nuxt  等知名开源项目的团队成员或作者）的作品，其中搜集了许多类型编程的题目，并且贴心地按照难易程度分为了  easy、medium、hard  三个等级。

简单：  自己 Pick，对象属性只读，获取第一个元素

中等：实现 Omit，对象属性只读（递归），对象部分属性只读

困难：简单的 vue 类型，获得必须的属性，可选类型的键

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/r4mlQg962Bedqxow/img/bb3307b2-e766-41ee-9e4d-fdc82e2f8b82.png)

# 二、组成部分——静态描述

### 核心组成

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/r4mlQg962Bedqxow/img/ec91a67c-a2c5-48ad-bafd-3dd4b4a339fd.png)

#### 1.  语言规范（Language Specification）-  类型系统

TypeScript  的语言规范定义了语言的语法和语义。这是  TypeScript  设计和实现的基础，详细说明了类型系统、接口、类、函数、变量、装饰器等概念。

#### 2.  编译器（Compiler）

TypeScript  编译器（tsc）是将  TypeScript  代码转换为  JavaScript  代码的核心工具。它读取  TypeScript  源文件，进行类型检查和编译，并输出为等效的、可以在浏览器或  Node.js  环境中运行的  JavaScript  代码。

:::
思考：  我们现在项目   编译 ts 用的使用工具？为什么用？
:::

#### 3.  语言服务（Language Service）

TypeScript  语言服务提供了代码编辑期间的智能感知、错误检查、代码重构和查找引用等功能。它被集成在多个  IDE  和代码编辑器中（例如  Visual Studio、Visual Studio Code  和  WebStorm），提升了开发者的生产力。

### 类型系统组成

:::
今天   主要是以类型系统为主，主要是使用层面。
:::

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/a/RlZGL33r5T3gq7zJ/5e029e77e0964b7c9bfe8313fd69a5472894.png)

#### 类型基础-描述事实

:::
常见基本类型，大家都了解，这里就不赘述了。可以参考

[TypeScript  泛型  |  阮一峰  TypeScript  教程  (p6p.net)](https://typescript.p6p.net/typescript-tutorial/generics.html)

[TypeScript: Documentation -  基础  (typescriptlang.org)](https://www.typescriptlang.org/zh/docs/handbook/2/basic-types.html)

拿出一个有意思的类型枚举，来讲讲，虽然简单，大家都会使用，但听听可能会有意外收获……
:::

##### 枚举

枚举并不是  JavaScript  中原生的概念，在其他语言中它都是老朋友了（Java、C#、Swift  等）。目前也已经存在给  JavaScript（ECMAScript）引入枚举支持的  [proposal-enum](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Frbuckton%2Fproposal-enum)  提案，但还未被提交给  TC39 ，仍处于  Stage 0  阶段。

枚举很特殊，是值又是类型

##### 枚举分类分为：

###### 1.数字枚举

:::
两种获取方式
:::

```typescript
enum Items {
  Foo,
  Bar,
  Baz,
}

const fooValue = Items.Foo; // 0
const fooKey = Items[0]; // "Foo"
```

编译产物：

:::
看看产物，会导致编译后体积变大；特别是第三方库不建议使用。

思考：市面上   有解决方案吗？
:::

```typescript
'use strict';
var Items;
(function (Items) {
  Items[(Items['Foo'] = 0)] = 'Foo';
  Items[(Items['Bar'] = 1)] = 'Bar';
  Items[(Items['Baz'] = 2)] = 'Baz';
})(Items || (Items = {}));
```

###### 2.字符串枚举

```typescript
enum Items {
  Foo,
  Bar = 'BarValue',
  Baz = 'BazValue',
}

// 编译结果，只会进行 键-值 的单向映射
('use strict');
var Items;
(function (Items) {
  Items[(Items['Foo'] = 0)] = 'Foo';
  Items['Bar'] = 'BarValue';
  Items['Baz'] = 'BazValue';
})(Items || (Items = {}));
```

###### 3.常量枚举

```typescript
const enum Items {
  Foo,
  Bar,
  Baz,
}

const fooValue = Items.Foo; // 0
/*************** 编译后  ***************/
const fooValue = 0; /* Foo */ // 0
```

实际上，常量枚举的表现、编译产物还受到配置项  --isolatedModules  以及  --preserveConstEnums  等的影响

##### 同名合并

:::
很有用，可以拓展第三方库的枚举。
:::

```typescript
enum Foo {
  A,
}

enum Foo {
  B = 1, //只允许其中一个的首成员省略初始值，否则报错。注意是 第一个
}

enum Foo {
  C = 2,
}

// 等同于
enum Foo {
  A,
  B = 1，
  C = 2,
  D,
}
```

##### 可能不需要枚举  as const

不用枚举，实现相同功能

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/r4mlQg962Bedqxow/img/02b88cb7-9d2b-45cb-b144-e1a74deb8ccd.png)

```typescript
// 官方例子
const enum EDirection {
  Up,
  Down,
  Left,
  Right,
}
const ODirection = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const; //  注意

// Using the enum as a parameter 枚举简单一点
function walk(dir: EDirection) {}

// 稍微麻烦一点
type Direction = (typeof ODirection)[keyof typeof ODirection];
function run(dir: Direction) {}

walk(EDirection.Left);
run(ODirection.Right);
```

:::
思考一下：
:::

```typescript
enum MyEnum {
  A = 'a',
  B = 'b',
}

// 返回什么？
type Foo = keyof typeof MyEnum;
// 去掉 typeof 呢？ 为什么呢？
type Foo2 = keyof MyEnum;
```

#### 类型系统

##### 1.结构化类型系统

在  TypeScript  中，你可能遇见过以下这样“看起来不太对，但竟然能正常运行”的代码：

```typescript
class Cat {
  eat() {}
}

class Dog {
  eat() {}
}

function feedCat(cat: Cat) {}

feedCat(new Dog());
```

:::
这里的    函数明明需要的是一只猫，可为什么上传一只狗也可以呢？实际上，这就是  TypeScript  的类型系统特性：**结构化类型系统**，也是我们要学习的概念。
:::

```typescript
class Cat {
  aaa() {} // 新加
  eat() {}
}

class Dog {
  eat() {}
}

function feedCat(cat: Cat) {}

// 报错！
feedCat(new Dog());
```

:::
TypeScript  比较两个类型并非通过类型的名称（即    函数只能通过  Cat  类型调用），而是比较这两个类型上实际拥有的属性与方法。也就是说，这里实际上是比较  Cat  类型上的属性是否都存在于  Dog  类型上

标称类型系统（**Nominal Typing System**）要求，两个可兼容的类型，**其名称必须是完全一致的**
:::

###### 这样可能会导致的问题

```typescript
type USD = number;
type CNY = number;

const CNYCount: CNY = 200;
const USDCount: USD = 200;

function addCNY(source: CNY, input: CNY) {
  return source + input;
}

addCNY(CNYCount, USDCount);
```

:::
在结构化类型系统中，USD  与  CNY （分别代表美元单位与人民币单位）被认为是两个完全一致的类型，因此在   addCNY 函数中可以传入  USD  类型的变量。这就很离谱了，人民币与美元这两个单位实际的意义并不一致，怎么能进行相加？
:::

###### 在  TypeScript  中模拟标称类型系统（大家瞅瞅，不细讲了）

```typescript
export declare class TagProtector<T extends string> {
  protected __tag__: T;
}

export type Nominal<T, U extends string> = T & TagProtector<U>;
```

```typescript
export type CNY = Nominal<number, 'CNY'>;

export type USD = Nominal<number, 'USD'>;

const CNYCount = 100 as CNY;

const USDCount = 100 as USD;

function addCNY(source: CNY, input: CNY) {
  return (source + input) as CNY;
}

addCNY(CNYCount, CNYCount);

// 报错了！
addCNY(CNYCount, USDCount);
```

##### 2.类型系统层次-父子关系

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/a/RlZGL33r5T3gq7zJ/6aed8f1bb38d448bab28fb3da2d6e6542894.png)

可赋值性  assignable

```typescript
let animal: Animal;
let dog: Dog;

animal = dog; // ✅ok
dog = animal; // ❌error! animal 实例上缺少属性 'bark'
```

:::
父类型变量   =  子类型变量

不具体变量    =  更具体变量
:::

**下面是一个简单的类型体操，验证上面的层级关系**

```typescript
//any 类型和 unknown 类型的比较也是互相成立的
type TypeChain = never extends 'test'
  ? 'test' extends 'test' | '599'
    ? 'test' | '599' extends string
      ? string extends String
        ? String extends Object
          ? Object extends any
            ? any extends unknown
              ? unknown extends any
                ? 8
                : 7
              : 6
            : 5
          : 4
        : 3
      : 2
    : 1
  : 0;
```

###### iii.null undefined void 情况（上面少了几个类型）

```typescript
type Result34 = undefined extends 'test' ? 1 : 2; // 2
type Result35 = null extends 'test' ? 1 : 2; // 2
type Result36 = void extends 'test' ? 1 : 2; // 2
```

:::
\--strictNullCheckes 关闭    的情况下，null  会被视为  string  等类型的子类型。

但正常情况下我们不会这么做，因此这里不做讨论，而是将其视为与  string  等类型同级的一个类型。
:::

##### 3.方法层次-协变与逆变（函数类型有类型层级吗？）

在  TypeScript  中，协变（Covariance）和逆变（Contravariance）是描述类型系统中类型如何相互关联的术语。它们主要涉及到泛型和复杂类型的赋值规则，以及函数参数和返回值的类型关系。

###### i.协变(Covariance)

1.  返回类型协变 返回类型协变意味着当函数的返回类型是另一个函数返回类型的子类型时，这个函数可以被赋值给那个函数。

```typescript
type Animal = { name: string };
type Dog = { name: string; bark(): void };

let getAnimal: () => Animal;
let getDog: () => Dog = () => ({ name: 'Fido', bark: () => {} });

// 协变：Dog 是 Animal 的子类型，因此 getDog 可以赋值给 getAnimal
getAnimal = getDog; // ✅ok
getDog = getAnimal; //❌error
```

**逆变**(Contravariance)

逆变描述的是当一个父类型可以被赋值给子类型时的关系。在  TypeScript  中，函数参数是逆变的。

1.  函数参数逆变 函数参数逆变意味着当一个函数的参数类型是另一个函数参数类型的父类型时，这个函数可以被赋值给那个函数。

```typescript
/**
 * 动物  ->  狗 -> 柯基
 */
class Animal {
  asPet() {}
}

class Dog extends Animal {
  bark() {}
}

class Corgi extends Dog {
  cute() {}
}

// 定义入参是 动物， 狗， 柯基 的三个函数
let useAnimal: (a: Animal) => void = (animal) => {};
let useDog: (d: Dog) => void = (dog) => {
  dog.bark();
};
let useCorgi: (d: Corgi) => void = (corgi) => {};

// 逆变：Animal 是 Dog 的父类型，因此 useAnimal 可以赋值给 useDog
useDog = useAnimal; // ✅ok
useDog = useCorgi; // ❌error
```

**双向协变  (Bivariant)**

双向协变是一种特殊情况，TypeScript  在方法参数的类型检查中实际上使用了双向协变，这意味着它允许参数类型既是协变的也是逆变的。这是为了增加语言的灵活性，但实际上它可能是不安全的。

严格模式

在 TypeScript 的严格模式下（启用了标志），函数参数的逆变会得到更严格的检查，这更符合大多数类型系统的预期行为。

**总结**

:::
除了方法入参是逆变，其他都是协变
:::

- 协变：子类型（具体）可以赋值给父类型（如是的子类型，可以赋值给）。

- 逆变：父类型可以赋值给子类型（具体），但通常仅适用于函数参数。

- 双向协变：参数类型可以同时被认为是协变和逆变的，但可能是不安全的（非严格模式下的 TypeScript 默认行为）。

理解协变和逆变对于掌握  TypeScript  高级类型系统非常重要，特别是在涉及到泛型编程和高阶函数类型操作时。

# 三、流动的类型-类型推断&类型守卫&函数重载

参考：[《如何用好  typescript 》](https://alidocs.dingtalk.com/i/nodes/mExel2BLV542mgzruQBY47KGWgk9rpMq)\[道成\]

:::

> TypeScript  中提供了非常强大的类型推导能力，它会随着你的代码逻辑不断尝试收窄类型，这一能力称之为**类型的控制流分析**（也可以简单理解为类型推导）。

> 这么说有点抽象，我们可以想象有一条河流，它从上而下流过你的程序，随着代码的分支分出一条条支流，在最后重新合并为一条完整的河流。在河流流动的过程中，如果遇到了有特定条件才能进入的河道（比如  if else  语句、switch case  语句等），那河流流过这里就会收集对应的信息，等到最后合并时，它们就会嚷着交流：**“我刚刚流过了一个只有字符串类型才能进入的代码分支！”** **“我刚刚流过了一个只有函数类型才能进入的代码分支！”**……就这样，它会把整个程序的类型信息都收集完毕。
> :::

### 类型推断

```typescript
type RawType = { a: string; b: number };

// 这里就拿到了上述类型的引用
type InferType = RawType; // { a: string, b: number };
```

强大的类型推断

```typescript
/**
 * 带if 类型推断
 */
declare const strOrNumOrBool: string | number | boolean;

if (typeof strOrNumOrBool === 'string') {
  // 一定是字符串！
  strOrNumOrBool.charAt(1);
} else if (typeof strOrNumOrBool === 'number') {
  // 一定是数字！
  strOrNumOrBool.toFixed();
} else if (typeof strOrNumOrBool === 'boolean') {
  // 一定是布尔值！
  strOrNumOrBool === true;
} else {
  // 要是走到这里就说明有问题！
  const _exhaustiveCheck: never = strOrNumOrBool;
  throw new Error(`Unknown input type: ${_exhaustiveCheck}`);
}
```

:::
 if  条件中的表达式要是现在被提取出来了会发生什么？

刚流进    就戛然而止了。因为  isString  这个函数在另外一个地方，内部的判断逻辑并不在函数  foo  中。这里的类型控制流分析做不到跨函数上下文来进行类型的信息收集（但别的类型语言中可能是支持的）
:::

```typescript
function isString(input: unknown): boolean {
  return typeof input === 'string';
}

function foo(input: string | number) {
  if (isString(input)) {
    // 类型“string | number”上不存在属性“replace”。
    input.replace('test', 'test599');
  }
  if (typeof input === 'number') {
  }
  // ...
}
```

### 类型守卫

:::
将判断逻辑封装起来提取到函数外部进行复用非常常见。为了解决这一类型控制流分析的能力不足， TypeScript  引入了  is  关键字来显式地提供类型信息
:::

```typescript
function isString(input: unknown): input is string {
  return typeof input === 'string';
}

function foo(input: string | number) {
  if (isString(input)) {
    // 正确了
    input.replace('test', 'test599');
  }
  if (typeof input === 'number') {
  }
  // ...
}
```

- **写法**：意思是 a 是 b 类型，a 是函数参数，也可以是 this 关键字，this 关键字一般用在累中判断，b 可以是接口类型，b 也可以是 number、string 等其他合法的 TS 类型。这种写法称作类型谓词，使用类型谓词的函数称为类型谓词函数，该函数的返回值必须的 boolean 类型

- **使用**：先定义一个变量，该变量表示是否是某种类型，比如上面定义了 isString，代表了参数是类型，然后用这个变量来判断。

:::
需要注意的是，类型守卫函数中并不会对判断逻辑和实际类型的关联进行检查：
:::

```typescript
/**
 * 虽然设置是 is number，但内部具体是 string
 */
function isString(input: unknown): input is number {
  return typeof input === 'string';
}

function foo(input: string | number) {
  if (isString(input)) {
    // 报错，在这里变成了 number 类型
    input.replace('test', 'test599');
  }
  if (typeof input === 'number') {
  }
  // ...
}
```

### 重载

重载解决什么问题？JavaScript  本身并没有方法重载

```typescript
function func(foo: number, bar?: boolean): string | number {
  if (bar) {
    return String(foo);
  } else {
    return foo * 599;
  }
}
```

:::
在这个实例中，函数的返回类型基于其入参    的值，并且从其内部逻辑中我们知道，当    为  true，返回值为  string  类型，否则为  number  类型。而这里的类型签名完全没有体现这一点，我们只知道它的返回值是这么个联合类型。
:::

```typescript
function func(foo: number, bar: true): string; // 为什么 bar 不能用bar？
function func(foo: number, bar?: false): number;
function func(foo: number, bar?: boolean): string | number {
  if (bar) {
    return String(foo);
  } else {
    return foo * 599;
  }
}

const res1 = func(599); // number
const res2 = func(599, true); // string
const res3 = func(599, false); // number
```

:::
你可以试着将上面第一个重载声明的  bar  参数也加上可选符号，然后就会发现第一个函数调用错误地匹配到了第一个重载声明。
:::
:::
个人理解,  不管是   类型守卫还是   重载，从某方面来说   都是   完善类型推断的不足
:::

# 四、类型运算-类型体操练起来

:::
TypeScript  类型系统支持类型编程，也就是对类型参数做一系列运算产生新的类型。
:::

这种类型编程逻辑可以写得很复杂，所以被戏称为“类型体操”。

它是  TS  中最强大也是最复杂的部分了，属于深水区的内容。本次从简单的开始，高深的   留给大家自己去瞅瞅

:::
思考：有人说  Typescript = Type + Javascript，那么抛开  Javascript  不谈，这里的  Type  是一门完备的编程语言吗？也就是说  ts 类型系统是否是图灵完备的？
:::

参考：[浅谈 TypeScript 的图灵完备性  | Wayne 的博客  (michealwayne.cn)](https://blog.michealwayne.cn/2022/11/19/typescript/%E6%B5%85%E8%B0%88TypeScript%E7%9A%84%E5%9B%BE%E7%81%B5%E5%AE%8C%E5%A4%87%E6%80%A7/)

## 图灵完备

:::
typescrpt 类型系统是   图灵完备的
:::

TypeScript  类型的图灵完备性证明意味着它具备了与其他图灵完备语言相同的计算能力，可以在理论上执行任何可计算的操作。

用  ts  类型系统写象棋效果体验：[https://tsplay.dev/Nd4n0N](https://tsplay.dev/Nd4n0N)

具体实现可见：[《用  TypeScript  类型运算实现一个中国象棋程序》](https://zhuanlan.zhihu.com/p/426966480)

体操虽然对实际项目开发的意义非常有限，但却可以从另外一个角度让你认识到  TypeScript  类型系统的图灵完备，以及在高手手里所表现出来的精妙技巧。

但是，如果你因为看不懂这些体操，或者想不出更炫酷的体操而感到焦虑，那就需要警醒一下了——**类型体操绝不代表你的  TS  水平**。很多因为掌握了各种类型体操表演引以为豪的同学，其中有相当一部分人在实际业务开发中，仍然是各种  any  与复制粘贴。这就是非常严重的本末倒置，你学习  TypeScript ，是为了帅气的体操还是为了更高质量的代码呢？

## 类型体操的价值

很多同学不知道类型编程学了有什么用，好像做业务也用不到这个。那今天我们就来看一个具体的例子，来感受下类型体操的意义。

实现下面这 ts 提示（抄大佬代码），具体实现还是有一定挑战的，进阶可以瞅瞅。看完了给我讲讲。

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/r4mlQg962Bedqxow/img/8661eb84-3cad-41ef-9479-ff4f49abe4bc.png)

[**试一下**](https://www.typescriptlang.org/play?ts=4.5.0-beta#code/C4TwDgpgBACghgJwM4XguBbAPGzUIAewEAdgCZJRLAICWJA5gHxQC8UAUFN7InocXKUABgBIA3vQBmEBFADSEEAF9WE6bKgA1OABsArhGXCuPMwH4o402dtQA2vKj0FSgLoAubXsOc73ZSgvACUIAGMAewQyLGo6RgAaKDgSECYAbg4OUEheZAgARUMEEABlGnoGUMp2NBQi2TKKxiwAcjhWAEYAMg6AJm6AI1YAZm6w1gAWVoysnOg4Njz64qb4qogkTOzwaABZWQYIHQNNrAB5Eggk8+AAC1kWdhsoS+gBUgpX+80Xi1ern8eF5bg85B8hFB9CQANYkCIAdxI9jcQLslnsbySADpcaDZKj-LYvJirjcfgg3Nt5lADggjrgMEgsC83oz8ERPpRQpForFmgwkik0glWRT2RCvjyojE4pUhakmBwnlZTAgIHAyBESLoQA5FHqXDClBEpADUHwMFAAD5QY0gU3fMGMzx+HgGjmCL72x1sy1oqCWD2Syg+s34hCMgP-OlHE6GZl+9AYRzucnOy2pkBuJVEswgq6MrOE-xeYOcyFhp2ydnRniWCNFg1uN15oJQK4AN1kHGUc12y0Kq3K6ywI89XKoApVL3HIagYkkJBkckZym66mXmmqwGMAcssYtyeZdSPmBwlqYSVPDRKI8qWB3TFzpcHjLHNFmHEIYCiwCgZAQFIcD6Lo-5SNCYTALQ2pQGAiArI094tHOFZfHKjBMAAFAAjsONBeCOACUXg3vho4jiw1hmLQZpYQAhHhSE0DatqMeR2K6KQDD3ERqpEuqwD6AgJBWIEcCUMKmRmH2ZiRCQ1BQExJTnIMABWSziOJkmpNJPDyYptDEEySzKWs2JIGAuhGVhrTdK0RF6dwRkQEy2JSFEACicBhHcWEuVarBUQGBn-vY9pJJ2PgQC27ABRZVk2a0rAOU5ti0VAuGrKpanhe4fHUW2zhSFhACCCDoCA2K0Eg5WVVljQ5Xl2ZEQVdZ2GZTX2m42JgPoSB+VFpyOe1UCBBAugoPxRVmJ16nNbFDhzbl3WRdFJZtrJ-jjZN0CFW2y0LUsQ2GGlMkvMoI1mIJwmictyQ6SAmR9hwoVQOqNRwQhQ7MestkdD0wwDBMIypRwQA)  [**参考**](https://zhuanlan.zhihu.com/p/478367045)

## 基本逻辑运算——内置运算符

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/r4mlQg962Bedqxow/img/5c7b5c60-439a-44be-961c-25a6a5f9be4f.png)

:::
TypeScript  支持条件、推导、联合、交叉、对联合类型做映射等多种运算逻辑。
:::

### 1.类型判断  if

官方文档被称为   条件类型(Conditional Types)，定义的方法也非常简单，就是使用  extends  关键字。

:::
T extends U ? X : Y;
:::

```typescript
type isTwo<T> = T extends 2 ? true : false;

type res = isTwo<1>;
type res2 = isTwo<2>;
```

与 never 结合的化学反应

类型表示不应该存在的类型状态，例如一个函数抛出异常，因此永远不会有返回值。当    和    一起使用时，通常是为了在类型别名或类型函数中进行条件类型检查，过滤联合类型中的某些成员，或者在高级类型操作中使用。

```typescript
type ExcludeNever<T> = T extends never ? never : T;

type SomeUnion = string | number | never;
// 使用ExcludeNever过滤掉never，得到string | number
type WithoutNever = ExcludeNever<SomeUnion>;
```

### 2.约束  extends-还是 if 使用

通过约束语法  extends  限制类型。

```typescript
// 通过 T extends Length 约束了 T 的类型，必须是包含 length 属性，且 length 的类型必须是 number。
interface Length {
  length: number;
}

function fn1<T extends Length>(arg: T): number {
  return arg.length;
}
```

### 3.推导：infer  ——  正则获取内容

推导则是类似  js  的正则匹配，满足公式条件时，可以提取公式中的变量，直接返回或者再次加工都可以。

```typescript
// 推导：infer
// 提取元组类型的第一个元素：
// extends 约束类型参数只能是数组类型，因为不知道数组元素的具体类型，所以用 unknown。
// extends 判断类型参数 T 是不是 [infer F, ...infer R] 的子类型，如果是就返回 F 变量，如果不是就不返回
type First<T extends unknown[]> = T extends [infer F, ...infer R] ? F : never;
// 1
type res2 = First<[1, 2, 3]>;
```

### 4.联合：|   

联合代表可以是几个类型之一。

```javascript
type Union = 1 | 2 | 3;
```

### 5.交叉：&

交叉代表对类型做合并。

```javascript
type ObjType = { a: number } & { c: boolean };
```

### 6.索引查询：keyof T

keyof  用于获取某种类型的所有键，其返回值是联合类型。

```javascript
// const a: 'name' | 'age' = 'name'
const a: keyof {
    name: string,
    age: number
} = 'name'
```

### 7.索引访问：T\[K\]

T\[K\]  用于访问索引，得到索引对应的值的联合类型。

```javascript
interface I3 {
  name: string,
  age: number
}

type T6 = I3[keyof I3] // string | number

```

### 8.索引遍历： in

in  用于遍历联合类型。

```javascript
const obj = {
    name: 'tj',
    age: 11
}

type T5 = {
    [P in keyof typeof obj]: any
}

/*
{
  name: any,
  age: any
}
*/
```

### 9.索引重映射： as——改变 key

as  用于修改映射类型的  key。

```javascript
// 通过索引查询 keyof，索引访问 t[k]，索引遍历 in，索引重映射 as，返回全新的 key、value 构成的新的映射类型
type MapType<T> = {
    [
      Key in keyof T
        as `${Key & string}${Key & string}${Key & string}`
    ]:
    [
      T[Key], T[Key], T[Key]
    ]
}
// {
//     aaa: [1, 1, 1];
//     bbb: [2, 2, 2];
// }
type res3 = MapType<{ a: 1, b: 2 }>

```

## 运算套路-中等难度的体操

### 1.模式匹配做提取(infer)

就像字符串可以通过正则提取字符串一样，TypeScript  的类型也可以通过匹配一个模式类型来提取部分类型到  infer  声明的局部变量中返回。

用模式匹配提取函数参数类型

```javascript
/**
* 注意 infer 位置
*/
type GetParameters<Func extends Function> =
    Func extends (...args: infer Args) => unknown ? Args : never;

type ParametersResult = GetParameters<(name: string, age: number) => string>
```

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/r4mlQg962Bedqxow/img/08de892f-5524-483f-9137-a5384f295305.png)

:::
思考：提取函数类型的返回值类型怎么写？ 
:::

##### 深入瞅瞅，了解   infer  语法使用条件及场景（使用很受限）

在 TypeScript 中，关键字用于在条件类型中声明一个类型变量，这个类型变量可以在条件类型的真分支中捕获类型，并在真分支的类型表达式里使用。关键字通常在从复杂类型结构中提取类型信息时非常有用，如从函数类型提取返回类型或参数类型，或者从数组和其他泛型类型中提取元素类型。

以下是使用关键字的条件：

1.  条件类型语法:  关键字必须在条件类型的上下文中使用，遵循基本的条件类型语法  T extends U ? X : Y 。

2.  类型推断位置:  关键字用于在类型推断的位置，即你想要捕获的类型的位置。它只能出现在 extends 条件类型表达式的子句中。

3.  唯一的局部类型变量:  后面跟随的是一个唯一的局部类型变量，比如。这个局部类型变量在条件类型的真分支内可用作已推断的类型。

以下是一些关键字的使用示例：

提取函数返回类型:

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

function exampleFunction(): number {
  return 42;
}

// 使用ReturnType从exampleFunction的类型中提取返回类型
type ExampleFunctionReturnType = ReturnType<typeof exampleFunction>; // number
```

在这个例子中，用于捕获函数返回类型，然后在条件类型的真分支中返回这个推断出的类型。

提取数组元素类型:

```typescript
type ElementType<T> = T extends (infer E)[] ? E : never;

type ExampleArray = number[];
// 使用ElementType从ExampleArray的类型中提取元素类型
type ExampleArrayElementType = ElementType<ExampleArray>; // number
```

在这个例子中，用于捕获数组元素类型。

提取 Promise 解析的类型:

```typescript
type ResolveType<T> = T extends Promise<infer R> ? R : never;

type ExamplePromise = Promise<string>;
// 使用ResolveType从ExamplePromise的类型中提取解析的类型
type ExamplePromiseResolveType = ResolveType<ExamplePromise>; // string
```

在这个例子中，用于捕获解析的类型。

关键字是一个高级特性，它为类型推断和复杂类型操作提供了强大的能力，可以使类型定义更加灵活和动态。

### 2.重新构造做变换（你最爱的 as  大法，改变 key 值）

:::
上面 infer   只是做了提取想改变呢？
:::

TypeScript  类型系统可以通过  type  声明类型变量，通过  infer  声明局部变量，类型参数在类型编程中也相当于局部变量，但是它们都不能做修改，想要对类型做变换只能构造一个新的类型，在构造的过程中做过滤和转换。

在字符串、数组、函数、索引等类型都有很多应用，特别是索引类型。

比如把索引变为大写：

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/r4mlQg962Bedqxow/img/2fc41b71-7657-4d17-86aa-5b66bfe5d5eb.png)

```typescript
type UppercaseKey<Obj extends Record<string, any>> = {
  [Key in keyof Obj as Uppercase<Key & string>]: Obj[Key];
};
```

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/r4mlQg962Bedqxow/img/6b500577-9b5f-4d9d-960e-db44ea18418a.png)

### 3.递归复用做循环

:::
在  TypeScript  类型编程中，遇到数量不确定问题时，就要条件反射地想到递归，每次只处理一个类型，剩下的放到下次递归，直到满足结束条件，就处理完了所有的类型。
:::

比如把长度不确定的字符串转为联合类型：

```javascript
type StringToUnion<Str extends string> =
    Str extends `${infer First}${infer Rest}`
        ? First | StringToUnion<Rest>
        : never;
type StringToUnionResult = StringToUnion<'hello'>
```

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/r4mlQg962Bedqxow/img/c34f2715-1b68-4fec-bb7c-8cebfffd9948.png)

### 4.数组长度做计数（四则运算）

:::
TypeScript  类型系统没有加减乘除运算符，但是可以构造不同的数组再取  length  来得到相应的结果。这样就把数值运算转为了数组类型的构造和提取。
:::

比如通过数组长度实现类型编程的加法运算。

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/r4mlQg962Bedqxow/img/62bbbc60-ff7e-4ebd-a4b1-42825726ccc5.png)

```javascript
// 创建 length长度的unknown[] 数组
type BuildArray<
    Length extends number,
    Ele = unknown,
    Arr extends unknown[] = []
    > = Arr['length'] extends Length
    ? Arr
    : BuildArray<Length, Ele, [...Arr, Ele]>;

// 合并两个 unknown[] 数组，求新数组的.length
type Add<Num1 extends number, Num2 extends number> =
    [...BuildArray<Num1>, ...BuildArray<Num2>]['length'];


type AddResult = Add<32, 25>
```

思考：如何实现一个减法呢？乘法？除法？求余？

### 5.联合分散(Distributive conditional types)可简化

**什么是**分布式条件类型（Distributive Conditional Types**？**

在  TypeScript  中，"distributive"  通常与条件类型一起使用，特别是指分布式条件类型（Distributive Conditional Types）。分布式条件类型是一种特殊的条件类型，当条件类型作用于联合类型时，条件类型会被自动分配（"distribute"）到联合类型的每个成员上，然后再将结果组合成一个新的联合类型。

```javascript
type TypeName<T> = T extends string ? "string" :
                   T extends number ? "number" :
                   T extends boolean ? "boolean" :
                   T extends undefined ? "undefined" :
                   T extends Function ? "function" :
                   "object";

type T0 = TypeName<string | number>;  // "string" | "number"
type T1 = TypeName<"a" | 42 | true>;  // "string" | "number" | "boolean"
```

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/r4mlQg962Bedqxow/img/51226416-1dc0-445e-9cc6-3f88c33ffa56.png)

不让触发

```javascript
type NonDistributiveTypeName<T> = [T] extends [string] ? "string" :
                                 [T] extends [number] ? "number" :
                                 [T] extends [boolean] ? "boolean" :
                                 [T] extends [undefined] ? "undefined" :
                                 [T] extends [Function] ? "function" :
                                 "object";

type T2 = NonDistributiveTypeName<string | number>;  // "object"
```

成一个整体

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/r4mlQg962Bedqxow/img/f8f1f83c-eb15-4499-9fc6-c004e6c896ac.png)

conditional  触发条件

1.  条件类型语法:  使用条件类型的基本语法  ，其中是类型变量，是任意类型，和是在条件为真或假时的类型。

2.  裸类型参数:  在条件类型表达式中，泛型类型参数（例如  ）必须是“裸”的，这意味着它不能被封装在另一个类型结构中。例如，不能被包装在数组、元组、或包含它的其他类型中。

```javascript
//
type UppercaseA<Item extends string> =
    Item extends 'a' ?  Uppercase<Item> : Item;

// 泛型中传入一个联合类型
type result = UppercaseA<'a' | 'b' | 'c'>
```

裸类型参数的例子（分布式触发）：

```typescript
type Example<T> = T extends U ? X : Y;
```

非裸类型参数的例子（不触发分布式）：

```typescript
type Example<T> = [T] extends [U] ? X : Y;
```

1.  联合类型:  分布式条件类型通常与联合类型结合使用。当条件类型表达式的类型参数应用于一个联合类型时，如果其他触发条件得到满足，条件类型会分别作用于联合类型中的每个成员。

联合类型的分布式应用示例：

```typescript
type Example<T> = T extends U ? X : Y;
type Distributed = Example<string | number>; // (string extends U ? X : Y) | (number extends U ? X : Y)
```

### 6.特殊特性要记清(骚操作要尽量避免)

在 TypeScript 中，  类型具有特殊的属性，当与任何其他类型进行交叉操作（使用操作符）时，结果都是    类型。这是因为    类型是顶级类型（top type），它可以赋值给任何类型，同时任何类型也可以赋值给它。它的设计目的是为了完全绕过类型检查，为代码提供最大程度的灵活性。

这里是一个简单的例子来说明这一点：

```typescript
type SomeType = {
  prop1: string;
  prop2: number;
};

// 结果类型为 `any`
type CombinedType = any & SomeType;
```

不太符合集合逻辑：

:::
any  是所有类型的超集，&  又是取交集， any & T  按照集合概念理解应该是  T
:::

:::
实现更精准的类型提示和检查，这就是类型体操的意义！

不过也不必要过分焦虑，对于经常需要开发一些三方组件的可以瞅瞅
:::

# 五、内置工具

内置的工具类型按照类型操作的不同，其实也可以大致划分为这么几类：

- 对属性的修饰，包括对象属性和数组元素的可选/必选、只读/可写。我们将这一类统称为**属性修饰工具类型**。

- 对既有类型的裁剪、拼接、转换等，比如使用对一个对象类型裁剪得到一个新的对象类型，将联合类型结构转换到交叉类型结构。我们将这一类统称为**结构工具类型**。

- 对集合（即联合类型）的处理，即交集、并集、差集、补集。我们将这一类统称为**集合工具类型**。

- 基于  infer  的模式匹配，即对一个既有类型特定位置类型的提取，比如提取函数类型签名中的返回值类型。我们将其统称为**模式匹配工具类型**。

- 模板字符串专属的工具类型，比如神奇地将一个对象类型中的所有属性名转换为大驼峰的形式。这一类当然就统称为**模板字符串工具类型**了。

## 1.属性修饰工具类型

```typescript
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P];
};

type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

:::
探索：

现在我们了解了  Partial、Readonly  这一类属性修饰的工具类型，不妨想想它们是否能满足我们的需要？假设场景逐渐开始变得复杂，比如以下这些情况：

现在的属性修饰是浅层的，如果我想将**嵌套在里面的对象类型**也进行修饰，需要怎么改进？

现在的属性修饰是全量的，如果我只想**修饰部分属性**呢？这里的部分属性，可能是**基于传入已知的键名**来确定（比如属性 a、b），也可能是**基于属性类型**来确定(比如所有函数类型的值)？
:::

## 2.结构工具类型

这一部分的工具类型主要使用**条件类型**以及**映射类型**、**索引类型**。

结构工具类型其实又可以分为两类，**结构声明**和**结构处理**。

结构声明工具类型即快速声明一个结构，比如内置类型中的  Record：

```typescript
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```

结构处理工具类型

```typescript
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

:::
思考：

Pick  和  Omit  是基于键名的，如果我们需要**基于键值类型**呢？比如仅对函数类型的属性？

除了将一个对象结构拆分为多个子结构外，对这些子结构的**互斥处理**也是结构工具类型需要解决的问题之一。互斥处理指的是，假设你的对象存在三个属性  A、B、C ，其中  A  与  C  互斥，即  A  存在时不允许  C  存在。而  A  与  B  绑定，即  A  存在时  B  也必须存在，A  不存在时  B  也不允许存在。此时应该如何实现？
:::

## 3.集合工具

在开始集合类型前，我们不妨先聊一聊数学中的集合概念。对于两个集合来说，通常存在**交集、并集、差集、补集**这么几种情况

```typescript
type Extract<T, U> = T extends U ? T : never;

type Exclude<T, U> = T extends U ? never : T;
```

:::
思考：

目前为止我们的集合类型都停留在一维的层面，即联合类型之间的集合运算。如果现在我们要处理**对象类型结构的集合运算**呢？

在处理对象类型结构运算时，可能存在不同的需求，比如合并时，我们可能希望**保留原属性或替换原属性**，可能希望**替换原属性的同时并不追加新的属性**进来（即仅使用新的对象类型中的属性值覆盖原本对象类型中的同名属性值），此时要如何灵活地处理这些情况？
:::

## 4.模式匹配工具

这一部分的工具类型主要使用**条件类型**与  **infer  关键字**。

在条件类型一节中我们已经差不多了解了  infer  关键字的使用，而更严格地说  infer  其实代表了一种  **模式匹配（pattern matching）**  的思路，如正则表达式、Glob  等都体现了这一概念。

首先是对函数类型签名的模式匹配：

```typescript
type FunctionType = (...args: any) => any;

type Parameters<T extends FunctionType> = T extends (...args: infer P) => any
  ? P
  : never;

type ReturnType<T extends FunctionType> = T extends (...args: any) => infer R
  ? R
  : any;
```

根据  infer  的位置不同，我们就能够获取到不同位置的类型，在函数这里则是参数类型与返回值类型。

我们还可以更进一步，比如只匹配第一个参数类型：

```typescript
type FirstParameter<T extends FunctionType> = T extends (
  arg: infer P,
  ...args: any
) => any
  ? P
  : never;

type FuncFoo = (arg: number) => void;
type FuncBar = (...args: string[]) => void;

type FooFirstParameter = FirstParameter<FuncFoo>; // number
```

:::
思考：

infer  和条件类型的搭配看起来会有奇效，比如在哪些场景？比如随着条件类型的嵌套每个分支会提取不同位置的  infer ？

infer  在某些特殊位置下应该如何处理？比如上面我们写了第一个参数类型，不妨试着来写写**最后一个参数类型**？
:::

## 5.字符串工具

包括  **Uppercase**、**Lowercase**、**Capitalize**  与  **Uncapitalize**，看名字就能知道它们的作用：字符串大写、字符串小写、首字母大写与首字母小写：

```typescript
typescript复制代码type Heavy<T extends string> = `${Uppercase<T>}`;
type Respect<T extends string> = `${Capitalize<T>}`;

type HeavyName = Heavy<'linbudu'>; // "LINBUDU"
type RespectName = Respect<'linbudu'>; // "Linbudu"
```

# 六、ts 的未来及实践小工具

### JSDoc  取代 TS

Svelte  弃用  TypeScript，改用  JSDoc  了。

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/r4mlQg962Bedqxow/img/007d8d55-8b9e-4f3d-bb77-819f541824c3.png)

:::
jsdoc，最初设计目的是   在代码的注释上加上类型的标识，然后通过  jsdoc  命令行工具，就可以直接生成文档。
:::
:::
但我们说的  JSDoc  并不是这个，而是  TS  基于  JSDoc  语法实现的，在注释里给代码添加类型的语法。
:::

[官方文档](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#type)

JSDoc  是在  js  的注释里通过  @type、@typedef、@template、@param  等来定义类型，然后开启  checkJS  和  allowJS  的配置之后，tsc  就可以对  js  做类型检查。

ts  里可以定义的类型，在  JSDoc  里都可以定义，比如变量、函数、class、泛型，甚至类型编程等。复杂的类型还可以抽离到  dts  里，在  @type  里引入。

也就是说  JSDoc  确实可以替代  ts。

然后我们看了  svelte  选择  JSDoc  的原因，只是为了调试方便。这样不用编译就可以直接跑  js  代码，可以直接定位到源码。而且这样也能利用  ts  的类型提示和检查的能力。

所以很多人就说  svelte  抛弃了  ts。

这叫抛弃么？

:::
JSDoc  只是另一种使用  ts  的方式而已。

也就是   既要 ts 的强校验，不想要 ts 的编译（大型项目中，构建耗时中，很大一部分是 ts 编译），个人觉得可能是未来趋势。
:::

### 常用小工具

json 转 ts [https://ppe-json-mock-factory.faas.elenet.me/](https://ppe-json-mock-factory.faas.elenet.me/)

ts 演练场  [https://www.typescriptlang.org/zh/play](https://www.typescriptlang.org/zh/play)

[TypeScript Importer](https://link.juejin.cn/?target=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Dpmneo.tsimporter)  这一插件会收集你项目内所有的类型定义，在你敲出时提供这些类型来进行补全。如果你选择了一个，它还会自动帮你把这个类型导入进来。

[ErrorLens](https://link.juejin.cn/?target=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3DPhilHindle.errorlens)，这一插件能够把你的  VS Code  底部问题栏的错误下直接显示到代码文件中的对应位置，比如这样：![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/r4mlQg962Bedqxow/img/529b3f94-2580-4293-8fdb-d133f5d8d5f1.png)

:::
ts  水较深，今天只是讲了   表层的一些东西，希望对大家有点帮助。

深入研究 ts，是为了不用 ts 而研究，要想不用它，得先打入敌人内部；慢慢研究，发现还挺有意思的，变成 ts 吹了。不喜欢，只是因为研究的不深而已。

后续准备专门搞一篇实践 ts 篇，因为 ts 技术很多，业务场景中   怎么写才是最优的，有待研究……

学习之路与大家一起探索，共勉之，
:::
