//对象深拷贝，要涉及data和reg

let aaa = {

    time:new Date(),
    reg:new RegExp("^\\d+"),
    age:18,
    name:"haha",
    info:{
        color:"red"
    }
};

function deepCopy(oldValue) {
    if(oldValue instanceof Date)return new Date(oldValue);
    if(oldValue instanceof RegExp)return new RegExp(oldValue);
    if(typeof oldValue !== "object")return oldValue;
    let newValue = {};
    for(key in oldValue){
        newValue[key] = deepCopy(oldValue[key]);
    }
    return newValue;
}
let bbb = deepCopy(aaa);
console.log(JSON.stringify(bbb))
