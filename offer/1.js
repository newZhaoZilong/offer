
// function Dog(){
//     return {
//         name:"shan"
//     };
// }
// function myNew(fun){
//     let obj = {};
//     fun.apply
// }
// let dog = myNew(Dog);
// console.log(dog);

let a = {
    name:"shan"
}
function run(params){
    console.log(this.name,params);
}

run.call(a,1);