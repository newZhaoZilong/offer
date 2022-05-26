let aaa = [{
    name: '文本1',
    parent: null,
    id: 1,
}, {
    name: '文本2',
    id: 2,
    parent: 1
}, {
    name: '文本3',
    parent: 2,
    id: 3,
}];

function toTree(arr,parent = null){
    let list = [];
    arr.forEach((item)=>{
        if(item.parent === parent){
            let children = toTree(arr,parent = item.id);
            if(children.length !== 0){
                item.children = children;
            }
            list.push(item);
        }
    });
    return list;
}

console.log(JSON.stringify(toTree(aaa)));
