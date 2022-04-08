https://www.npmjs.cn/



# 常用命令

## bin

> 它是一个命令名和本地文件名的映射
>
> 在安装时，如果是全局安装，npm将会使用符号链接把这些文件链接到prefix/bin(mac 安装在npm -g bin路径下)，
>
> 如果是本地安装，会链接到./node_modules/.bin/。

文件的头部必须有这个`#!/usr/bin/env node`节点， 否则脚本将在没有节点可执行文件的情况下启动。

# nrm

https://github.com/Pana/nrm

管理多个包

#error

1. ```swift
   ERR! code E401
   ```

npm login

## linux 跑 npm run start

> nohup npm run start  > /dev/null 2>&1 &



# 配置

```cat ~/.npmrc```

```
--registry=http://npm.intra.xiaojukeji.com
--registry=http://registry.npm.xiaojukeji.com
```



# npm提交

```npm
npm publish
```





# PM依赖包版本号~和^的区别及最佳实践

https://blog.csdn.net/u014291497/article/details/70148468

- ~会匹配最近的小版本依赖包，比如~1.2.3会匹配所有1.2.x版本，但是不包括1.3.0
- ^会匹配最新的大版本依赖包，比如^1.2.3会匹配所有1.x.x的包，包括1.3.0，但是不包括2.0.0



# package.json

[官方文档](https://docs.npmjs.com/files/package.json)

[CLI commands](https://docs.npmjs.com/cli-documentation/cli)

## 1. dependencies vs devdependencies

> 具体分为：
>
> 1. [devDependencies](https://docs.npmjs.com/files/package.json)
>
> 2. [peerDependencies](https://docs.npmjs.com/files/package.json)
> 3. [bundledDependencies§](https://docs.npmjs.com/files/package.json)
>
> 4. [optionalDependencies§](https://docs.npmjs.com/files/package.json)

### 使用yarn

[参考](https://yarn.bootcss.com/docs/cli/add/)

##### `yarn add <package...>`

This will install one or more packages in your [`dependencies`](https://yarn.bootcss.com/docs/dependency-types/).

##### `yarn add <package...> [--dev/-D]`

Using `--dev` or `-D` will install one or more packages in your [`devDependencies`](https://yarn.bootcss.com/docs/dependency-types/).

### dependencies

```node
npm install -S or npm install --save //注意`-S`是大写
```

###[devDependencies](https://docs.npmjs.com/files/package.json#devDependencies)

```node 
-D: --save-de
```



# [npm-config](https://docs.npmjs.com/misc/config.html)

```node
-S: --save
-P: --save-prod
-D: --save-dev
```



# [npm-install](https://docs.npmjs.com/cli/install.html)

```node 
npm install (with no args, in package dir)
npm install [<@scope>/]<name>
npm install [<@scope>/]<name>@<tag>
npm install [<@scope>/]<name>@<version>
npm install [<@scope>/]<name>@<version range>
npm install <git-host>:<git-user>/<repo-name>
npm install <git repo url>
npm install <tarball file>
npm install <tarball url>
npm install <folder>

alias: npm i
common options: [-P|--save-prod|-D|--save-dev|-O|--save-optional] [-E|--save-exact] [-B|--save-bundle] [--no-save] [--dry-run]
```



- `-P, --save-prod`: Package will appear in your `dependencies`. This is the default unless `-D` or `-O` are present.
- `-D, --save-dev`: Package will appear in your `devDependencies`.
- `-O, --save-optional`: Package will appear in your `optionalDependencies`.
- `--no-save`: Prevents saving to `dependencies`.

# [npm-init](https://docs.npmjs.com/cli/init.html)

```node 
npm init -y
```





# [npm-link](https://docs.npmjs.com/cli/link.html)

被链接到全局，路径是`{prefix}/lib/node_modules/<package>`

`npm config get prefix`命令获取到prefix的值(

