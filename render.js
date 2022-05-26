function _c(name){
    console.log("haha==>"+name);
}
function _v(name){
    console.log("haha==>"+name);
}

_c('div',
    [_c('span', [_v("hh")]),
    _v(" "),
    _c('child', [_v("\n          哈哈\n        ")])
    ], 1)