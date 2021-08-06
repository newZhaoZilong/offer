class SPromise {
    constructor(executer) {
        this.state = "pending";
        this.value = null;
        this.reason = null;
        this.onResolvedList = [];
        this.onRejectedList = [];
        let resolve = (value) => {
            if (this.state === "pending") {
                this.state = "resolved";
                this.value = value;
                this.onResolvedList.forEach(fn => fn());
            }
        };

        let reject = (reason) => {
            if (this.state === "pending") {
                this.state = "rejected";
                this.reason = reason;
                this.onRejectedList.forEach(fn => fn());
            }
        };
        try {
            executer((res) => {
                //如果res是promise则等待res状态结束再执行resolve或者reject
                resolvePromise(res, resolve, reject);
            }, reject);
        } catch (err) {
            reject(err);
        }
    }

    then(onResolved, onRejected) {
        if (typeof onResolved !== "function") {
            onResolved = (value) => value;//这样可以传递value,这也是为什么能跳过catch方法的原因
        }

        if (typeof onRejected !== "function") {
            onRejected = (err) => {
                throw err;//这样能够传递err,这也是为什么能跳过then方法的原因
            }
        }
        //每个then函数都会返回一个新的promise对象
        return new SPromise((resolve, reject) => {
            if (this.state === "resolved") {
                setTimeout(() => {//使用setTimeout冒充微任务
                    try {
                        let res = onResolved(this.value);
                        //如果回掉函数返回结果是promise,则等待res状态结束再执行resolve或者reject
                        resolvePromise(res, resolve, reject);
                    } catch (err) {
                        reject(err);
                    }
                }, 0);
            }
            if (this.state === "rejected") {
                setTimeout(() => {
                    try {
                        let res = onRejected(this.value);
                        //如果回掉函数返回结果是promise,则等待res状态结束再执行resolve或者reject
                        resolvePromise(res, resolve, reject);
                    } catch (err) {
                        reject(err);
                    }
                }, 0);
            }
            //如果当前是pending状态，则现将回掉函数保存到队列里面，队列里其实最多只会有一个回掉函数
            if (this.state === "pending") {
                this.onResolvedList.push(() => {
                    setTimeout(() => {
                        try {
                            let res = onResolved(this.value);
                            resolvePromise(res, resolve, reject);
                        } catch (err) {
                            reject(err);
                        }
                    }, 0);
                });
                this.onRejectedList.push(() => {
                    setTimeout(() => {
                        try {
                            let res = onRejected(this.reason);
                            resolvePromise(res, resolve, reject);
                        } catch (err) {
                            reject(err);
                        }
                    }, 0);
                });
            }
        });
    }

    catch(onRejected) {
        this.then(null, onRejected);
    }
}

//这个方法主要判断如果p是promise，那就在p的promise pending状态结束后执行resolve和reject方法
function resolvePromise(p, resolve, reject) {
    try {
        if (p instanceof SPromise) {
            p.then((res) => {
                resolvePromise(res, resolve, reject);
            }, reject);
        } else {
            resolve(p);
        }
    } catch (err) {
        reject(err);
    }
}


SPromise.all = function (arr) {
    return new SPromise((resolve, reject) => {
        let resList = [];
        let count = 0;
        arr.forEach((p) => {
            p.then((res) => {
                resList[count] = res;
                count++;
                if (count === arr.length) {
                    resolve(resList);
                }
            }, (err) => {
                reject(err);
            });
        });
    });
};

