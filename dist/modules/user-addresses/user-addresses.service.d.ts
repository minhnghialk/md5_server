import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
export declare class UserAddressesService {
    create(createUserAddressDto: CreateUserAddressDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUserAddressDto: UpdateUserAddressDto): string;
    remove(id: number): string;
}
