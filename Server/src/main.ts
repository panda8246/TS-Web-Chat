import { randomInt } from "crypto";
import WebSocket from "ws";

const server = new WebSocket.Server({ port: 52547 });
const clients = new Map<string, WebSocket>();

let nameList = ['牛', '马', '狗', '猴子', '广东双马尾', 'bro', '高斯林'];
let idx = 1;

server.on('connection', (socket, request) => {
    // request.headers.host 是客户端请求的 Host（即服务端的主机名和端口），不是客户端的 IP 和端口
    // 获取客户端的 IP 和端口可以通过 request.socket 获取
    let clientName = nameList[randomInt(0, nameList.length - 1)];
    if (clients.has(clientName)) {
        clientName += `(${idx})`;
    }
    console.log(`【${clientName}】连接成功`);
    clients.set(clientName, socket);
    // 发送客户端名称
    socket.send(clientName);
    idx++;
    socket.on('message', (message) => {
        console.log(`【${clientName}】消息: ${message}`);
        clients.forEach((client) => {
            client.send(`【${clientName}】: ${message}`);
        });
    });

    socket.on('close', () => {
        console.log(`【${clientName}】断开连接`);
        clients.delete(clientName);
    });

    socket.on('error', (error) => {
        console.log(`【${clientName}】错误: ${error}`);
        clients.delete(clientName);
        socket.close();
    });
});

