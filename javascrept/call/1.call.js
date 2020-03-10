// eg: 1
function fn() {
  console.log(this, arguments)
}

// fn.call() // Window

/**
 * call 的特点
 * 1. 改变this指向，默认指向Window
 * 2. 并让当前函数执行
 */

// fn.call('hello') // hello
fn.call('hello', 1, 2, 3) // hello, 1, 2, 3

// eg: 2
function fn1() {
  console.log(1)
}

function fn2() {
  console.log(2)
}

fn1.call(fn2) // 1
fn1.call.call.call.call(fn2) // 2