
## git报超时错误解决方法
第一种方法:关闭SSl验证
在git bash输入

```
git config --global http.sslVerify "false"
git config --global https.sslVerify "false"
```

第二种方法:关闭全局代理
在git bash 输入
```
git config --global --unset http.proxy
git config --global --unset https.proxy
```