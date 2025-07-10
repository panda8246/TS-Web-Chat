一个学习项目，学习如何使用websocket创建聊天室，包含服务端和客户端实现。

## 开发过程记录
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
Websocket对比Http  
|  Websocket  |  Http  |
| :---- | :---- |
|   使用tcp，双向通信  |  使用tcp，单向通信  |
|   持久连接，有状态  |  每次连接独立，无状态  |
|   用于实时通信要求场景  |  用于静态资源和数据传输，不支持实时场景  |



ws和http是未经加密的明文传输，wss和https是经过加密的传输。  


## 建立连接过程
关注Websocket发起前需要通过Http经历一次握手阶段，通过Http升级到Websocket的设计，旨在利用Http的标准，让Websocket兼容大部分的设备和防火墙。  
ws协议规定，握手时发起Http1.1/GET请求，头部信息中携带了:
```
Upgrade：websocket  // 指示客户端希望升级到WebSocket协议
Connection：Upgrade //指示客户端希望建立持久连接
Sec-WebSocket-Key：xxxxxx  //生成一个随机的Base64编码密钥，用于安全验证。
Sec-WebSocket-Version：13 //指示客户端使用的WebSocket协议版本
```
服务端收到Http请求后，确认支持ws协议（检查是否是Http1.1/GET，以及检查头部信息中是否支持ws协议）。ws协议规定了一个固定的编码，将此编码与Sec-WebSocket-Key拼接，经过SHA-1哈希和Base64编码处理，得到响应的Sec-WebSocket-Accept，用于返回握手确认响应（状态码101）。之后双端的通信将使用ws协议的数据帧结构。  
Sec-WebSocket-Key能防止握手过程中该信息被篡改，无法防止中间人攻击。在明文传输的http中，我无法理解它的实际意义。



