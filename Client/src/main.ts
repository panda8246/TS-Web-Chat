import WebSocket from "ws";

const ws = new WebSocket('ws://localhost:52547');

ws.on('open', () => {
    console.log('连接成功');
});

ws.on('message', (message) => {
    console.log(`收到消息: ${message}`);
});

ws.on('close', () => {
    console.log('连接关闭');
});
