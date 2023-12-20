# js 异常
## Script error.
由于浏览器的安全限制，跨域脚本出现的报错默认是无法被捕获的，报错信息为：“Script error.”，解决方案是在:
[解决](https://sentry.io/answers/script-error/)

```
<script>标签上加上crossorigin（需确保资源响应头设置了CORS，否则会导致资源加载失败），注意：这个方案在Safari下无效，只能通过将JS内联到HTML文档里来解决，详细了解。
```


```
<script src="" crossorigin="anonymous"></script>
Access-Control-Allow-Origin: *
```

## Vue、React等框架已捕获的异常如何上报
大部分框架会提供异常捕获，当你配置以后异常不会throw出来，而本插件只会默认监听error、unhandledrejection，这种情况你可以在对应插件的捕获函数中调用sendError方法进行上报：
```
const sendError = new AES({...}).use(AESPluginJSError).sendError;

// React
class ErrorBoundary extends React.Component {
  ...
  componentDidCatch(error, info) {
    sendError(error);
  }
  ...
}

// Vue
app.config.errorHandler = (err, instance, info) => {
  sendError(err);
}
```
## React 错误处理
[React 错误处理：最佳实践](https://juejin.cn/post/7207058392287576123?from=search-suggest)



