import WebSocket from "ws";
import readline from 'readline';
import { ChatCache } from './ChatCache';

const socket = new WebSocket('ws://localhost:52547');
let clientname = undefined;
const chatCache = new ChatCache();
let rl: readline.Interface;

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
    rl.close();
    console.log('\n连接关闭');
    process.exit(0);
});


function createReadLine() {
    // 创建 readline 接口，用于从终端获取输入
    rl = readline.createInterface({
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
    chatCache.add(msg);
}

function flush() {
    const cursorPos = rl.cursor;
    // 清空控制台
    console.clear();
    // 打印缓存
    console.log(chatCache.getMsg(20).join('\n'));
    // 打印提示
    rl.prompt(true);
}

