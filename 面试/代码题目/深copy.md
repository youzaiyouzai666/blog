下面介绍如何在 JavaScript 中实现深拷贝，并通过逐步完善示例代码来讲解这一过程。总体来说，深拷贝要求复制一个对象“所有层级”的数据，使得拷贝出来的对象完全独立于原对象，后续修改拷贝内容不会影响原对象，而浅拷贝只复制第一层属性，若其中包含对象或数组，则仅复制引用。

下面我们先介绍最简单的深拷贝方法，再逐步完善，讨论扩展支持更多场景（比如数组、循环引用、处理 Date 等特殊对象），最后也提到浏览器内置的 structuredClone 方法。

---

## 1. 基础方法：利用 JSON.stringify 和 JSON.parse

最简单且常见的方法是将对象先序列化为 JSON 字符串，再反序列化回来，此方法代码如下：

```js
const deepCloneJSON = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// 示例
const obj1 = {
  user: { role: "admin", list: [1, 2, 3] },
  num: 100,
};
const clone1 = deepCloneJSON(obj1);
clone1.user.role = "guest";

console.log(clone1.user.role); // 'guest'
console.log(obj1.user.role); // 'admin'
```

**优点**

- 简单且易用

**缺点**

- 无法拷贝函数、`undefined`、`Symbol`、`Date`、`RegExp` 等（会丢失或转换）
- 不能处理循环引用的对象

---

## 2. 递归实现深拷贝（基础版）

为了不依赖 JSON 方法，可以使用递归遍历实现深拷贝，下面是一种基础实现：

```js
function deepClone(obj) {
  // 如果不是对象或为 null，则直接返回（基本数据类型直接赋值即可）
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  let clone;
  // 根据对象的类型创建对应的容器，数组或普通对象
  if (Array.isArray(obj)) {
    clone = [];
    for (let i = 0; i < obj.length; i++) {
      clone[i] = deepClone(obj[i]); // 递归拷贝每个元素
    }
  } else {
    clone = {};
    // 注意：这里使用 Object.keys 遍历只会处理“自有”可枚举属性
    for (let key of Object.keys(obj)) {
      clone[key] = deepClone(obj[key]);
    }
  }

  return clone;
}

// 示例
const obj2 = {
  user: { role: "admin", list: [1, 2, 3] },
  num: 100,
};
const clone2 = deepClone(obj2);
clone2.user.list[0] = 99;

console.log(clone2.user.list); // [99, 2, 3]
console.log(obj2.user.list); // [1, 2, 3]
```

这种方法可以实现基本深拷贝。它解决了嵌套对象和数组的递归问题，但仍存在如下问题：

- **特殊对象问题**：如果对象中包含 `Date`、`RegExp` 等特殊对象，直接按上面的逻辑进行复制，只会生成一个普通对象，属性不一定正确。
- **循环引用问题**：如果对象自身或者其子属性中存在循环引用，递归将进入无限循环，导致栈溢出。

---

## 3. 处理特殊对象和循环引用

### 3.1 处理特殊对象（如 Date、RegExp）

可以在函数内对特殊类型进行判断，如判断是否为 Date 对象，如果是则新建一个 Date 对象；对于 RegExp 类似处理。示例如下：

```js
function deepClone(obj) {
  // 非对象或 null 直接返回
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  // 处理 Date 对象
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  // 处理 RegExp 对象
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags);
  }

  // 定义返回值
  let clone;
  if (Array.isArray(obj)) {
    clone = [];
    for (let i = 0; i < obj.length; i++) {
      clone[i] = deepClone(obj[i]);
    }
  } else {
    clone = {};
    for (let key of Object.keys(obj)) {
      clone[key] = deepClone(obj[key]);
    }
  }
  return clone;
}

// 示例
const obj3 = {
  date: new Date(),
  reg: /hello/g,
  user: { role: "admin" },
};
const clone3 = deepClone(obj3);
console.log(clone3.date instanceof Date); // true
console.log(clone3.reg instanceof RegExp); // true
```

### 3.2 处理循环引用

为了解决循环引用问题，我们需要在递归过程中记录已经处理过的对象。通常使用 WeakMap 来记录源对象与其对应的拷贝。如下代码：

```js
function deepClone(obj, hash = new WeakMap()) {
  // 处理非对象类型
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  // 如果循环引用，则返回保存过的对象
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  // 对 Date 和 RegExp 的判断可以放在这里
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags);
  }

  // 开始拷贝对象或数组
  let clone;
  if (Array.isArray(obj)) {
    clone = [];
  } else {
    clone = {};
  }

  // 先将当前对象和 clone 存入 hash
  hash.set(obj, clone);

  // 遍历 obj 的所有自身属性（此处只处理可枚举属性）
  for (let key of Object.keys(obj)) {
    clone[key] = deepClone(obj[key], hash);
  }
  return clone;
}

// 示例：构造带循环引用的对象
const a = { num: 1 };
a.self = a;

const cloneA = deepClone(a);
console.log(cloneA.self === cloneA); // true
```

这样，借助 WeakMap，就能避免无限递归问题。

---

## 4. 现代解决方案：structuredClone

如果你的运行环境支持 [structuredClone](https://developer.mozilla.org/zh-CN/docs/Web/API/structuredClone)（如现代浏览器、Node.js 17+ 等），可以直接调用该方法进行深拷贝。示例代码非常简单：

```js
const obj = {
  user: { role: "admin", list: [1, 2, 3] },
  date: new Date(),
};
const cloneObj = structuredClone(obj);
cloneObj.user.role = "guest";
console.log(obj.user.role); // 'admin'
```

**优点**

- 内置 API，性能优秀
- 能处理循环引用，支持更多数据类型（例如 `Map`、`Set`、`ArrayBuffer` 等）

**缺点**

- 目前可能还没有在所有环境中完全支持

---

## 5. 总结与最佳实践

针对深拷贝的需求，我们通常可以采用以下几种方案：

1. **简单对象（无特殊数据与循环引用）**
   使用 `JSON.parse(JSON.stringify(obj))` 方法快速实现。

2. **自定义递归实现**
   利用递归方法结合类型判断（如 Array、Date、RegExp）来实现深拷贝，同时使用 WeakMap 解决循环引用问题。
   推荐代码参考上面的第四部分代码。

3. **使用结构化克隆 API**
   当环境支持时，直接调用 `structuredClone` 是最简便、最健壮的解决方案。

4. **第三方库**
   如 Lodash 中的 `_.cloneDeep`，在需要兼容更多情况时也是不错的选择。

在实际项目中，选择哪种方法要视你需要拷贝的数据类型及性能要求而定。对于大部分常规场景，自定义的递归实现已经足够，而在支持的环境中使用 structuredClone 则是最推荐的方式。

---

## 参考

- citeturn0search0 MDN 关于 structuredClone 的文档
- citeturn0search2 Stack Overflow 关于深拷贝的讨论
- citeturn0search6 GreatFrontend 上的深拷贝面试题解析

通过以上示例代码和讲解，相信你已经可以根据实际需求逐步完善和定制你的深拷贝函数了。希望这篇详尽的讲解对你理解和实现 JavaScript 深拷贝有所帮助。
