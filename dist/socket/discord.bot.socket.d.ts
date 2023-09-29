import { OnModuleInit } from '@nestjs/common';
import { Client, Guild } from 'discord.js';
import { CustomerChatSocket } from './customer.chat.socket';
export declare class DiscordBotSocket implements OnModuleInit {
    private readonly customerChatSocket;
    client: Client;
    botToken: string;
    guildId: string;
    guild: Guild;
    constructor(customerChatSocket: CustomerChatSocket);
    onModuleInit(): void;
    connectGuild(): void;
}
