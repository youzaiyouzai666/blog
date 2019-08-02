# 介绍

![无标题的笔记本 (assets/无标题的笔记本 (1)-2.jpg)-2](../../../Downloads/无标题的笔记本 (1)-2.jpg)

[w3c](https://www.w3.org/TR/file-upload/)

[通过 File API 使用 JavaScript 读取文件](https://www.html5rocks.com/zh/tutorials/file/dndfiles/)

[文件对象详解](https://juejin.im/post/5b32fb5cf265da598223df9e)

> 使用 File API 在向服务器发送图片的过程中创建图片的缩略图预览，或者允许应用程序在用户离线时保存文件引用



# 文件访问接口

1. `File` - 独立文件；提供只读信息，例如名称、文件大小、mimetype 和对文件句柄的引用。
2. `FileList` - `File` 对象的类数组序列（考虑 `<input type="file" multiple>` 或者从桌面拖动目录或文件）。
3. `Blob` - 可将文件分割为字节范围。



# 读取文件

[`FileReader`](http://dev.w3.org/2006/webapi/FileAPI/#filereader-interface) 接口用来读取文件——**异步**

- `FileReader.readAsBinaryString(Blob|File)` - `result` 属性将包含二进制字符串形式的 file/blob 数据。每个字节均由一个 [0..255] 范围内的整数表示。
- `FileReader.readAsText(Blob|File, opt_encoding)` - `result` 属性将包含文本字符串形式的 file/blob 数据。该字符串在默认情况下采用“UTF-8”编码。使用可选编码参数可指定其他格式。
- `FileReader.readAsDataURL(Blob|File)` - `result` 属性将包含编码为[数据网址](http://en.wikipedia.org/wiki/Data_URI_scheme)的 file/blob 数据。
- `FileReader.readAsArrayBuffer(Blob|File)` - `result` 属性将包含 [ArrayBuffer](https://www.khronos.org/registry/typedarray/specs/latest/#5) 对象形式的 file/blob 数据。



可使用 `onloadstart`、`onprogress`、`onload`、`onabort`、`onerror` 和 `onloadend` 跟踪其进度。



# Base64的编码与解码

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowBase64/Base64_encoding_and_decoding)

>  使得二进制数据在解释成 radix-64 的表现形式后能够用 ASCII 字符串的格式表示出来

- [`atob()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowBase64/atob)  解码
- [`btoa()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowBase64/btoa) 编码

```javascript
btoa('我是中文');//报错
//Uncaught DOMException: Failed to execute ‘btoa’ on ‘Window’: The string to be encoded contains characters outside of the Latin1 range.(…)
```

```javascript

console.log(btoa(unescape(encodeURIComponent('我是中文'))));//5oiR5piv5Lit5paH
console.log(decodeURIComponent(escape(atob('5oiR5piv5Lit5paH'))));//我是中文
```



