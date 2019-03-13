# nginx
## 安装
通过 brow 安装，也就是 管理也是通过 brow管理

[参考](https://blog.csdn.net/yqh19880321/article/details/70478827)

    通过[`brow`](https://brew.sh/index_zh-cn)安装;(brow是macOS 缺失的软件包的管理器)
    sudo brew install nginx

## 启动

1. 普通启动

   终端中输入：
   `sudo brew services start nginx`

   访问localhost:8080，说明成功安装和启动好了

2. 启动配置文件（mac）

   复制路径可以用 Option+Command+C [参考](https://www.zhihu.com/question/22883229)

3. nginx -s reload  # 重启





## 停止

 brew方式：`sudo brew services stop nginx`

  1. 终端输入：`ps -ef|grep nginx` 找到 `nginx`的进程号 （假设进程号为 15800，master进程）
  2. kill 进程
    kill -QUIT  15800 (从容的停止，即不会立刻停止)
    Kill -TERM  15800 （立刻停止）
    Kill -INT  15800  （和上面一样，也是立刻停止）

  3. 第二步 可能会报错` Operation not permitted`
    切换到`root`权限；`sudo -i`



## 配置
配置路径 `vim /usr/local/etc/nginx/nginx.conf`
vim 语法



# nginx 进阶

[【小哥哥, 跨域要不要了解下】NGINX 反向代理](https://juejin.im/post/5c0e6d606fb9a049f66bf246)

## 配置

[nginx服务器简单配置文件路径](https://blog.csdn.net/haoaiqian/article/details/78961998)

```node
# 默认配置
./nginx.conf 目录
默认配置文件     ./nginx.conf 配置中  include servers/*;
```

