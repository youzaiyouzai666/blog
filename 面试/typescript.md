# 泛型

本质 泛型是 ‌ 类型参数化 ‌ 机制，将类型作为变量传递（类似函数参数），允许在定义时不指定具体类型，而是在调用时动态确定类型

```
function identity<T>(arg: T): T { return arg; }
```

# TypeScript 中 any 和 unknown 的区别

any 和 unknown 都表示“任意类型”

### 何时使用？

用 unknown：当你需要处理动态内容（如第三方数据、用户输入），但希望保持类型安全。
用 any：仅在需要快速修复旧代码或彻底绕过类型检查时使用（尽量避免）。

```
// any：无需检查，直接操作（危险！）
function unsafeExample(data: any) {
  data.method(); // 编译通过，但运行时可能崩溃
}

// unknown：必须显式处理类型（安全）
function safeExample(data: unknown) {
  if (data && typeof data === "object" && "method" in data) {
    (data as { method: () => void }).method(); // 安全操作
  }
}

```

# infer

Infer 关键字用于条件中的类型推导。

```
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
```

[精读《Typescript infer 关键字》](https://zhuanlan.zhihu.com/p/402541135)

# never

表示“永远不会出现的值”或“不可达代码路径”

### 核心特性

1. 空集概念 - 代表没有值的类型，是所有其他类型的子类型。
   例如：任何类型都不能赋值给 never，但 never 可以赋值给任何类型
2. 不可达代码路径 - 当函数抛出异常或进入死循环时，其返回值类型为 never，表示代码执行路径在此终止

```
function throwError(msg: string): never {
  throw new Error(msg);
}
function infiniteLoop(): never {
  while (true) {}
}

```

# TypeScript 中 interface 与 type

‌interface‌

1. 专为描述对象结构（属性、方法）设计
2. 支持同名接口自动合并
3. 通过 extends 继承

‌type‌

1. 可定义任何类型的别名（包括原始类型、联合类型等)
2. 同名类型别名会报错
3. 通过交叉类型 & 组合

# 手写

```
type myPick<T, K extends keyof T> = {
  [key in K]: T[key];
};
```

```
type pickByType<T,U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K]
}
```

```
type myExclude<T, U> = T extends U ? never : T;
```

```
type myOmit<T, K extends keyof T> = {
  [key in Exclude<keyof T, K>]: T[key];
};
```
