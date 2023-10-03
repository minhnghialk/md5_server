/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { CustomerChatSocket } from './customer.chat.socket';
import { DiscordBotSocket } from './discord.bot.socket';
import { JwtService } from 'src/modules/jwts/jwt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSocketGateway } from './users/user.socket';
import { Receipt } from 'src/modules/receipts/entities/receipt.entity';
import { ReceiptDetail } from 'src/modules/receipt-detail/entities/receipt-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Receipt, ReceiptDetail])],
  providers: [
    DiscordBotSocket,
    CustomerChatSocket,
    UserSocketGateway,
    JwtService,
  ],
})
export class SocketModule {}
