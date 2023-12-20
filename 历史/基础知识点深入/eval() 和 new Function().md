[参考](https://www.jianshu.com/p/db7ec7b51933)

# new Function

```javascript
var f = new Function('x', 'y', 'return x+y'); 
f( 3, 4 )
```



## 1. 作用域

```JavaScript
var x = 'global'; 
function strictFunc(){
   var x = 'local';
   var f = new Function('return x');
   console.log( f() ); //global  全局作用域
} 
```



# eval()

```javascript
function f(code,x,y){
 return eval(code)
}
f('x+y',3,4)
```



## 1. 作用域

```javascript
 var x = 'global'; 
   function directEval(){
        var x = 'local';
        console.log( eval('x') ); // local 局部作用域
     // console.log( eval.call(null,'x') )
   } 
```

