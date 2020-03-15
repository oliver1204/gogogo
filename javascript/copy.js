/**
 * 深拷贝：拷贝前和拷贝后没有任何的关系，即修改拷贝前的内容不会影响拷贝后的内容
 * 浅拷贝：修改拷贝前的内容，拷贝后的内容也会改变
 */

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

// ...运算符 一级拷贝是深拷贝，二级开始是浅拷贝

let a = [1, 2, 3]
let arr = [a]
let newArr = arr.slice()

newArr[0][0] = 100

console.log(newArr, arr)

let a = [1, 2, 3]
let a1 = a.slice()
a1[0] = 200

console.log(a, a1)
// slice 一维深拷贝，二维浅拷贝

// 深拷贝，用
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

// null 和 Function 没有被拷贝过来

// 实现深拷贝
function deepCopy (obj, hash = new WeakMap()) {
  if(obj == null) return obj // 如果为 null 或者 undefined 直接返回
  if(obj instanceof Date) return new Date(obj)
  if(obj instanceof RegExp) return new RegExp(obj)
  // 不是对象的普通值，函数等（函数是用来执行的，不需要深拷贝）
  if(typeof obj !== 'object') return obj
  if(hash.get(obj)) return hash.get(obj)
  // 是对象，可能是 [] 或者 {}
  let cloneObject = new obj.constructor;
  hash.set(obj, cloneObject)
  for(let key in obj) {
    if(obj.hasOwnProperty(key)) {
      cloneObject[key] = deepCopy(obj[key], hash)
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
obj.o = obj
let o = deepCopy(obj)
console.log(o, obj) 