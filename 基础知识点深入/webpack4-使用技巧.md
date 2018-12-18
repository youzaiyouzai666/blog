



# Webpack 基本使用

> 本文需要您对webpack有个大概了解
>
> Webpack 本身复杂度有点高，真正要掌握，需要从多个维度来学习，本文主要是通过webpack配置维度来学习，以达到对其有个较全面的了解

## 0. 基本配置

[官方文档-选项,强烈推荐看一遍](https://webpack.docschina.org/configuration/#%E9%80%89%E9%A1%B9)

基本配置分为（主要）：

1. 入口

2. 输出

3. loader—如何解析资源（对资源进行转码）

4. plugins

   总结： 基本配置，熟悉了解这4方面就基本运行没问题了。别的方面，知道有哪些东西就ok，在用的时候查文档

## 1. 入口

## 2. 输出（output）

## 3.loader—如何解析资源（对资源进行转码）

参考：[官方](https://webpack.docschina.org/concepts/loaders/)



# 难点-容易出错

## 1. 路径问题

[Webpack中publicPath详解](https://juejin.im/post/5ae9ae5e518825672f19b094?utm_source=gold_browser_extension)

![image-20181217165345989](/Users/didi/git/blog/基础知识点深入/assets/image-20181217165345989-5036826.png)

### node 路径

- `__dirname`: 总是返回被执行的 js 所在文件夹的绝对路径
- `__filename`: 总是返回被执行的 js 的绝对路径
- `process.cwd()`: 总是返回运行 node 命令时所在的文件夹的绝对路径





### output 中 path vs publicPath

1. output.path

- 默认值：`process.cwd()`

2. Output.publicPath

   ```node
   静态资源最终访问路径 = output.publicPath + 资源loader或插件等配置路径
   ```


## 2. 持久化方案

[基于 webpack 的持久化缓存方案](https://github.com/pigcan/blog/issues/9)



hash
chunkhash
contenthash 
chunk id 的不稳定性





## 3. 代码分割

[官方](https://webpack.docschina.org/guides/code-splitting/)

### webpack4 默认方案

[SplitChunksPlugin](https://webpack.docschina.org/plugins/split-chunks-plugin/)

webpack will automatically split chunks based on these conditions:

- New chunk can be shared OR modules are from the `node_modules` folder
- New chunk would be bigger than 30kb (before min+gz)
- Maximum number of parallel requests when loading chunks on demand would be lower or equal to 5
- Maximum number of parallel requests at initial page load would be lower or equal to 3





# 性能

## 1. Dll vs CommonsChunkPlugin

[Webpack的dll功能](https://segmentfault.com/a/1190000005969643) 

 [官方](https://webpack.docschina.org/plugins/dll-plugin/)

### Dll

> dll 是一个新的独立的webpack打包过程，与一般`dev` `pro` 一样

#### 第一步, 使用`webpack.DllPlugin`创建Dll

```javascript
const webpack = require('webpack');

const vendors = [
  'antd',
  'isomorphic-fetch',
  'react',
  'react-dom',
  'react-redux',
  'react-router',
  'redux',
  'redux-promise-middleware',
  'redux-thunk',
  'superagent',
];

module.exports = {
  output: {
    path: 'build',
    filename: '[name].[chunkhash].js',
   library: '[name]_[chunkhash]',
  },
  entry: {
   vendor: vendors,
  },
  plugins: [
    new webpack.DllPlugin({
     path: 'manifest.json',
     name: '[name]_[chunkhash]',
     context: __dirname,
    }),
  ],
};
```

运行Webpack，会输出两个文件一个是打包好的vendor.js，一个就是manifest.json，长这样：

```javascript
{
  "name": "vendor_ac51ba426d4f259b8b18",
  "content": {
    "./node_modules/antd/dist/antd.js": 1,
    "./node_modules/react/react.js": 2,
    "./node_modules/react/lib/React.js": 3,
    "./node_modules/react/node_modules/object-assign/index.js": 4,
    "./node_modules/react/lib/ReactChildren.js": 5,
    "./node_modules/react/lib/PooledClass.js": 6,
    "./node_modules/react/lib/reactProdInvariant.js": 7,
    "./node_modules/fbjs/lib/invariant.js": 8,
    "./node_modules/react/lib/ReactElement.js": 9,
    
    ............
    
  }
```

#### 第二步， Dll use

```javascript
const webpack = require('webpack');

module.exports = {
  output: {
    path: 'build',
    filename: '[name].[chunkhash].js',
  },
  entry: {
    app: './src/index.js',
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./manifest.json'),
    }),
  ],
};
```



#### 原理

是第一步 将第三方库通过`webpack`打包，让其被webpack管理（产生chunck id等）

然后第二步，会在每次查找模块时，先找第一步是否生成打包过了



#### 问题——无法使用按需加载

> production 环境看情况使用 dll，dll 存在一个问题：dll 预先把不常改变的包，提前编译打包，但是对于按需加载的，比如 antd 可能只用到了几个组件，使用 dll 就会全部打入，不过 react 这样可以使用。