一个学习项目，学习如何使用websocket创建聊天室，包含服务端和客户端实现。

创建项目运行 npm init -y 创建package.json文件  
安装依赖websocket依赖：npm install ws  
第一次安装后，还需要初始化ts基础依赖：npm install --save-dev @types/ws @types/node typescript  

## Build
- 清理之前的构建
npm run clean

- 构建服务端
npm run build:server

- 构建客户端
npm run build:client

- 构建全部
npm run build

- 启动服务端（保持运行）
npm run start:server

- 新终端启动客户端
npm run start:client

- 开发时使用监听模式，代码变化会自动重新编译：  
npm run dev:server  
npm run dev:client  


## 关于心跳机制

websocket是有心跳机制的，ping和pong，协议规定，一端发了ping，另一端必须尽快恢复pong帧。但这不是协议强制的，所以使用的库不一定有该实现。  
wb底层使用tcp连接，理论上也是可以实现keepalive的，但tcp的超时时间很久，且由操作系统决定配置，一般情况下业务是不能依赖tcp保活的。

---
关注Websocket发起前有Http握手阶段。



