class TPromise {
    constructor(executer) {
        this.state = "pending";
        this.value = undefined;
        this.reason = undefined;
        this.resolvedList = [];
        this.rejectedList = [];
        let resolve = (value) => {
            if (this.state === "pending") {
                this.state = "resolved";
                this.value = value;
                this.resolvedList.forEach(fn => fn());
            }
        };
        let reject = (reason) => {
            if (this.state === "pendiing") {
                this.state = "rejected";
                this.reason = reason;
                this.rejectedList.forEach(fn => fn());
            }
        }
        try {
            executer(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }

    then(onResolved, onRejected) {
        if (typeof onResolved !== "function") {
            onResolved = (value) => value;//这样可以将then的结果传递下去
        }
        if (typeof onRejected !== "function") {
            onRejected = (err) => {
                throw err
            };//这样可以将then的结果传递下去
        }

        return new TPromise((resolve, reject) => {
            if (this.state === "resolved") {
                setTimeout(() => {
                    try {
                        let res = onResolved(this.value);
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
                        resolvePromise(res, resolve, reject);
                    } catch (err) {
                        reject(err);
                    }
                }, 0);
            }
            if (this.state === "pending") {
                this.resolvedList.forEach(() => {
                    setTimeout(() => {
                        try {
                            let res = onResolved(this.value);
                            resolvePromise(res, resolve, reject);
                        } catch (err) {
                            reject(err);
                        }
                    }, 0);
                });
                this.rejectedList.forEach(() => {
                    setTimeout(() => {
                        try {
                            let res = onRejected(this.value);
                            resolvePromise(res, resolve, reject);
                        } catch (err) {
                            reject(err);
                        }
                    }, 0);
                });
            }
        });
    },
    catch(onRejected){
        this.then(null,onRejected);
    }
}

function resolvePromise(res, resolve, reject) {
    try {
        if (res instanceof TPromise) {
            res.then((result) => {
                resolvePromise(result, resolve, reject);
            }, reject);
        } else {
            resolve(res);
        }
    } catch (err) {
        reject(err);
    }
}
TPromise.prototype.finally = function (callback) {
    let P = this.constructor;
    return this.then((value)=>{
        return P.resolve(callback()).then(()=>value);
    },(reason)=>{
        return P.resolve(callback()).then(()=>{throw reason});
    });
}
