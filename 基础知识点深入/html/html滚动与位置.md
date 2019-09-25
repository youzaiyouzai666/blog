# 滚动高度

[搞清clientHeight、offsetHeight、scrollHeight、offsetTop、scrollTop](https://imweb.io/topic/57c5409e808fd2fb204eef52)

### 1.height 高度问题

```javascript
var heightTop = document.documentElement.scrollTop || document.body.scrollTop; // 整个页面高度
```

- `clientHeight`: 内部可视区域大小。

  > returns the inner height of an element in pixels, including padding but not the horizontal scrollbar height, border, or margin

- `offsetHeight`：整个可视区域大小，包括border和scrollbar在内。

  > is a measurement which includes the element borders, the element vertical padding, the element horizontal scrollbar (if present, if rendered) and the element CSS height.

- `scrollHeight`：元素内容的高度，包括溢出部分。

  > is a measurement of the height of an element’s content including content not visible on the screen due to overflow




在Chrome浏览器中:

`document.documentElement.offsetHeight === document.documentElement.scrollHeight`

![img](assets/无标题的笔记本-2.jpg)

### 2. top问题

- `scrollTop`：元素内容向上滚动了多少像素，如果没有滚动则为0。

  > the number of pixels that the content of an element is scrolled upward.
  
- `offsetTop`: 当前元素顶部距离最近父元素顶部的距离,和有没有滚动条没有关系。单位px，只读元素。 

![image-20190802210911105](assets/image-20190802210911105.png)

![image-20190802210946933](assets/image-20190802210946933.png)

## document.documentElement与document.body

- document代表的是整个文档(对于一个网页来说包括整个网页结构)，document.documentElement是整个文档节点树的根节点，在网页中即html标签；
- document.body是整个文档DOM节点树里的body节点，网页中即为body标签元素。