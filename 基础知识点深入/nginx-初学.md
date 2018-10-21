# nginx
## 安装
[参考](https://blog.csdn.net/yqh19880321/article/details/70478827)

    通过[`brow`](https://brew.sh/index_zh-cn)安装;(brow是macOS 缺失的软件包的管理器)


## 启动
终端中输入：
`ps -ef|grep nginx`

访问localhost:8080，说明成功安装和启动好了


## 停止
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