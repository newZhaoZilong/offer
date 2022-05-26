
/**
 * 发布订阅
 * 1.需要有一个存储状态的对象
 * 2.需要有个发布方法pub，发送数据,参数
 * 3.需要有一个订阅方法sub，拿到数据后执行
 */

class PubSub{
    store = {};
    /**
     * 参数为key，和对应的数据data
     * 从store中拿到对应的回掉函数执行
     */
    pub(key,data){
        if(!this.store[key])return;
        this.store[key].forEach(callback => {
            callback && callback(data);
        });
    }
    /**
     * 将回掉函数存储到store中
     * @param {*} key 事件名称
     * @param {*} callBack 回掉函数
     */
    sub(key,callBack){
        if(!this.store[key]){
            this.store[key] = [];
        }
        this.store[key].push(callBack);
    }
}