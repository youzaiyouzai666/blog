参考：

[HTML5 drag & drop 拖拽与拖放简介](https://www.zhangxinxu.com/wordpress/2011/02/html5-drag-drop-%e6%8b%96%e6%8b%bd%e4%b8%8e%e6%8b%96%e6%94%be%e7%ae%80%e4%bb%8b/)

# 基础

1. **DataTransfer** 对象：退拽对象用来传递的媒介，使用一般为Event.dataTransfer。

2. draggable

    

   属性：就是标签元素要设置draggable=true，否则不会有效果，例如：

   ```
   <div title="拖拽我" draggable="true">列表1</div>
   ```

3. **ondragstart** 事件：当拖拽元素开始被拖拽的时候触发的事件，此事件作用在被拖曳元素上

4. **ondragenter** 事件：当拖曳元素进入目标元素的时候触发的事件，此事件作用在目标元素上

5. **ondragover** 事件：拖拽元素在目标元素上移动的时候触发的事件，此事件作用在目标元素上

6. **ondrop** 事件：被拖拽的元素在目标元素上同时鼠标放开触发的事件，此事件作用在目标元素上

7. **ondragend** 事件：当拖拽完成后触发的事件，此事件作用在被拖曳元素上

8. **Event.preventDefault()** 方法：阻止默认的些事件方法等执行。在ondragover中一定要执行preventDefault()，否则ondrop事件不会被触发。另外，如果是从其他应用软件或是文件中拖东西进来，尤其是图片的时候，默认的动作是显示这个图片或是相关信息，并不是真的执行drop。此时需要用用document的ondragover事件把它直接干掉。

9. **Event.effectAllowed** 属性：就是拖拽的效果。