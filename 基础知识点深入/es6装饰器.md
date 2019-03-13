# ES6 装饰器

参考：[阮一峰ES6入门](http://es6.ruanyifeng.com/#docs/decorator)

[业务应用](https://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651555774&idx=1&sn=46e774e811db7799e535a8e23e7c4165&chksm=8025507fb752d969ded010ca71c13bc1f3784ab097eb741da0686a0299ead71ddedadac9d6a2&mpshare=1&scene=1&srcid=0123icEgevPmbpgIA3BxQP5y#rd)

[ES6 系列之我们来聊聊装饰器](https://juejin.im/post/5bec22ad5188254d070bd9e8)

## 类装饰器

1. 基本使用

```javascript
//难点是 testable中参数表示 A这个类本身
@testable
class A {
  // ...
}

function testable(target) {
  target.isTestable = true;
  target.aaaa = 'aaaa';
}
```

等同于下面代码：

```javascript
@testable
class A {}

// 等同于

class A {}
A = testable(A) || A;
```

2. 更高一级封装（todo）



## 方法装饰器

>  return descriptor;//注意 return是 descriptor
>
> 为什么返回是descriptor

```javascript
function readonly(target, name, descriptor){
  // descriptor对象原来的值如下
  // {
  //   value: specifiedFunction,
  //   enumerable: false,
  //   configurable: true,
  //   writable: true
  // };
  descriptor.writable = false;
  return descriptor;//注意 return是 descriptor
}

readonly(Person.prototype, 'name', descriptor);
// 类似于
Object.defineProperty(Person.prototype, 'name', descriptor);
```

