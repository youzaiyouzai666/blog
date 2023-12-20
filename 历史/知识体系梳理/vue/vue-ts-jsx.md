# 安装使用typescript

参考： [ vscode中开发vue的最佳实践](https://github.com/coppyC/blog/issues/1#t4)

##  1. 安装

[vue cli3.0](https://cli.vuejs.org/zh/) 直接选择 ts选型



## 2. vue写ts的风格

### 原风格

```typescript
// 仅支持在vue文件中写
export default {
  data() {
    return {
      //....
    }
  },
  methods: {
    //....
  }
}
```

### 使用 `Vue.extend`

```typescript
// 可以在非 .vue 文件获得友好提示
export default Vue.extend({
  data() {
    return {
      //....
    }
  },
  methods: {
    //....
  }
}）
```

### 使用类风格

类风格并不是ts版本特有的，es6开始就有类语法了,
只不过在ts中对类的支持更强大罢了。

```typescript
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component(
  compoments: { /** .... */ }
)
export default class extends Vue {
  x = 1
  y = 'string'

  @Prop() msg!: string

  changeX() {
    this.x = 2
  }
}
```

#### 1. 类风格一般使用装饰器语法

[**vue-property-decorator**](https://github.com/kaorun343/vue-property-decorator)



## 3. 问题

1. 在template中代码提示有问题



# vue + jsx

## 安装 使用

参考：[GIT](https://github.com/vuejs/jsx)





# vue + ts + jsx

参考：[在Vue.js中编写JSX（TypeScript + TSX](https://mae.chab.in/archives/60260)

## 遇到坑

1. 最好写``lang="tsx"`` 而不是 ``lang="ts"``
2. 在配置好ts后，无需再单独配jsx





# vue  + vuex

参考：[git](https://github.com/qidaizhe11/vue-vuex-typescript-demo)

