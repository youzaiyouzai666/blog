# 用法

[参考](https://www.tslang.cn/docs/home.html)

[《深入理解 TypeScript》](https://jkchao.github.io/typescript-book-chinese/#why)

## 配置

### [tsconfig.json](https://jkchao.github.io/typescript-book-chinese/project/compilationContext.html#基础)



## 基本用法

1. 类型注解

   ```typescript
   function greeter(person: string) {
       return "Hello, " + person;
   }
   
   let user = [0, 1, 2];
   
   document.body.innerHTML = greeter(user);
   ```


2. 接口

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


3. 类



##高阶用法

#### 泛型

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







