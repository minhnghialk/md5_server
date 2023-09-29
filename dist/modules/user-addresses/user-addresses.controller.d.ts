import { UserAddressesService } from './user-addresses.service';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
export declare class UserAddressesController {
    private readonly userAddressesService;
    constructor(userAddressesService: UserAddressesService);
    create(createUserAddressDto: CreateUserAddressDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateUserAddressDto: UpdateUserAddressDto): string;
    remove(id: string): string;
}
