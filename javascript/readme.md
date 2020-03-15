## 0.1 + 0.2 != 0.3 

首先计算机中的计算都是在计算机内转成2进制后，进行计算的。

例如：10进制的11 转换成2进制：`11.toString(2) = 1011`;
其的过程是一个➗2，取余数的过程;

但是小数部分转成2进制，不一样，这是一个 乘以 2 得到整数的过程

例如：

```js
0.1 * 2 = 0.2 // 0
0.2 * 2 = 0.4 // 0 
0.4 * 2 = 0.8 // 0
0.8 * 2 = 0.6 // 1
0.6 * 2 = 0.2 // 1
0.2 * 2 = 0.4 // 0
……

```

开始循环下去了，所以 10 进制的 0.1 转成 2 进制后是：`0.0001100110011001100110011001100110011001100110011001101`，

同理， 10 进制的 0.2 转成 2 进制后是：`0.001100110011001100110011001100110011001100110011001101`，

二者相加后：`0.0100110011001100110011001100110011001100110011001101` 转成 10 进制后是 `0.30000000000000004`

## js 中的类型转换规则

### if 判断条件

判断条件为false的有： false, null, undefined, '', 0, NaN, !非false值

### 运算符：+ - * /
例如：

```js
console.log((1/'a')); // NaN
```

#### 数字和非字符串相加
```js
  console.log(1 + true); // 2
  console.log(1 + null); // 1
  console.log(1 + undefined); // NaN
  console.log(1 + {}); // 1[object Object]
```

#### 非数字相加

```js
  console.log(true + true); // 2
  console.log(true + {}); // true[object Object]
```

对象中有两个方法 valueOf toString

```js
let obj = {
    [Symbol.toPrimitive]() {
      return 500
    },
    valueOf() {
      // return 100
      return {}
    },
    toString() {
      return 200
    }
  }
  console.log(true + obj); // 101 return 100
  console.log({}.valueOf()); // {}
  console.log(true + obj); // 201 return {}
  console.log(true + obj); // 501 Symbol.toPrimitive
```

默认情况下 valueOf 返回的是非原始类型的数据, 如果 valueOf 返回的是原始类型的数据，那么直接返回 valueOf 的值，否则返回 toString() 方法的值

### + 可以把字符串转化成 number类型

```js
  console.log(typeof + '111');
  console.log(1 + +'111'); // 112
```

### 比较运算

```js
  console.log('a' < 'bbb'); // true
  console.log('a' < 111); // false
  console.log(1 < '111'); // true
```

在比较的时候，首先会将字母转换成ascii，然后比较；对于可以转换成数字的，转换成数字比较；不能转换成数字的，返回false。

```js
  console.log(undefined == 0); // false
  console.log(null == 0); // false
  console.log(null == null); // true
  console.log(undefined == undefined); // true
  console.log(NaN == 0); // false
```
undefined, null, 和其他类型比较，返回 false; NaN和其他类型(包括自己)比较，返回 false

```js
console.log(true == 1); // false
```
```js
console.log({} == '[object Object]'); // false
```

对象和数字、Symbol、字符串比较会把对象转化成 字符串类型

> 判断 `[] == ![]`?

答案是 true

首先！非运算符的优先级高于 == 运算符，所以 `[] == ![]`

1）[] == false
2) [].valueof() = [], [].toString() = '' -> '' == false
3) 0 == 0
4) true

## 深拷贝和浅拷贝什么区别？如何实现？

### 深拷贝和浅拷贝什么区别

深拷贝：拷贝前和拷贝后没有任何的关系，即修改拷贝前的内容不会影响拷贝后的内容;
浅拷贝：修改拷贝前的内容，拷贝后的内容也会改变

```js
let obj = {
  name: 'olifer',
  address: {
    x: 100,
    y:100
  }
}

let o = {...obj}
o.name = 'change'
o.address.x = 200

console.log(obj, o)
```

ES6 ...运算符 一级拷贝是深拷贝，二级开始是浅拷贝

```js
et a = [1, 2, 3]
let arr = [a]
let newArr = arr.slice()

newArr[0][0] = 100

console.log(newArr, arr)

let a = [1, 2, 3]
let a1 = a.slice()
a1[0] = 200

console.log(a, a1)
```

slice 一维深拷贝，二维浅拷贝

```js
let obj = {
  name: 'olifer',
  address: {
    x: 100,
    y:100
  },
  fn: () => {},
  nu: null,
  un: undefined,
  date: new Date()
}

let o = JSON.parse(JSON.stringify(obj))
console.log(obj, o)
```
可以看到，用`JSON.parse` 转换时 null 和 Function 没有被拷贝过来。

### 实现深拷贝

```js
function deepCopy (obj) {
  if(obj == null) return obj // 如果为 null 或者 undefined 直接返回
  if(obj instanceof Date) return new Date(obj)
  if(obj instanceof RegExp) return new RegExp(obj)
  // 不是对象的普通值，函数等（函数是用来执行的，不需要深拷贝）
  if(typeof obj !== 'object') return obj
  
  // 是对象，可能是 [] 或者 {}
  let cloneObject = new obj.constructor;
  for(let key in obj) {
    if(obj.hasOwnProperty(key)) {
      cloneObject[key] = deepCopy(obj[key])
    }
  }
  return cloneObject
}
let obj = {
  name: 'olifer', 
  address: {
    x: 100,
    y:100
  }
}
let o = deepCopy(obj)
o.address.x = 200
console.log(o, obj) 

```
上面的代码基本上已经实现了深拷贝的基本功能，但是一旦出现循环引用的问题，如 `obj.o = obj`，就会出现 `aximum call stack size exceeded` 问题。为此我们利用ES6的WeakMap进行改造

```js
function deepCopy (obj, hash = new WeakMap()) {
  if(obj == null) return obj 
  if(obj instanceof Date) return new Date(obj)
  if(obj instanceof RegExp) return new RegExp(obj)
  if(typeof obj !== 'object') return obj
  // 如果已经存在，直接返回
  if(hash.get(obj)) return hash.get(obj)

  let cloneObject = new obj.constructor;
  hash.set(obj, cloneObject)
  for(let key in obj) {
    if(obj.hasOwnProperty(key)) {
      cloneObject[key] = deepCopy(obj[key], hash)
    }
  }
  return cloneObject
}
```


## 原型 和 原型链的概念

原型：prototype 
原型链： __proto__

每一个函数都有一个prototype属性，每一个对象都有一个__proto__属性。

![image](http://chuantu.xyz/t6/724/1584283223x3752237043.png)

```js
class MyClass {

}
var x = new MyClass()
console.log(x.__proto__ === MyClass.prototype) // true
console.log(MyClass.prototype.constructor === MyClass) // true

```

再来看一个例子：

```js
console.log(Function.__proto__ === Function.prototype)
console.log(Object.__proto__ === Function.prototype)
console.log(Object.__proto__ === Function.__proto__)
```

我们发现结果都是true，所以 Object 是个可以看作函数的 对象

```js
function MyClass() {
  this.a = '111'
}

var x = new MyClass()
x.b = '222'

console.log(x.hasOwnProperty('a'))
console.log('b' in x)
```
`in` 关键词会判断这个属性是否属于原型或者实例上的属性，而 `hasOwnProperty` 只会判断是否属于原型上的属性

## 作用域

```js
function a () {
  b();
}

function b () {
  c();
}

function c () {
  console.log('1')
}
a()
```
函数在执行的时候又一个执行上下文的链，叫ECS.

```js
ECS = [
   globbalContext
 ];

 ECS.push(functionAContext)
 ECS.push(functionBContext)
 ECS.push(functionCContext)

 ECS.pop(); // c
 ECS.pop(); // b
 ECS.pop(); // a
```
ECS 是一个栈，先定义后销毁。

作用域在函数定义的时候就决定了，函数会保存一个内部属性[[scope]]，[[scope]] 上包含所有父级作用域，它在找的时候，会先在当前作用域下查找，如果找不到的话，再向上级作用域查找，直到找到全局对象为止。

```js
function a () {
  function b () {
    function c () {

    }
  }
}
```
其对应的[[scope]]内部存储规则是：
```js
a.[[scope]] = [
  globbalContext.VO
]
b.[[scope]] = [
  aContext.AO,
  globbalContext.VO
]
c.[[scope]] = [
  bContext.AO,
  aContext.AO,
  globbalContext.VO
]
```

```js
var a = 1;
function sum() {
  var b = 2;
  return a + b
}
sum()
```
在函数定义的时候，会保存一个内部属性[[scope]]，即创建阶段：
```js
sum.[[scope]] = [
  globbalContext.VO
]
ECS = [
  globbalContext,
  a: 1,
  sumContext,
]
sumContext = {
  AO: {
    arguments: {
      length: 0
    },
    b: undefined
  },
  Scope: [AO, sum.[[scope]]]
}
```
代码执行阶段:
```js
AO: {
  arguments: {
    length: 0
  },
  b: 2
}
```

AO(action object)是函数执行前的一瞬间，生成一个AO对象（在函数执行前的一瞬间会生成自己的AO，如果函数执行2次，生成了两次AO，这两次的AO是没有任何关联）

VO: varible object 变量对象， VO 和 AO 其实是同一个对象，只是处在不同阶段而已，执行上下文的生命周期分为：创建阶段和代码执行阶段， 在创建阶段，会将 VO 变成 AO。

VO 中，只包含 var 和 function声明的，AO 除了 var 和 function声明的还有arguments，即 VO + arguments = AO

在函数执行前的一瞬间（创建阶段）：
第一步： 会生成一个AO（action object）对象
第二步： 分析参数，形参作为AO对象的属性名，实参作为AO对象的属性值
第三步： 分析函数声明，函数名作为AO对象的属性名，值为undefined，如果遇到同名的，直接覆盖
第四步： 分析var变量声明，变量名作为AO对象的属性名，值为undefined，如果遇到同名的，不去做任何改变

正因为按照这个顺序来的，所以函数声明在变量声明前。

>总结：
>函数在执行的时候有一个执行上下文的栈，叫ECS.
> * 函数内部保留一个[[scope]]，保存所有的父变量对象，
> * 而且在函数执行的时候，会把AO对象push进去，
> * 在函数执行过程中， 先找AO对象，找不到的话，向上查找，这就是所谓的作用域链