//weakMap的key只能是对象，weakMap是弱引用，只要其他对象的引用被删除，垃圾回收机制就会释放该对象占用的内存
function deepCopy(value, hash = new WeakMap()) {
    //如果是正则对象，就创建新的正则对象
    if (value instanceof RegExp) return new RegExp(value);
    //如果是日期对象，就创建新的日期对象
    if (value instanceof Date) return new Date(value);
    //如果是基本数据类型，就直接返回
    if (value === null || value !== "object") return value;
    //如果当前value已经copy过一次了，就直接返回上次的结果，这样可以处理循环引用的copy
    if (hash.has(value)) {
        return hash.get(value);
    }
    //获取value原型对象上的constructor，就是构造函数，创建一个新的对象
    //这样可以直接使用原型对象上的方法，比如Array
    let f = value.constructor;
    let newValue = new f();
    //将当前value作为key，newValue作为值，保存到WeakMap里
    hash.set(value, newValue);
    for (let key in value) {
        //for in 循环会获取value原型对象上的key，所以需要判断一下是不是当前对象的key
        if (value.hasOwnProperty(key)) {
            newValue[key] = deepCopy(value[key]);
        }
    }
    return newValue;
}


