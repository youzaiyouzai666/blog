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

