import { OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';
import { DiscordBotSocket } from './discord.bot.socket';
export declare class CustomerChatSocket implements OnModuleInit {
    private readonly discordBotSocket;
    server: Server;
    constructor(discordBotSocket: DiscordBotSocket);
    onModuleInit(): void;
}
