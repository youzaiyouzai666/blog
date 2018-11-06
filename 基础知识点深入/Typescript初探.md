# Typescript

[参考](https://www.tslang.cn/docs/home.html)

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
