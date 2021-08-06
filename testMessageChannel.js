// let channel = new MessageChannel();
//
// let port1 = channel.port1;
// let port2 = channel.port2;
//
// port1.onmessage = (res)=>{
//     console.log(res);
// }
//
// port2.postMessage("haha");
setTimeout(()=>{
    console.log("lala");
},0);
setImmediate(()=>{
    console.log("haha");
});
for(let i = 0;i< 10000;i++){

}

