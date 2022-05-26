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

console.log(render(template, data));


function render(template, data) {
    const reg = /\{\{(.+?)\}\}/; // 模板字符串正则
    if (reg.test(template)) { // 判断模板里是否有模板字符串
        const name = reg.exec(template)[1].trim(); // 查找当前模板里第一个模板字符串的字段
        let f = new Function('data', `return data.${name}`);
        let value = f(data);
        template = template.replace(reg, value); // 将第一个模板字符串渲染
        return render(template, data); // 递归的渲染并返回渲染后的结构
    }
    return template; // 如果模板没有模板字符串直接返回
}

// console.log(render(template,data));
///\{\{((?:.|\n)+?)\}\}/g
const reg = /\{\{(.+?)\}\}/; // 模板字符串正则
// let res = reg.test(template);
// console.log(reg.exec(template));
