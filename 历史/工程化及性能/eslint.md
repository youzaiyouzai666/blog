# 简介

[官方](http://cn.eslint.org/docs/about/)

eslint 内置一些规则，也可以自定义规则

# 常用

## 1. eslint  自动修复

```node
node_modules/.bin/eslint  --ext .js,.vue  --fix 'file'    //自动修复，默认只修复.js,
```

## 2. vscode 自动格式化

- 1、在vscode添加 eslint 插件
- 2、在vscode添加 vetur 插件
- 3、修改你的setting.json

```json
"eslint.autoFixOnSave": true,
"eslint.validate": [
    "javascript",{
        "language": "vue",
        "autoFix": true
    },"html",
    "vue"
],
```

# 配置

## 1. 如何配置

http://cn.eslint.org/docs/user-guide/configuring

 [`.eslintrc.*`](http://cn.eslint.org/docs/user-guide/configuring#configuration-file-formats) 文件



```
// eslint-disable-line
// eslint-disable
```



## 2. 内置默认配置

```json
 //在配置文件中，使用,则开启一些常用规则
"extends": "eslint:recommended"
```

[具体规则](http://cn.eslint.org/docs/rules/)



## 3. 配置参数

- **Environments** - 指定脚本的运行环境。每种环境都有一组特定的预定义全局变量。
- **Globals** - 脚本在执行期间访问的额外的全局变量。
- **Rules** - 启用的规则及其各自的错误级别。
- Plugins - 第三方插件

```javascript
rules: {
    "规则名": [规则值, 规则配置]
}
```

规则值：

```
"off"或者0    //关闭规则关闭
"warn"或者1    //在打开的规则作为警告（不影响退出代码）
"error"或者2    //把规则作为一个错误（退出代码触发时为1）
```



```
/* eslint eqeqeq: "off", curly: "error" */ 
--eqeqeq 规则被关闭，curly 规则被打开，定义为错误级别。
```





# **eslint-plugin-vue**

[GIT](https://github.com/vuejs/eslint-plugin-vue)