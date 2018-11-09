# mock使用

[官方文档](http://mockjs.com/)

mock.js 是一个随机生成数据，且拦截ajax

## 随机数据生成规则

[文档](https://github.com/nuysoft/Mock/wiki/Syntax-Specification#%E6%95%B0%E6%8D%AE%E6%A8%A1%E6%9D%BF%E5%AE%9A%E4%B9%89%E8%A7%84%E8%8C%83-dtd)

### 1. 数据模板定义规范

```javascript
//数据模板中的每个属性由 3 部分构成：属性名、生成规则、属性值
// 属性名   name
// 生成规则 rule
// 属性值   value
'name|rule': value
```

生成规则

 有 7 种格式：

1. `'name|min-max': value`
2. `'name|count': value`
3. `'name|min-max.dmin-dmax': value`
4. `'name|min-max.dcount': value`
5. `'name|count.dmin-dmax': value`
6. `'name|count.dcount': value`
7. `'name|+step': value`

生成规则主要是通过，属性值（value）类型来判断



### 2. 占位符使用

```javascript
Mock.mock({
    name: {
        first: '@FIRST',
        middle: '@FIRST',
        last: '@LAST',
        full: '@first @middle @last'
    }
})
// =>
{
    "name": {
        "first": "Charles",
        "middle": "Brenda",
        "last": "Lopez",
        "full": "Charles Brenda Lopez"
    }
}
```

