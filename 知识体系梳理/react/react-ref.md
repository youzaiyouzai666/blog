参考： [官方](https://zh-hans.reactjs.org/docs/forwarding-refs.html#forwarding-refs-to-dom-components)

[React ref 指北教程](https://juejin.im/post/5ab30cef6fb9a028b410f5c1)



## ref创建

### 1. 字符串定义

> 官方不推荐  不支持了

```javascript
// 在 render 函数里面
<input type="text" defaultValue="First" ref="first" />;

// 获取 ref
this.refs.first;
```

### 2. 使用回调函数

```
// 在 render 函数里面
<input
  type="text"
  defaultValue="Second"
  ref={input => (this.second = input)}
/>;

// 获取 ref
this.second;
复制代码
```

### 3. 使用 React.createRef()

> 在 react 16.3 中，您将能够使用新的 React.createref() 函数使 ref 创建变得更容易。

```
// 在 class 中声明
third = React.createRef();
// 或者在 constructor 中声明
this.third = React.createRef();

// 在 render 函数中:
<input type="text" defaultValue="Third" ref={this.third} />;

// 获取 ref
this.third.current;

// 获取 input 的 value 
this.third.current.value;
```



## HOC中传递——透传

> 高阶组件 ref中，只能拿到外层的容器组件，不能拿到包裹的组件



### 1. 官方推荐——React.forwardRef

```react
function logProps(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }

    render() {
      const {forwardedRef, ...rest} = this.props;

      // 将自定义的 prop 属性 “forwardedRef” 定义为 ref
      return <Component ref={forwardedRef} {...rest} />;
    }
  }

  // 注意 React.forwardRef 回调的第二个参数 “ref”。
  // 我们可以将其作为常规 prop 属性传递给 LogProps，例如 “forwardedRef”
  // 然后它就可以被挂载到被 LogPros 包裹的子组件上。
  return React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardedRef={ref} />;
  });
}
```



## 