import { OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { JwtService } from 'src/modules/jwts/jwt.service';
import { User } from 'src/modules/users/entities/user.entity';
interface ClientType {
    user: User;
    socket: Socket;
}
export declare class UserSocketGateway implements OnModuleInit {
    private readonly jwt;
    server: Server;
    clients: ClientType[];
    constructor(jwt: JwtService);
    onModuleInit(): void;
}
export {};
