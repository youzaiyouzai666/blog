# ANT 使用梳理

## Form

[参考](http://tech.dianwoda.com/2018/03/22/ant-form/)

主要讲[Ant Design Form](https://ant.design/components/form-cn/)组件使用中碰到的问题（onChange）



## 遇到bug

#### 1. 因没有`Form.create()`而一直报错

具体问题是一直报`undefinde`,但猜测可能是哪里引入出错，但排查了好久（根本就没有想到需要使用`Form.create()`）

该bug暴露出：

1. 对react 受控组件理解不够深入
2. 学习一个新东西，不能沉下心来，一步一步的来

以后如何避免？