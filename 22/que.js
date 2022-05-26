// CODING
//     [] Implement deepCopy function for data with any type    
//     [] Implement EventListener class in using Publish-Subscribe Model
//     [] Implement Promise class
//     [] Implement LRU-Cache
//     []  (1) find the top K smallest element in a non-ordered array
//         (2) find the top K smallest pair in 2 ordered array
//         (3)find the topK smallest element in N non-ordered array

/**
 * 深拷贝
 */
function deepCopy(data,myMap = new WeakMap()){
    /**
     * 对于日期对象和正则对象做针对处理
     */
    if(data instanceof Date){
        return new Date(data.getTime);
    }
    if(data instanceof RegExp){
        return new RegExp(data);
    }

    /**
     * 如果是基本数据类型直接返回
     */
    if(typeof data !== 'object' || data === null){
        return data;
    }

    /**
     * 需要避免循环引用
     */
    if(myMap.has(data)){
        return;
    }

    myMap.set(data,true);

    /**
     * 创建新的实例
     */
    let f = data.contructor;
    let newData = new f();
    /**
     * 遍历将属性添加到新对象上
     */
    for(let key in data){
        /**
         * 去除一些原型对象上的属性
         */
        if(data.hasOwnProperty(key)){
            newData[key] = deepCopy(data[key]);
        }
    }
}
