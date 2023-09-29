import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { FindByIdSerRes, RegisterSerRes, UpdateSerRes } from './users.interface';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private users;
    constructor(users: Repository<User>);
    register(createUserDto: CreateUserDto): Promise<RegisterSerRes>;
    update(userId: string, updateUserDto: UpdateUserDto): Promise<UpdateSerRes>;
    findById(userId: string): Promise<FindByIdSerRes>;
    findByUserNameOrEmail(userNameOrEmail: string): Promise<FindByIdSerRes>;
}
