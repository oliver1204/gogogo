console.log(typeof 1); // number
console.log(typeof '1'); // string
console.log(typeof true); // boolean
console.log(typeof undefined); // undefined
console.log(typeof null); // object, null 之所以为object，是因为 null 在转换成二进制的时候是00开头的，而浏览器把0认为是object

class MyClass {

}
var x = new MyClass()

console.log(x instanceof MyClass); // true

/**
 * 对象的Symbol.hasInstance属性，指向一个内部方法。当其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法。
 * 比如，foo instanceof Foo在语言内部，实际调用的是Foo[Symbol.hasInstance](foo)。
 * console.log(MyClass[Symbol.hasInstance](x));//true
 */

class MyClass2 {
  [Symbol.hasInstance](foo) {
    return foo instanceof Array;
  }

  static [Symbol.hasInstance](obj) {
    return Number(obj) % 2 === 0;
  }
}
var x = new MyClass2()
console.log([1, 2, 3] instanceof new MyClass2()); // true //我是调用的动态方法
console.log(x[Symbol.hasInstance]([0, 0, 0,]));//true //我是调用的动态方法
console.log(2 instanceof MyClass); //true 我是调用静态方法
console.log(MyClass2[Symbol.hasInstance](2));//true 我是调用了静态方法
console.log(x instanceof MyClass2); //false 因为修改了静态方法。x本身就是MyClass的实例，如果注释了静态方法就会返回true。


function MyClass() {
  this.a = '111'
}

var x = new MyClass()
x.b = '222'

console.log(x.hasOwnProperty('a'))
console.log('b' in x)