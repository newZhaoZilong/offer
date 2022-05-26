


function longestCommonPrefix(strs) {
    if(strs.length === 0)return "";
    let min = strs[0].length;
    //获取最短字符串的长度
    for(let i = 1;i<strs.length;i++){
        if(strs[i].length < min){
            min = strs[i].length;
        }
    }
    let i;
    //遍历字符串，只要有不相同的，就跳出循环
    for(i = 0;i<min;i++){
        //获取第一个字符串的第i个字符，跟剩余的字符串进行比较
        let char = strs[0][i];
        for(let j = 1;j<strs.length;j++){
            if(char !== strs[j][i]){
                return strs[0].substring(0,i);
            }
        }
    }
    return "";
};
let strs = ["flower","flow","flight"];
let str = longestCommonPrefix(strs);

console.log(str);
