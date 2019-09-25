

#  基本语法

[教程](https://www.twle.cn/l/yufei/canvas/canvas-basic-index.html)

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Basic_usage)

## 1. 绘制矩形

```javascript
fillRect(x, y, width, height)
//绘制一个填充的矩形
strokeRect(x, y, width, height)
//绘制一个矩形的边框
clearRect(x, y, width, height)
//清除指定矩形区域，让清除部分完全透明。
```

[demo](https://codepen.io/pen/?editors=1010)

## 2. 绘制路径

| 方法            | 说明                                                         |
| --------------- | ------------------------------------------------------------ |
| ctx.beginPath() | 开始一个新路径的                                             |
| ctx.move(x,y)   | 将新路径的起始点移动到坐标 (x，y)                            |
| ctx.lineTo(x,y) | 使用直线连接子路径的终点到坐标(x，y)，并不会真正地绘制 为什么说是终点，如果不再继续调用 `lineTo()` 那么它就是终点了不是 |
| ctx.closePath() | 将画笔返回到当前子路径起始点                                 |
| ctx.stroke()    | 根据当前的画线样式，绘制当前或已经存在的路径                 |



## 3. Canvas 绘制文本





## 4. 绘制图像 drawImage()

[教程](https://www.twle.cn/l/yufei/canvas/canvas-basic-image-drawimage.html)

| 值      | 说明                                                         |
| ------- | ------------------------------------------------------------ |
| image   | 绘制到画板的图像资源，可以是任何的 canvas 图像源 ( CanvasImageSource)，例如：HTMLImageElement，HTMLVideoElement，或者 HTMLCanvasElement |
| dx      | 绘制图像时起点的 X 轴位置                                    |
| dy      | 绘制图像时起点的 Y 轴位置                                    |
| dWidth  | 在目标画布上绘制图像的宽度。 允许对绘制的图像进行缩放，如果不传递，绘制图像 如果不说明， 在绘制时图片宽度不会缩放 |
| dHeight | 在目标画布上绘制图像的高度。 允许对绘制的图像进行缩放。 如果不说明， 在绘制时图片高度不会缩放 |
| sx      | 截取图像时指定起点的 X 坐标                                  |
| sy      | 截取图像时指定起点的 Y 坐标                                  |
| sWidth  | 图像截取的高度                                               |
| sHeight | 图像截取的宽度                                               |





## 5. 变形

### 保存与恢复

> 坐标参考点 发生变化了(类似于 绝对坐标与相对坐标)

[`save()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/save)

[`restore()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/restore)





### 旋转

https://yi-jy.com/2015/06/10/canvas-rotate-origin/