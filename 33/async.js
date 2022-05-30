// asyncpool(urls, limit, callback);
function fetch(url){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve(url);
        }, Math.random() * 1000);
    });
}

/**
 * 每次最多发送limit个请求
 * 1.每次执行limit个请求，所以请求执行完执行下一批请求
 * 遵循先进先出，从队列头部开始执行
 * 2.每批请求执行完执行对应的callback请求
 * @param {*} urls 
 * @param {*} limit 
 * @param {*} callback 
 */
function asyncpool(urls,limit,callback){
    let count = 0;//当前正在执行的请求数量
    /**
     * 循环器，负责执行任务
     */
    function loop(urls,limit,callback){
        
        while(count < limit && urls.length > 0){
            //从队列弹出一个url进行发送请求的操作
            let url = urls.shift();
            debugger;
            fetch(url).then((res)=>{
                count --;//请求结束后更新count，执行对应的callback
                callback && callback(res);
                loop(urls,limit,callback);
            })
            .catch((error)=>{
                count --;//请求结束后更新count，执行对应的callback
                callback && callback(error);
                loop(urls,limit,callback)
            });
            count ++;
        }
    }
    loop(urls,limit,callback);
}


let urls = [];
for(let i = 0;i<500;i++){
    urls.push(i);
};


asyncpool(urls,3,(res)=>{
    console.log(res);
})