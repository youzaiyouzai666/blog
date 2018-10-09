# webpack 完全吃透

> 从这方面来吃透 
>
>  	1. 运行机制
> 	2. 使用（具体如何使用）
> 	3. 一些实践技巧

## 1. 运行机制

### 1. 整体流程

### 2. Tapable

### 3. 输出结果分析

### 4.总结



## 2.  使用技巧

### 0.基本技巧

1. [模式](https://webpack.docschina.org/concepts/mode/)

```
 mode: 'production'
```

### 1. 性能优化

### 2. 自定义loader



#### 3. loader API



### 3. 自定义plugin

### 4.总结

1. webpack4 尝试0配置来，那么默认配置是 [默认配置](https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsDefaulter.js)

## 3. 难点梳理

### 1. 路径问题

> `webpack` 使用 [enhanced-resolve](https://github.com/webpack/enhanced-resolve) 来解析文件路径。


##### 0. 总起

`webpack` 中`resolve `与`resolveLoader` 是用来处理地址问题的

```javascript
module.exports = {
  //...
    resolve: {
        //...
    },
    resolveLoader:{
        //...
    }
};
```

路径分为：绝对地址，相对地址，模块地址，loader路径

##### 1. 绝对路径

直接拿来用就OK了，但一般都是用`node` `path.resolve() `来得到绝对地址

##### 2. 相对路径

相对路径，必须知道参考地址。当前文件所在目录。

#####  3. 模块路径

```javascript
import 'module';
import 'module/lib/file';
```

规则：

1. 找路径，模块将在 [`resolve.modules`](https://webpack.docschina.org/configuration/resolve/#resolve-modules) 中指定的所有目录内搜索。（注意，可能使用[`resolve.alias`](https://webpack.docschina.org/configuration/resolve/#resolve-alias) 配置选项来创建一个别名)

2. 找到路径后，

   ```javascript
   //简单伪代码（核心目的是，找到唯一确定的地址。但其中地址有简写，默认设置）
   if(是文件){
       if(路径具有文件扩展名){
          //直接文件打包
       }else{
   	   //将使用 [resolve.extensions] 选项作为文件扩展名来解析
           // resolve.extensions 自动解析确定的扩展 ,默认值 ['.wasm', '.mjs', '.js', '.json']
       }
   }else if(是目录){
       if(包含package.json 文件 &&  package.json 文件中的 main 字段返回一个有效路径){
           //按照顺序查找 resolve.mainFields 配置选项中指定的字段。并且 package.json 中的第一个这样的字段确定文件路径
           //resolve.mainFields 此选项将决定在 package.json 中使用哪个字段导入模块。根据 webpack 配置中指定的 target 不同，默认值也会有所不同。 一般是main 
       }else{
           //则按照顺序查找 resolve.mainFiles 配置选项中指定的文件名，看是否能在 import/require 目录下匹配到一个存在的文件名。
           //resolve.mainFiles 解析目录时要使用的文件名。默认： ['index']
       }
   }
   ```

规则补充：

1.  [`resolve.modules`](https://webpack.docschina.org/configuration/resolve/#resolve-modules) 默认值`['node_modules']`,也就是说，找模块路径默认是 从 `node_modules`中找。
2. [ `resolve.extensions`](https://webpack.docschina.org/configuration/resolve/#resolve-extensions) 自动解析确定的扩展 ,默认值 `['.wasm', '.mjs', '.js', '.json']`
3. [`resolve.mainFields`](https://webpack.docschina.org/configuration/resolve/#resolve-mainfields) 此选项将决定在 `package.json` 中使用哪个字段导入模块。根据 webpack 配置中指定的 [`target`](https://webpack.docschina.org/concepts/targets) 不同，默认值也会有所不同。 一般是`main`
4. [`resolve.mainFiles`](https://webpack.docschina.org/configuration/resolve/#resolve-mainfields) 解析目录时要使用的文件名。默认： `['index']`

##### 4. 解析Loader

1. Loader解析 完全遵守上面3个规则。
2. 但增加了一个 [`resolveLoader`](https://webpack.docschina.org/configuration/resolve/#resolveloader) 配置选项可以用来为 Loader 提供独立的解析规则。 

这组选项与上面的 `resolve` 对象的属性集合相同，但仅用于解析 webpack 的 [loader](https://webpack.docschina.org/concepts/loaders) 包。默认： 

```javascript
module.exports = {
  //...
  resolveLoader: {
    modules: [ 'node_modules' ],
    extensions: [ '.js', '.json' ],
    mainFields: [ 'loader', 'main' ]
  }，
  resolve：{//...}
};
//也就是说，resolveLoader 完全是一个新的resolve
```

##### 5. 缓存

1. 如何缓存？

   每个文件都会被缓存

2. 缓存失效机制？

   ```javascript
   //伪代码
   if(观察模式){
       //只有修改过的文件会从缓存中摘出
   }else{
       //不会自动清理缓存
       //所以，每次编译前都的清理缓存
   }
   ```

   