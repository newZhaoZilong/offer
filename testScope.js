//创建father函数
let father = function () {
    //执行father函数
    let name = 'shan';
    //创建child函数
    let child = function () {
        //执行child函数
        let age = 18;
        console.log(name,age,lala);
    }
    child();
    console.log(name);
}
father();


