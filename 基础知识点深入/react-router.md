# react-router

参考：[[译] 关于 React Router 4 的一切](https://juejin.im/post/5995a2506fb9a0249975a1a4)

最好的文档是 [官方文档](https://reacttraining.com/react-router),虽然看不懂，但连蒙带猜，还是能看懂一点的

[心中无路由，处处皆自由/react-router v4 动态路由](https://github.com/wayou/wayou.github.io/issues/16)

##基本使用[Basic Components](https://reacttraining.com/web/guides/basic-components)

1. 根节点(Routers)

   [Router](https://reacttraining.com/web/api/Router)  

​       HashRouter

​       BrowserRouter

​	[<Switch>](https://reacttraining.com/web/api/Switch) ——只匹配一个



1. Route 

   通过`path`匹配路由，可以多个

2. Switch

   路由选择

   ```react
   import { Switch, Route } from 'react-router'
   
   <Switch>
     <Route exact path="/" component={Home}/>
     <Route path="/about" component={About}/>
     <Route path="/:user" component={User}/>
     <Route component={NoMatch}/>
   </Switch>
   ```

3. js  跳转

   [react-router v4 使用 history 控制路由跳转](https://github.com/brickspert/blog/issues/3)





### 1.Matching

 `<Route>` and `<Switch>`. exact

```react
//  {/* when none of the above match, <NoMatch> will be rendered */}
<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/contact" component={Contact} />
  {/* when none of the above match, <NoMatch> will be rendered */}
  <Route component={NoMatch} />
</Switch>
```



### 2. props



### 3. navigation





### 4. demo

```react
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const App = () => (
  <div>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/topics" component={Topics} />
      <Route exact render={(props) => <h1 {...props}> all</h1>} />
    </Switch>
  </div>
);

const Home = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;
const Topic = ({ match }) => <h3>Requested Param: {match.params.id}</h3>;
const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>

    <ul>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.path}/:id`} component={Topic} />
    <Route exact path={match.path} render={(props) => <h3> ...props Please select a topic.</h3>} />
  </div>
);
const Header = () => (
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/about">About</Link>
    </li>
    <li>
      <Link to="/topics">Topics</Link>
    </li>
  </ul>
);

export default App;

```



## 异步加载（动态加载）

[【翻译】基于 Create React App路由4.0的异步组件加载](https://segmentfault.com/a/1190000010067597)

[React-Router动态路由设计最佳实践](https://segmentfault.com/a/1190000011765141)

[React中的async/await生命周期函数](





