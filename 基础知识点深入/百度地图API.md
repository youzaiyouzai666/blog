# 百度地图API

## 基本使用

### 创建地图

#### 1. 基本

<http://lbsyun.baidu.com/index.php?title=jspopular3.0/guide/show>

```html
<!DOCTYPE html>  
<html>  
<head>  
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />  
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />  
    <title>Baidu Map </title>  
    <style type="text/css">  
        html{height:100%}  
        body{height:100%;margin:0px;padding:0px}  
        #container{height:100%}  
    </style>  
</head>  
<body>
</body>  
</html>
```

```html
<script type="text/javascript" src="http://api.map.baidu.com/api?v=3.0&ak=您的密钥"></script>
```

```javascript
var map = new BMap.Map("container");          // 创建地图实例  
var point = new BMap.Point(116.404, 39.915);  // 创建点坐标  
map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别  
```



#### 2. 添加控件

> 控件 也就是在地图上面显示的浮层
>
> 分为：内置控件  自定义控件

<http://lbsyun.baidu.com/index.php?title=jspopular3.0/guide/widget>



#### 3.个性化地图

主要是对地图的配色等修改



### 在地图上绘制

<http://lbsyun.baidu.com/index.php?title=jspopular3.0/guide/mark>

#### 1. 标注

**点**

> 点可以添加图标
>
> 可以绑定事件
>
> 可拖拽

```javascript
var map = new BMap.Map("container");    
var point = new BMap.Point(116.404, 39.915);  //创建坐标点  
map.centerAndZoom(point, 15);    						//初始化地图，设置中心点坐标和地图级别
var marker = new BMap.Marker(point);        // 创建标注    
map.addOverlay(marker);                     // 将标注添加到地图中 
```



线

```javascript
var polyline = new BMap.Polyline([
    new BMap.Point(116.399, 39.910),
    new BMap.Point(116.405, 39.920)
    ],
    {strokeColor:"blue", strokeWeight:6, strokeOpacity:0.5}
    );
map.addOverlay(polyline);
```



### 事件

<http://lbsyun.baidu.com/index.php?title=jspopular3.0/guide/event>

<http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html>

![image-20190522144549031](assets/image-20190522144549031.png)



