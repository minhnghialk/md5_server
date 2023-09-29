import { OnModuleInit, Inject, forwardRef } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DiscordBotSocket } from './discord.bot.socket';

@WebSocketGateway(3001, { cors: true })
export class CustomerChatSocket implements OnModuleInit {
  /* Lớp decor này dùng để mở socket server */
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject(forwardRef(() => DiscordBotSocket))
    private readonly discordBotSocket: DiscordBotSocket,
  ) {}

  onModuleInit() {
    // console.log('Customer Chat Socket Gateway đã mở!');

    this.server.on('connect', (socket: Socket) => {
      // console.log('Có client connect id là:', socket.id);

      socket.on('disconnect', () => {
        // console.log(`Client có id: ${socket.id} đã ngắt kết nối!`);
      });
    });
  }
}
