import WebSocket from "ws";

const server = new WebSocket.Server({ port: 52547 });
const clients = new Map<string, WebSocket>();

server.on('connection', (socket, request) => {
    // request.headers.host 是客户端请求的 Host（即服务端的主机名和端口），不是客户端的 IP 和端口
    // 获取客户端的 IP 和端口可以通过 request.socket 获取
    const clientName = request.socket.remoteAddress + ":" + request.socket.remotePort;
    console.log(`【${clientName}】连接成功`);
    clients.set(clientName, socket);
    socket.on('message', (message) => {
        console.log(`【${clientName}】消息: ${message}`);
        clients.forEach((client) => {
            client.send(`【${clientName}】消息: ${message}`);
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

