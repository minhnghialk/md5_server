"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketModule = void 0;
const common_1 = require("@nestjs/common");
const customer_chat_socket_1 = require("./customer.chat.socket");
const discord_bot_socket_1 = require("./discord.bot.socket");
const jwt_service_1 = require("../modules/jwts/jwt.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_socket_1 = require("./users/user.socket");
let SocketModule = class SocketModule {
};
exports.SocketModule = SocketModule;
exports.SocketModule = SocketModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([])],
        providers: [
            discord_bot_socket_1.DiscordBotSocket,
            customer_chat_socket_1.CustomerChatSocket,
            user_socket_1.UserSocketGateway,
            jwt_service_1.JwtService,
        ],
    })
], SocketModule);
//# sourceMappingURL=socket.module.js.map