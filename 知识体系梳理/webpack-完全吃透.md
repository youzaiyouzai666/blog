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

> 核心参考: [官方文档-编写一个loader](https://webpack.docschina.org/contribute/writing-a-loader/#%E7%AE%80%E5%8D%95-simple-)
>
> 为什么，已经有个这个文档，还要在这里写？因为 文档虽然比较全，但感觉有点乱。自己尝试在大神的基础上，再进行整理。（站在巨人肩膀上）

#### 1. 本地开发方法

​	本地开发，主要是解决`Webpack` 能找到自定义的loader

1. 使用绝对地址

   node [path.resolve()](http://nodejs.cn/api/path.html#path_path_resolve_paths)——核心是从右往左，直到构造完成一个绝对路径 （以‘/’开头的是绝对地址）

   ```javas
   module.exports = {
     //...
     module: {
       rules: [
         {
           test: /\.js$/,
           use: [
             {
               loader: path.resolve('path/to/loader.js'),
               options: {/* ... */}
             }
           ]
         }
       ]
     }
   };
   ```

2. 多个loaders，则使用`resolveLoader.modules `

3. 独立的loader包，则 [`npm link`](https://docs.npmjs.com/cli/link) 

   总之，一般都使用 `npm link`,最终一般都是以`npm`包的形式进行引用

### 3. 自定义plugin

### 4.总结

1. webpack4 尝试0配置来，那么默认配置是 [默认配置](https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsDefaulter.js)



## 项目优化

