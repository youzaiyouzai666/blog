# 基本使用

参考： [pm2从入门到精通](htps://www.kancloud.cn/daiji/pm2/395273)

## 日志管理

#### 显示日志管理命令

```
pm2 logs -h
```

#### 显示所有的应用程序的日志

```
pm2 logs
```

#### 仅仅显示api应用程序的日志

```
pm2 logs api
```

#### 显示1000行的应用程序日志

```
pm2 logs big-api --lines 1000
```

#### 显示json格式的日志

```
pm2 logs --json
```

#### 查看转换时间格式的日志

```
pm2 logs --format
```

#### 刷新日志

```
pm2 flush
```

#### 重载所有日志

```
pm2 reloadLogs
```

#### 启动时日志配置

```
pm2 start echo.js --merge-logs --log-date-format="YYYY-MM-DD HH:mm Z"
```

或者

```
{
  "script"          : "echo.js",
  "error_file"      : "err.log",
  "out_file"        : "out.log",
  "merge_logs"      : true,
  "log_date_format" : "YYYY-MM-DD HH:mm Z"
}
```

#### 关闭日志

```
使用 --merge-logs 参数关闭 文件输出日志
```

或者

```
{
  "out_file": "/dev/null",
  "error_file": "/dev/null"
}
```