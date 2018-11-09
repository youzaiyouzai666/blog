# ES6 装饰器

参考：[阮一峰ES6入门](http://es6.ruanyifeng.com/#docs/decorator)

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

