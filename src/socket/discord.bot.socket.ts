import { Inject, Injectable, OnModuleInit, forwardRef } from '@nestjs/common';
import { Client, GatewayIntentBits, Guild, Message } from 'discord.js';
import { CustomerChatSocket } from './customer.chat.socket';

@Injectable()
export class DiscordBotSocket implements OnModuleInit {
  /* thuộc tính client được ép kiểu theo class Client của discord */
  client: Client;
  /* Token dùng để connect tới bot */
  botToken: string =
    'MTE1Mzk4ODE5NzcwNjEwODk5Mg.GoRmrz.EElsCUOGF_6VQ9VmfVghgAX3Gq4Bn4PbVZynhc';
  /* ID của kênh discord muốn làm việc */
  guildId: string = '1153990231884824647';
  /* Khai báo ra thuộc tính guild được ép kiểu theo Class Guild của discord*/
  guild: Guild;

  constructor(
    @Inject(forwardRef(() => CustomerChatSocket))
    private readonly customerChatSocket: CustomerChatSocket,
  ) {}

  onModuleInit() {
    /* Khởi tạo instance client discord */
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });
    /* Yêu cầu client đăng nhập vào bot */
    this.client.login(this.botToken);
    /* Lắng nghe sự kiện ready từ server discord, nếu bot đã sẵn sàng sử dụng thì chạy callback function*/
    this.client.on('ready', () => {
      // console.log('Discord Bot Socket Đã Mở!');

      /* Các lệnh sau chỉ chạy được sau khi bot sẵn sàng */
      this.connectGuild();

      this.client.on('messageCreate', (message: Message) => {
        console.log('message', message.content);
        if (!message.author.bot) {
          message.reply('Ok thấy rồi!');
        }
      });
    });
  }

  connectGuild() {
    /* Lấy instance của kênh discord mình muốn làm việc theo ID Kênh và gán nó cho thuộc tính guild  */
    this.guild = this.client.guilds.cache.get(this.guildId);
  }
}
