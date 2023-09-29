/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { CustomerChatSocket } from './customer.chat.socket';
import { DiscordBotSocket } from './discord.bot.socket';
import { JwtService } from 'src/modules/jwts/jwt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSocketGateway } from './users/user.socket';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [
    DiscordBotSocket,
    CustomerChatSocket,
    UserSocketGateway,
    JwtService,
  ],
})
export class SocketModule {}
