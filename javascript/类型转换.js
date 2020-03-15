/**
 * js 中的类型转换规则
 */

 /**
  * if(){}
  * 
  * 判断条件为false的有： false, null, undefined, '', 0, NaN, !非false值，
  */

  /**
   * 运算 + - * /
   */
  console.log((1/'a')); // NaN

  /**
   * 1)数字和非字符串相加
   */
  console.log(1 + true); // 2
  console.log(1 + null); // 1
  console.log(1 + undefined); // NaN
  console.log(1 + {}); // 1[object Object]

  /**
   * 非数字相加
   */
  console.log(true + true); // 2
  console.log(true + {}); // true[object Object]

  // 对象中有两个方法 valueOf toString
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
  
  // 默认情况下 valueOf 返回的是非原始类型的数据
  // 如果 valueOf 返回的是原始类型的数据，那么直接返回 valueOf 的值，否则返回 toString() 方法的值

  // + 可以把字符串转化成 number类型
  console.log(typeof + '111');

  console.log(1 + +'111'); // 112

  // 比较运算

  console.log('a' < 'bbb'); // true
  console.log('a' < 111); 
  console.log(1 < '111'); // true

  console.log(undefined == 0); // false
  console.log(null == 0); // false
  console.log(null == null); // true
  console.log(undefined == undefined); // true
  console.log(NaN == 0); // false

  console.log(true == 1); // false

  console.log({} == '[object Object]'); // false
  console.log([].toString() == '')