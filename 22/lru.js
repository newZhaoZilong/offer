/**
 * lru缓存
 * 最近用过的可以保存下来，
 * 最近没用过的先删除掉
 * 1.需要一个最大缓存尺寸
 * 2.需要一种数据结构，双联表+哈希，可以借助js map先进先出的特性实现
 */

class LRUCache{
    size = 0
    myMap = new Map();
    /**
     * 初始化的时候需要传入尺寸
     * @param {*} size 
     */
    constructor(size){
        this.size = size;
    }
    /**
     * 参数为一个key和一个data
     * 1.设置值
     * 2.如果缓存超了，删除没怎么用的值
     */
    set(key,data){
        if(this.myMap.has(key)){
            this.myMap.delete(key);    
        }
        this.myMap.set(key,data);
        //因为myMap是先进先出，所以最先进的应该被删除，就是基本没用过
        if(this.myMap.size() > this.size){
            this.myMap.delete(this.myMap.keys.next().value);
        }
    }

    /**
     * 获取值的时候，把该值插入到队列尾部
     * @param {*} key 
     */
    get(key){
        let val = this.myMap.get(key);
        this.myMap.delete(key);
        this.myMap.set(key,val);
        return val;
    }
}
