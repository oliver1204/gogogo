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

/**
 * 函数在执行的时候又一个执行上下文的链，叫ECS.
 ECS = [
   globbalContext
 ];

 ECS.push(functionAContext)
 ECS.push(functionBContext)
 ECS.push(functionCContext)

 ECS.pop(); // c
 ECS.pop(); // b
 ECS.pop(); // a
 * ECS 是一个栈，先定义后销毁。
 *  */

 /***
  * 作用域在函数定义的时候就决定了，
  * 函数会保存一个内部属性[[scope]]，
  * [[scope]] 上包含所有父级作用域，
  * 它在找的时候，会先在当前作用域下查找，
  * 如果找不到的话，再向上级作用域查找，
  * 知道找到全局对象为止
  */


function a () {
  function b () {
    function c () {

    }
  }
}

/**
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
 */

var a = 1;
function sum() {
  var b = 2;
  return a + b
}
sum()

/**
 * 在函数定义的时候，会保存一个内部属性[[scope]]，
 * 即创建阶段：
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
代码执行阶段:
AO: {
  arguments: {
    length: 0
  },
  b: 2
}

AO(action object)是函数执行前的一瞬间，生成一个AO对象（在函数执行前的一瞬间会生成自己的AO，如果函数执行2次，生成了两次AO，这两次的AO是没有任何关联）

* VO: varible object 变量对象， VO 和 AO 其实是同一个对象，只是处在不同阶段而已
* 执行上下文的生命周期分为：创建阶段和代码执行阶段， 在创建阶段，会将 VO 变成 AO
* VO 中，只包含 var 和 function声明的，  AO 除了 var 和 function声明的还有arguments
* 即 VO + arguments = AO
* 在函数执行前的一瞬间（创建阶段）：
第一步： 会生成一个AO（action object）对象
第二步： 分析参数，形参作为AO对象的属性名，实参作为AO对象的属性值
第三步： 分析函数声明，函数名作为AO对象的属性名，值为undefined，如果遇到同名的，直接覆盖
第四步： 分析var变量声明，变量名作为AO对象的属性名，值为undefined，如果遇到同名的，不去做任何改变

正因为按照这个顺序来的，所以函数声明在变量声明前。
 */

/**
 * 总结：
 * 函数在执行的时候有一个执行上下文的栈，叫ECS.
 * 函数内部保留一个[[scope]]，保存所有的父变量对象，
 * 而且在函数执行的时候，会把AO对象push进去，
 * 在函数执行过程中， 先找AO对象，找不到的话，向上查找，这就是所谓的作用域链
 */