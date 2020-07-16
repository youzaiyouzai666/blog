使用Cmd+ Shift+ .在Finder中显示隐藏的文件



# path路径

加载顺序为:

```bash
/etc/profile   #系统级
/etc/paths      #系统级
~/.bash_profile  #~/.bash_profile文件存在，则后面的几个文件就会被忽略不读了，如果~/.bash_profile文件不存在，才会以此类推读取后面的文件。
~/.bash_login
~/.profile              # 个人电脑当前设置
~/.bashrc               #~/.bashrc没有上述规则，它是bash shell打开的时候载入的。
```



# bin

```sh
usr/bin   
usr/local/bin
```



