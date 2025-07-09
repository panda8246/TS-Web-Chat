import WebSocket from "ws";
import readline from 'readline';

const socket = new WebSocket('ws://localhost:52547');
let clientname = undefined;

socket.on('open', () => {
    console.log('连接成功');
});

socket.on('message', (message) => {
    if (!clientname) {
        clientname = message.toString();
        createReadLine();
    } else {
        handleMsg(message.toString());
        flush();
    }
});

socket.on('close', () => {
    console.log('连接关闭');
});


function createReadLine() {
    // 创建 readline 接口，用于从终端获取输入
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: `您的ID【${clientname}】请输入消息> `
    });
    rl.on('line', (input: string) => {
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(input);
        } else {
            console.log('WebSocket 未连接，无法发送消息');
        }
    });
}

function handleMsg(msg: string) {
    
}

function flush() {

}

