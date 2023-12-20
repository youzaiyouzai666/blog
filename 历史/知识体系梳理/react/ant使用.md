# ANT 使用梳理

## Form

[参考](http://tech.dianwoda.com/2018/03/22/ant-form/)

主要讲[Ant Design Form](https://ant.design/components/form-cn/)组件使用中碰到的问题（onChange）

1. 是一个Form高阶组件，[HOC](https://reactjs.org/docs/higher-order-components.html)官方文档已经说了很详细了，简单说下，`HOC`是设计模式中`装饰模式`的一个实践，在不改变原有的用途上进行组件增强。

2. 让被包装的组件具备表单功能，其中的表单组件具备数据双向绑定，以及一些校验等一系列功能。



####  表单双向绑定

通过 “value” 属性实现 Model => View 的数据流，通过绑定 “ onChange” Handler 实现 View => Model 的数据流

[手把手教你为 React 添加双向数据绑定（一）](https://juejin.im/post/59f2e9b16fb9a04529360146)



#### 表单校验

[demo](http://09x.ant.design/components/validation/) 对于 onBlur与onChange 结合做法



## Upload 

```react
 <Upload
          action={config.UPLOAD}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          beforeUpload={beforeUpload}
          name="filecontent" //后端上传是参数名
          data={data} 
          withCredentials={true}
          headers={{
            "X-Requested-With": null
          }}
        >
          {fileList.length >= 5 ? null : uploadButton}
        </Upload>
```



```react
/**
   * 这里有点坑，注意Upload 中的onChange方法会被调用多次
   * 并且file有多个状态，'uploading''done''error'
   * 上传只有当'done'状态才有response，为后端返回数据接口
   */
  handleChange = ({file, fileList}) => {
    if(file.status ==='uploading'){
      // this.setState({ fileList });
    }
    if(file.status ==='done'){
      if(file.response.ErrNo != 0){
        fileList.pop()
        this.setState({fileList});
        message.error("上传失败");
      }
    }
    if(file.status ==='error'){
      fileList.pop()
      this.setState({fileList});
      message.error("上传失败");
    }
    this.setState({ fileList });
  };
```







## 遇到bug

#### 1. 因没有`Form.create()`而一直报错

具体问题是一直报`undefinde`,但猜测可能是哪里引入出错，但排查了好久（根本就没有想到需要使用`Form.create()`）

该bug暴露出：

1. 对react 受控组件理解不够深入
2. 学习一个新东西，不能沉下心来，一步一步的来

以后如何避免？





# 动态表单

[Hello, Ant Design Form](https://zhuanlan.zhihu.com/p/39725689)

[UForm](https://zhuanlan.zhihu.com/p/62927004)