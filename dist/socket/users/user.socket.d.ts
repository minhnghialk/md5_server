import { OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { JwtService } from 'src/modules/jwts/jwt.service';
import { ReceiptDetail } from 'src/modules/receipt-detail/entities/receipt-detail.entity';
import { Receipt } from 'src/modules/receipts/entities/receipt.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
interface ClientType {
    user: User;
    socket: Socket;
}
export declare class UserSocketGateway implements OnModuleInit {
    private readonly jwt;
    private readonly receipts;
    private readonly receiptDetail;
    [x: string]: any;
    server: Server;
    clients: ClientType[];
    constructor(jwt: JwtService, receipts: Repository<Receipt>, receiptDetail: Repository<ReceiptDetail>);
    onModuleInit(): void;
    findReceipByAuthId(data: {
        userId: string | null;
        guestId: string | null;
    }): Promise<false | Receipt[]>;
    getCartByUserId(userId: string): Promise<false | Receipt>;
    addToCart(newItem: {
        receiptId: string;
        productId: string;
        quantity: number;
    }): Promise<false | Receipt>;
}
export {};
