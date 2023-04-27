for (let i = 0; i < 10; i++) {
  if (i === 5) {
    break // 跳出整个循环
  }
  if (i === 3) {
    continue // 跳过本次循环
  }
}

// let i = 0;
// while (i < 10) {
//   if (i === 5) {
//     break; // 跳出整个循环
//   }
//   if (i === 3) {
//     i++; // 避免进入死循环
//     continue; // 跳过本次循环
//   }
//   i++;
// }

// let i = 0;
// do {
//   if (i === 5) {
//     break; // 跳出整个循环
//   }
//   if (i === 3) {
//     i++; // 避免进入死循环
//     continue; // 跳过本次循环
//   }
//   i++;
// } while (i < 10);

const arr = [1, 2, 3, 4, 5]
try {
  arr.forEach(function (num) {
    if (num === 3) {
      throw new Error('BreakException')
    }
    console.log(num) // 1, 2
  })
} catch (e) {
  if (e.message !== 'BreakException') throw e
}

// async function loop() {
//   for (let i = 0; i < 10; i++) {
//     await doSomething(i); // 等待 doSomething 函数执行完毕后再执行下一步
//   }
// }
// async function doSomething(i) {
//   // 模拟异步操作
//   return new Promise(resolve => {
//     setTimeout(() => {
//       console.log(i);
//       resolve();
//     }, 1000);
//   });
// }
// loop();

// function loop () {
//   let i = 0
//   function next () {
//     if (i < 10) {
//       doSomething(i).then(() => {
//         i++
//         next() // 在 Promise 的回调函数中递归调用 next 函数实现循环
//       })
//     }
//   }
//   next()
// }
// function doSomething (i) {
//   // 模拟异步操作
//   return new Promise(resolve => {
//     setTimeout(() => {
//       console.log(i)
//       resolve()
//     }, 1000)
//   })
// }
// loop()

function * loop () {
  for (let i = 0; i < 10; i++) {
    yield doSomething(i) // 使用 yield 暂停函数执行，并返回一个 Promise 对象
  }
}

function doSomething (i) {
  // 模拟异步操作
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(i)
      resolve()
    }, 1000)
  })
}

// 调用 loop 函数并迭代返回的 Generator 对象
const gen = loop()
function next () {
  const { value, done } = gen.next()
  if (done) {
    return
  }
  value.then(() => {
    next() // 在 Promise 的回调函数中递归调用 next 函数实现循环
  })
}
next()

// 利用setTimeout的第三个参数
for (var i = 1; i < 6; i++) {
  setTimeout(function fn (i) {
    console.log(i)
  }, i * 1000, i)
}
