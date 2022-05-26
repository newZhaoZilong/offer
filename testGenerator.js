// function promise1() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve('1');
//         }, 1000);
//     });
// }
//
// function promise2(value) {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve('value:' + value);
//         }, 1000);
//     });
// }
//
// function* readFile() {
//     const value = yield promise1();
//     const result = yield promise2(value);
//     return result;
// }
//
// let g = readFile();
// let val1 = g.next();
// let val2 = g.next();
//
// console.log(val1,val2);


function * run(res) {
    debugger;
    let a = 5;
    let val1 = yield 1;
    console.log(a);
    a = a + 1;
    debugger;
    let val2 = yield 2;
    console.log(a);
    debugger;
}

let g = run(3);
debugger
let a = g.next(5);
debugger
let b = g.next(6);
console.log(b);

g.next(7);
debugger
