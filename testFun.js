

let data = {
    name:"shan"
}
let f = new Function('data',`return data.name`);

let res = f(data);
console.log(res);
