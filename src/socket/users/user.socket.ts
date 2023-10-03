/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from 'src/modules/jwts/jwt.service';
import { ReceiptDetail } from 'src/modules/receipt-detail/entities/receipt-detail.entity';
import { Receipt } from 'src/modules/receipts/entities/receipt.entity';
import { ReceiptStatus } from 'src/modules/receipts/receipts.enum';
import { User } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';

interface ClientType {
  user: User;
  socket: Socket;
}

@WebSocketGateway(3001, { cors: true })
export class UserSocketGateway implements OnModuleInit {
  [x: string]: any;
  @WebSocketServer()
  server: Server;

  clients: ClientType[] = [];

  constructor(
    private readonly jwt: JwtService,
    @InjectRepository(Receipt) private readonly receipts: Repository<Receipt>,
    @InjectRepository(ReceiptDetail)
    private readonly receiptDetail: Repository<ReceiptDetail>,
  ) {}

  onModuleInit() {
    this.server.on('connect', async (socket: Socket) => {
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
        // if (this.clients.find((client) => client.user.id === user.id)) {
        //   socket.emit('connectStatus', {
        //     status: false,
        //     message: 'Đã đăng nhập ở một thiết bị khác',
        //   });
        //   socket.disconnect();
        //   return;
        // }
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

        const receipt = await this.findReceipByAuthId({
          userId: user.id,
          guestId: null,
        });
        console.log('receipt', receipt);

        socket.emit('receiveReceipt', receipt ? receipt : []);

        const cart = await this.getCartByUserId(user.id);
        if (cart) {
          socket.emit('receiveCart', cart);
        }

        socket.on(
          'addToCart',
          async (newItem: {
            receiptId: string;
            productId: string;
            quantity: number;
          }) => {
            console.log('addToCart - newItem', newItem);
            const newCart = await this.addToCart(newItem);
            console.log('addToCart - newCart', newCart);
            if (newCart) {
              socket.emit('onUpdateCart', newCart);
            }
          },
        );
        console.log('cart', cart);
      }
    });
  }

  async findReceipByAuthId(data: {
    userId: string | null;
    guestId: string | null;
  }) {
    try {
      if (data.userId === null && data.guestId === null) return false;
      const receipts = await this.receipts.find({
        where: data.userId
          ? {
              userId: data.userId,
            }
          : {
              guestId: data.guestId,
            },
        relations: {
          detail: {
            product: true,
          },
        },
      });
      console.log('receipts', receipts);

      if (!receipts) return false;
      if (receipts.length === 0) return false;
      return receipts;
    } catch (err) {
      console.log('err', err);
      return false;
    }
  }

  async getCartByUserId(userId: string) {
    console.log('da vao');
    try {
      console.log('da vao toi 1');
      const oldCart = await this.receipts.find({
        where: {
          userId,
          status: ReceiptStatus.SHOPPING,
        },
        relations: {
          detail: {
            product: true,
          },
        },
      });
      console.log('da vao toi 2');
      if (!oldCart || oldCart.length == 0) {
        // Nếu không tìm thấy giỏ hàng cũ hoặc tìm thấy giỏ hàng cũ mà số lượng là 0 -> tạo giỏ hàng
        const newCartChema = this.receipts.create({
          userId,
        });

        const newCart = await this.receipts.save(newCartChema);

        if (!newCart) return false;

        const newCartRelation = await this.receipts.findOne({
          where: {
            id: newCart.id,
          },
          relations: {
            detail: {
              product: true,
            },
          },
        });

        if (!newCartRelation) return false;

        return newCartRelation;
      }
      console.log('da vao toi 3', oldCart);
      return oldCart[0];
    } catch (err) {
      console.log('err', err);
      return false;
    }
  }

  async addToCart(newItem: {
    receiptId: string;
    productId: string;
    quantity: number;
  }) {
    try {
      const items = await this.receiptDetail.find({
        where: {
          receiptId: newItem.receiptId,
        },
      });
      console.log('addToCart - items', items);

      if (!items) return false;

      if (items.length === 0) {
        await this.receiptDetail.save(newItem);
      } else {
        const currentItem = items.find(
          (item) => item.productId === newItem.productId,
        );

        if (currentItem) {
          const itemUpdate = this.receiptDetail.merge(currentItem, {
            quantity: newItem.quantity,
          });

          await this.receiptDetail.save(itemUpdate);
        } else {
          await this.receiptDetail.save(newItem);
        }
      }

      const updateCart = await this.receipts.findOne({
        where: {
          id: newItem.receiptId,
        },
        relations: {
          detail: {
            product: true,
          },
        },
      });

      console.log('updateCart.detail', updateCart.detail);

      if (!updateCart) return false;
      return updateCart;
    } catch (err) {
      console.log('addToCart - err', err);

      return false;
    }
  }
}
