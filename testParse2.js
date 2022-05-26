const template = '嗨，{{ info.name.value }}您好，今天是星期 {{ day.value }}';

const data = {
    info: {
        name: {
            value: '张三'
        }
    },
    day: {
        value: '三'
    }
};

let res = render(template, data);

console.log(res);

function render(template, data) {
    //.代表任意字符，+表示至少一个，?表示尽可能少的匹配，就是非贪婪匹配
    //()表示分组,这样exec[1]就是第一个分组的内容
    let reg = /\{\{(.+?)\}\}/;
    //如果发现模版里有变量，就进行替换操作
    while (reg.test(template)) {
        //获取变量的名字，第一次是info.name.value
        let name = reg.exec(template)[1].trim();
        //通过Function方法创建一个函数，从data中获取info.name.value值
        //第一个参数是参数名，第二个参数是函数体
        //这样就创建了一个function(data){return data.info.name.value;}函数
        let f = new Function('data', `return data.${name}`);
        let value = f(data);//调用函数获取data.info.name.value的值
        template = template.replace(reg, value);//更新模版
    }
    return template;
}
