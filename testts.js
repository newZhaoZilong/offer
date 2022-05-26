const { port1, port2 } = new MessageChannel();
port1.onmessage = function (event) {
  console.log('收到来自port2的消息：', event.data); // 收到来自port2的消息： pong
};
port2.onmessage = function (event) {
  console.log('收到来自port1的消息：', event.data); // 收到来自port1的消息： ping
  port2.postMessage('pong');
};
port1.postMessage('ping');
console.log('haha');
Promise.resolve().then((res)=>{
    console.log('promise');
});
setTimeout(()=>{
    console.log('setTimeout');
},0);