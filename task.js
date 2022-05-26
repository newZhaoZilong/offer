
async function run1(){
    console.log('run1');
    let b = await run2();
}

async function run2(){
    console.log('run2');
    return new Promise((resolve,reject)=>{
        resolve();
        console.log('run3');
    })
}

console.log("start");
run1();

console.log("end");