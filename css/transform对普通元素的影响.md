参考：[张金旭](https://www.zhangxinxu.com/wordpress/2015/05/css3-transform-affect/)

### transform限制absolute的100%宽度大小

> 以前，我们设置`absolute`元素宽度100%, 则都会参照第一个非`static`值的`position`祖先元素计算，没有就`window`. 现在，诸位，需要把`transform`也考虑在内了。