// call 原理

Function.prototype.call = function(context) {
  context = context ? Object(context) : window
  context.fn = this

  let args = []

  for(let i = 1; i < arguments.length; i++) {
    args.push(`arguments[${i}]`)
  }

  // 利用数组的toString 方法

  let r = eval(`context.fn(${args})`)
  delete context.fn
  
  return r
}

function fn1() {
  console.log(1)
}

function fn2() {
  console.log(2)
}

// fn1.call(fn2) // 1
fn1.call.call.call.call(fn2) // 2
// 如果调用多个call，会让call执行，并且this指向fn2

