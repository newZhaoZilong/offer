
/**
 * 手写promise
 * 三种状态pending，resolved,reject
 * 
 */

class Promise{
    constructor(executor){
        this.state = "pending";
        this.resolveList = [];
        this.rejectedList = [];
        const resolve = (value)=>{
            this.state = "resolved";
            this.value = value;
            this.resolveList.forEach((callback)=>{
                callback && callback(this.value);
            });
        };
        const reject = (error)=>{
            this.state = "rejected";
            this.error = error;
            this.rejectedList.forEach((callback)=>{
                callback && callback(error);
            });
        }
        try{
            executor(resolve,reject);
        }catch(error){
            reject(error);
        }
    }
    then(onSuccess,onReject){
       
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
            if(this.state === "resolved"){
                let p = onSuccess(this.value);
                
                resolve();
            }
            if(this.state === "rejected"){
                onReject(this.error);
                reject();
            }
            if(this.state === "pending"){ 
                this.resolveList.push(onSuccess);
                this.rejectedList.push(onReject);
            }
        },0);
        });
    }

    catch(onReject){
        this.then(null,onReject);
    }
}