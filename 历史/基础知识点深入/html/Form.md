# 表单校验

## 原生

[MDN](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Forms/Data_form_validation)

当一个元素校验通过时：

- 该元素将可以通过 CSS 伪类 [`:valid`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:valid) 进行特殊的样式化；
- 如果用户尝试提交表单，如果没有其它的控制来阻止该操作（比如JavaScript即可阻止提交），那么该表单的数据会被提交。

如果一个元素未校验通过：

- 该元素将可以通过 CSS 伪类 [`:invalid`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:invalid) 进行列表的样式化；
- 如果用户尝试提交表单，浏览器会展示出错误消息，并停止表单的提交



## 第三方

[async-validator](https://www.npmjs.com/package/async-validator)  本质上是 校验数据是否满足

# FormData

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/Using_FormData_Objects)

[http://blog.nicksite.me/index.php/archives/414.html](http://blog.nicksite.me/index.php/archives/414.html)

可以异步上传二进制文件

> 可以在ajax使用

```
var formData = new FormData();

formData.append("username", "Groucho");
formData.append("accountnum", 123456); //数字123456会被立即转换成字符串 "123456"

// HTML 文件类型input，由用户选择
formData.append("userfile", fileInputElement.files[0]);

// JavaScript file-like 对象
var content = '<a id="a"><b id="b">hey!</b></a>'; // 新文件的正文...
var blob = new Blob([content], { type: "text/xml"});

formData.append("webmasterfile", blob);

var request = new XMLHttpRequest();
request.open("POST", "http://foo.com/submitform.php");
request.send(formData);
```

这个例子既有`File`，还有`Blob` 类型文件，利用`FormData` 能轻松的进行异步上传。

## 1. 通过HTML表单创建FormData对象





# URLSearchParams

处理 URL 的查询字符串

[`URLSearchParams.get()`](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams/get)



# 四种常见的 POST 提交数据方式

[四种常见的 POST 提交数据方式](https://imququ.com/post/four-ways-to-post-data-in-http.html)

## 1. application/x-www-form-urlencoded——浏览器原生(不是ajax)

原生<form>表单，如果不设置 `enctype`属性，那么最终就会以 application/x-www-form-urlencoded 方式提交数据

ajax的会通过数据类型 自己判断



## 2. multipart/form-data—— 上传必须

> 我们使用表单上传文件时，必须让 <form> 表单的 `enctype` 等于 multipart/form-data。



## 3. application/json

