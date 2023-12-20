# 基本

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Submitting_forms_and_uploading_files)

[你真的会使用XMLHttpRequest吗？](https://segmentfault.com/a/1190000004322487)

## 1.content-type 类型判断

`xhr.send(data)`中data参数的数据类型会影响请求头部`content-type`的默认值：

- 如果`data`是 `Document` 类型，同时也是`HTML Document`类型，则`content-type`默认值为`text/html;charset=UTF-8`;否则为`application/xml;charset=UTF-8`；
- 如果`data`是 `DOMString` 类型，`content-type`默认值为`text/plain;charset=UTF-8`；
- 如果`data`是 `FormData` 类型，`content-type`默认值为`multipart/form-data; boundary=[xxx]`
- 如果`data`是其他类型，则不会设置`content-type`的默认值

