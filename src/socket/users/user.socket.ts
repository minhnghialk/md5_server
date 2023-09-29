/* eslint-disable @typescript-eslint/no-unused-vars */
import { OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from 'src/modules/jwts/jwt.service';
import { User } from 'src/modules/users/entities/user.entity';

interface ClientType {
  user: User;
  socket: Socket;
}

@WebSocketGateway(3001, { cors: true })
export class UserSocketGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  clients: ClientType[] = [];

  constructor(private readonly jwt: JwtService) {}

  onModuleInit() {
    this.server.on('connect', (socket: Socket) => {
      console.log('đã có người connect');
      // Xoá người dùng khỏi clients nếu disconnect
      this.server.on('disconnect', () => {
        this.clients = this.clients.filter(
          (client) => client.socket.id !== socket.id,
        );
      });

      // Xác thực người dùng
      const token: string = String(socket.handshake.query.token);
      const user = this.jwt.verifyToken(token) as User;

      if (token === 'undefined' || !user) {
        socket.emit('connectStatus', {
          status: false,
          message: 'Đăng nhập thất bại',
        });
        socket.disconnect();
      } else {
        if (this.clients.find((client) => client.user.id === user.id)) {
          socket.emit('connectStatus', {
            status: false,
            message: 'Đã đăng nhập ở một thiết bị khác',
          });
          socket.disconnect();
          return;
        }
        // Lưu trữ thông tin người dùng để tương tác sau
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
}
