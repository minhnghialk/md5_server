"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSocketGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const jwt_service_1 = require("../../modules/jwts/jwt.service");
let UserSocketGateway = class UserSocketGateway {
    constructor(jwt) {
        this.jwt = jwt;
        this.clients = [];
    }
    onModuleInit() {
        this.server.on('connect', (socket) => {
            console.log('đã có người connect');
            this.server.on('disconnect', () => {
                this.clients = this.clients.filter((client) => client.socket.id !== socket.id);
            });
            const token = String(socket.handshake.query.token);
            const user = this.jwt.verifyToken(token);
            if (token === 'undefined' || !user) {
                socket.emit('connectStatus', {
                    status: false,
                    message: 'Đăng nhập thất bại',
                });
                socket.disconnect();
            }
            else {
                if (this.clients.find((client) => client.user.id === user.id)) {
                    socket.emit('connectStatus', {
                        status: false,
                        message: 'Đã đăng nhập ở một thiết bị khác',
                    });
                    socket.disconnect();
                    return;
                }
                this.clients.push({
                    user,
                    socket,
                });
                socket.emit('connectStatus', {
                    status: true,
                    message: 'Đăng nhập thành công',
                });
                socket.emit('receiveUserData', user);
            }
        });
    }
};
exports.UserSocketGateway = UserSocketGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], UserSocketGateway.prototype, "server", void 0);
exports.UserSocketGateway = UserSocketGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(3001, { cors: true }),
    __metadata("design:paramtypes", [jwt_service_1.JwtService])
], UserSocketGateway);
//# sourceMappingURL=user.socket.js.map