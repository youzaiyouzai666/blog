# 快捷键

[Mac vscode快捷键](https://segmentfault.com/a/1190000012811886)

```node
Ctrl + - 后退
Ctrl + Shift + - 前进
```

## 插件

Comment Translate — 注释翻译

markdown 编辑器 markdown-editor

# 使用

## 'code .'命令

将Visual Studio Code 拖到应用

```bash
export PATH="\$PATH:/Applications/Visual Studio Code.app/Contents/Resources/app/bin"
```

## vscode更新时报错

https://www.codeleading.com/article/8909754860
Code-检查更新，居然提示不能在只读卷上升级：
Cannot update while running on a read-only volume. The application is on a read-only volume. Please move the application and try again. If you’re on macOS Sierra or later, you’ll need to move the application out of the Downloads directory. See this link for more information.

WTF?我明明是放在Application文件夹里面的啊。
然后一通搜，搜到解决方案：Code won’t update on macOS · Issue #7426 · Microsoft/vscode
简言之，运行如下两个命令即可：

```
sudo chown -R $USER ~/Library/Caches/com.microsoft.VSCode.ShipIt

xattr -dr com.apple.quarantine /Applications/Visual\ Studio\ Code.app
```

然后再次更新并重启VS Code，一切都清净了。
