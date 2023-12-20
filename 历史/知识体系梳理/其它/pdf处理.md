# pad 渲染

[参考](https://segmentfault.com/a/1190000016963084)

**实现方式一**
使用`embed`标记来使用浏览器自带的pdf工具。

这种实现方式优缺点都很明显：
优点：自带“打印”，“搜索”，“翻页”等功能，强大且实现方便。
缺点：不同浏览器的pdf工具样式不一，且无法满足个性化需求，比如：禁止打印，下载等。

**实现方式二**
使用Mozilla的`PDF.js`，自定义展示PDF。

> 下面我们就细致讲述一下使用`PDF.js`过程中遇到的问题。主要包括：

- 基础功能集成
- 使用`Text-Layers`渲染

# react处理

https://github.com/mikecousins/react-pdf-js





# 盖章

https://blog.csdn.net/qq_38188485/article/details/104452542