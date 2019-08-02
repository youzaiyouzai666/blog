# 滚动高度

```javascript
var heightTop = document.documentElement.scrollTop || document.body.scrollTop; // 整个页面高度
```

- `clientHeight`: 内部可视区域大小。

  > returns the inner height of an element in pixels, including padding but not the horizontal scrollbar height, border, or margin

- `offsetHeight`：整个可视区域大小，包括border和scrollbar在内。

  > is a measurement which includes the element borders, the element vertical padding, the element horizontal scrollbar (if present, if rendered) and the element CSS height.

- `scrollHeight`：元素内容的高度，包括溢出部分。

  > is a measurement of the height of an element’s content including content not visible on the screen due to overflow

- `scrollTop`：元素内容向上滚动了多少像素，如果没有滚动则为0。

  > the number of pixels that the content of an element is scrolled upward.