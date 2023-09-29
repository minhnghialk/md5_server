import { UserAddresses } from '../../user-addresses/entities/user-address.entity';
import { UserRole, UserStatus } from '../users.enum';
import { Receipt } from 'src/modules/receipts/entities/receipt.entity';
export declare class User {
    [x: string]: any;
    id: string;
    avatar: string;
    email: string;
    emailAuthentication: boolean;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    hashPassword(): Promise<void>;
    role: UserRole;
    status: UserStatus;
    createAt: string;
    updateAt: string;
    setUpdateTime(): Promise<void>;
    userAddresses: UserAddresses[];
    receipts: Receipt[];
}
