# 常用命令

### linux 常用命令

```linux
lsof -i:3008
 kill 13679
 sudo -i ## 切换root
 
 ssh jackcaoyi@relay.sys.xisaojukeji.com -p25000
 sudo -i -u xiaoju
 dssh engine-hydra-svr00.ys
 
```



### pm2常用命令



```node
pm2 stop 2 3 4 5
pm2 list
```



### git 常用命令

```git
git checkout
git stash  //删除本地修改
```



### linux日志查看

[inux tail命令及其它日志查看命令的用法](https://www.cnblogs.com/xiong63/p/9071915.html)

#### 1.tail——实时查看最后几行

```linux
tail -f  app-out.log ## 实时查看
参数： 
tail [ -f ] [ -c Number | -n Number | -m Number | -b Number | -k Number ] [ File ] 
参数解释： 
-f 该参数用于监视File文件增长。 
-c Number 从 Number 字节位置读取指定文件 
-n Number 从 Number 行位置读取指定文件。 
-m Number 从 Number 多字节字符位置读取指定文件，比方你的文件假设包括中文字，假设指定-c参数，可能导致截断，但使用-m则会避免该问题。 
-b Number 从 Number 表示的512字节块位置读取指定文件。 
-k Number 从 Number 表示的1KB块位置读取指定文件。 
File 指定操作的目标文件名称 
上述命令中，都涉及到number，假设不指定，默认显示10行。Number前面可使用正负号，表示该偏移从顶部还是从尾部開始计算。 
tail可运行文件一般在/usr/bin/以下。

```

例子：

```linux
1、tail -f filename  
说明：监视filename文件的尾部内容（默认10行，相当于增加参数 -n 10），刷新显示在屏幕上。退出，按下CTRL+C。  

2、tail -n 20 filename  
说明：显示filename最后20行。  

3、tail -r -n 10 filename  
说明：逆序显示filename最后10行。
```



#### 2. head

```linux
head 仅仅显示前面几行  

head -n 10  test.log   查询日志文件中的头10行日志;  

head -n -10  test.log   查询日志文件除了最后10行的其他所有日志; 
```



#### 3. grep——正则匹配查找

```linux
grep [options]  
主要参数:  
[options]主要参数：  
－c：只输出匹配行的计数。  
－I：不区分大 小写(只适用于单字符)。  
－h：查询多文件时不显示文件名。  
－l：查询多文件时只输出包含匹配字符的文件名。  
－n：显示匹配行及 行号。  
－s：不显示不存在或无匹配文本的错误信息。  
－v：显示不包含匹配文本的所有行。  
pattern正则表达式主要参数：  
： 忽略正则表达式中特殊字符的原有含义。  
^：匹配正则表达式的开始行。  
$: 匹配正则表达式的结束行。  
<：从匹配正则表达 式的行开始。  
>：到匹配正则表达式的行结束。  
[ ]：单个字符，如[A]即A符合要求 。  
[ - ]：范围，如[A-Z]，即A、B、C一直到Z都符合要求 。  
。：所有的单个字符。  
 - ：有字符，长度可以为0。
```



#### 4. cat——一次查多个文件

```linux
cat主要有三大功能：  
1.一次显示整个文件。$ cat filename  
2.从键盘创建一个文件。$ cat > filename   
  只能创建新文件,不能编辑已有文件.  
3.将几个文件合并为一个文件： $cat file1 file2 > file  

参数：  
-n 或 --number 由 1 开始对所有输出的行数编号  
-b 或 --number-nonblank 和 -n 相似，只不过对于空白行不编号  
-s 或 --squeeze-blank 当遇到有连续两行以上的空白行，就代换为一行的空白行  
-v 或 --show-nonprinting  
例：  
把 textfile1 的档案内容加上行号后输入 textfile2 这个档案里  
cat -n textfile1 > textfile2  

把 textfile1 和 textfile2 的档案内容加上行号（空白行不加）之后将内容附加到 textfile3 里。  
cat -b textfile1 textfile2 >> textfile3  

把test.txt文件扔进垃圾箱，赋空值test.txt  
cat /dev/null > /etc/test.txt   
注意：>意思是创建，>>是追加。千万不要弄混了。
```



#### 5. 混合使用

```
A.  tail web.2016-06-06.log -n 300 -f  
    查看底部即最新300条日志记录，并实时刷新      

B.  grep 'nick' | tail web.2016-04-04.log -C 10   
    查看字符‘nick’前后10条日志记录, 大写C  

C.  cat -n test.log |tail -n +92|head -n 20  
    tail -n +92表示查询92行之后的日志  
    head -n 20 则表示在前面的查询结果里再查前20条记录 
```

# iTerm2使用

[mac下oh-my-zsh的配置](https://zhuanlan.zhihu.com/p/26373052)





# sh命令

## 运行

标识

```shell
#!/bin/bash
```

执行

```shell
chmod +x ./test.sh  #使脚本具有执行权限
./test.sh  #执行脚本
```



## 常用功能

### 1. 参数

| 参数处理 | 说明                                                         |
| -------- | ------------------------------------------------------------ |
| $#       | 传递到脚本的参数个数                                         |
| $*       | 以一个单字符串显示所有向脚本传递的参数。 如"$*"用「"」括起来的情况、以"$1 $2 … $n"的形式输出所有参数。 |
| $$       | 脚本运行的当前进程ID号                                       |
| $!       | 后台运行的最后一个进程的ID号                                 |
| $@       | 与$*相同，但是使用时加引号，并在引号中返回每个参数。 如"$@"用「"」括起来的情况、以"$1" "$2" … "$n" 的形式输出所有参数。 |
| $-       | 显示Shell使用的当前选项，与[set命令](http://www.runoob.com/linux/linux-comm-set.html)功能相同。 |
| $?       | 显示最后命令的退出状态。0表示没有错误，其他任何值表明有错误。 |



### 2. 流程控制语句

```sh
if condition
then
    command1 
    command2
    ...
    commandN 
fi #注意这是if结束语句
```





## inux里source、sh、bash、./有什么区别

[inux里source、sh、bash、./有什么区别](https://www.cnblogs.com/pcat/p/5467188.html)



## 实践

### 1.执行详细信息

```sh
 set -x
```



```sh
echo_fail_info_and_exit() {
    if [ $? != 0 ]
    then:
        echo ${1}
        exit 1
    fi
}
bower install
echo_fail_info_and_exit "bower install fail!!!"
```



### 2. 异常处理



### 3. 抛错

#### syntax error near unexpected token `fi'错误

[参考](https://blog.csdn.net/sinat_37625790/article/details/76223607)

问题原因

​    在windows里,换行用的两个符号，回车\r，换行符号\n，在linux下是一个符号\n。

解决方法

​    在vi的底行模式下输入set fileformat=unix，然后保存退出就可以了。







# linux 命令

## 1.文件目录管理

[参考](http://www.runoob.com/linux/linux-file-content-manage.html)

- ls: 列出目录
- cd：切换目录
- pwd：显示目前的目录
- mkdir：创建一个新的目录
- rmdir：删除一个空的目录
- cp: 复制文件或目录
- rm: 移除文件或目录 rm -rf 
- mv: 移动文件与目录，或修改文件与目录的名称



## 2. 文本操作

### 撤销或重复改变

vi命令：

1      u                        撤销上一命令对编辑缓冲区的修改

2      U                        恢复当前行（即一次撤销对当前行的全部操作）

3      .点号                    重复上一命令对编辑缓冲区的修改



## 3. vi/vim



![img](/Users/didi/git/blog/server/assets/vim-vi-workmodel.png)





![img](/Users/didi/git/blog/server/assets/vi-vim-cheat-sheet-sch.gif)

### 常用功能

```sh
//关闭行号
：set nonumber

//开启行号
：set number
```

## 4. 用户切换

[root用户和user用户的相互切换](https://www.cnblogs.com/weiweiqiao99/archive/2010/11/10/1873761.html)

```sh
#从user用户切换到root用户
sudo su 
#从root用户切回user用户
su user (user是你自己安装时候的用户名)
直接输入exit，
也可Ctrl+D组合键推出
```



# 遇到问题复盘

## 1.pm2  status 时好时坏

Error: ENOENT: no such file or directory, uv_cwd

![image-20190121143424237](assets/image-20190121143424237-8052464.png)

```sh
pm2 logs --lines 1000  ## 打印pm2 日志
## 日志定位问题：Error: ENOENT: no such file or directory, uv_cwd
## 猜测应该是服务pm2 本身进程问题
ps ax | grep PM2  ## 找到pm2 进程
kill [进程id]  ## 杀掉进程

```



