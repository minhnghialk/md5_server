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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordBotSocket = void 0;
const common_1 = require("@nestjs/common");
const discord_js_1 = require("discord.js");
const customer_chat_socket_1 = require("./customer.chat.socket");
let DiscordBotSocket = class DiscordBotSocket {
    constructor(customerChatSocket) {
        this.customerChatSocket = customerChatSocket;
        this.botToken = 'MTE1Mzk4ODE5NzcwNjEwODk5Mg.GYO-Vq.9FjxvfiDKXt2m3r_oqUKR6l2q-bYpmjXQ2kWJ8';
        this.guildId = '1153990231884824647';
    }
    onModuleInit() {
        this.client = new discord_js_1.Client({
            intents: [
                discord_js_1.GatewayIntentBits.Guilds,
                discord_js_1.GatewayIntentBits.GuildMessages,
                discord_js_1.GatewayIntentBits.MessageContent,
            ],
        });
        this.client.login(this.botToken);
        this.client.on('ready', () => {
            this.connectGuild();
            this.client.on('messageCreate', (message) => {
                console.log('message', message.content);
                if (!message.author.bot) {
                    message.reply('Ok thấy rồi!');
                }
            });
        });
    }
    connectGuild() {
        this.guild = this.client.guilds.cache.get(this.guildId);
    }
};
exports.DiscordBotSocket = DiscordBotSocket;
exports.DiscordBotSocket = DiscordBotSocket = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => customer_chat_socket_1.CustomerChatSocket))),
    __metadata("design:paramtypes", [customer_chat_socket_1.CustomerChatSocket])
], DiscordBotSocket);
//# sourceMappingURL=discord.bot.socket.js.map