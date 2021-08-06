class SPromise {
    constructor(execute) {
        this.state = "pending";
        this.value = undefined;
        this.reason = undefined;
        this.resolvedList = [];
        this.rejectedList = [];
        let resolve = (value) => {
            if (this.state === "pending") {
                this.value = value;
                this.state = "resolved";
                this.resolvedList.forEach((fn) => fn());
            }
        }
        let reject = (reason) => {
            if (this.state === "pending") {
                this.reason = reason;
                this.state = "rejected";
                this.rejectedList.forEach((fn) => fn());
            }
        }

        try {
            execute(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }

    then(resolvedFn, rejectedFn) {
        if (typeof resolvedFn !== "function") {
            resolvedFn = (value) => value;//为什么返回value是因为这样可以跳过catch方法传递then的结果
        }
        if (typeof rejectedFn !== "function") {
            rejectedFn = err => {
                throw err
            };
        }

        return new SPromise((resolve, reject) => {
            //如果已经是resolved了，就执行resolved对应的回掉函数

            if (this.state === "resolved") {
                setTimeout(() => {
                    try {
                        let res = resolvedFn(this.value);
                        resolvePromise(res, resolve, reject);
                    } catch (err) {
                        reject(err);
                    }
                }, 0);
            }

            if (this.state === "rejected") {
                setTimeout(() => {
                    try {
                        let res = rejectedFn(this.reason);
                        resolvePromise(res, resolve, reject);
                    } catch (err) {
                        reject(err);
                    }
                }, 0);
            }

            if (this.state === "pending") {
                this.resolvedList.push(() => {
                    setTimeout(() => {
                        try {
                            let res = resolvedFn(this.value);
                            resolvePromise(res, resolve, reject);
                        } catch (err) {
                            reject(err);
                        }
                    }, 0);
                });
                this.rejectedList.push(() => {
                    setTimeout(() => {
                        try {
                            let res = rejectedFn(this.reason);
                            resolvePromise(res, resolve, reject);
                        } catch (err) {
                            reject(err);
                        }
                    }, 0);
                });
            }

        });
    }

    catch(rejectedFn) {
        this.then(null, rejectedFn);
    }
}

function resolvePromise(res, resolve, reject) {
    //说明then里面回掉函数返回了一个promise
    //需要等待promise结束后执行resolve
    if (res instanceof SPromise) {
        res.then((result) => {//如果result也是一个promise，就是resolve()里传了一个promise，需要等待result结束后执行resolve
            resolvePromise(result, resolve, reject);
        }, (err) => {
            reject(err);
        });
    } else {
        resolve(res);
    }
}

// SPromise.finally = function(callBack){
//     resolvePromise(this,callBack,callBack);
// }

let p = new SPromise((resolve, reject) => {

    setTimeout(() => {
        resolve("haha");
    }, 1000);
});

p.then((res) => {
    console.log(res);
    return "wocao"
})
console.log("lala");
let p1 = Promise.resolve(5);
p1.then((res)=>{
    debugger;
})

