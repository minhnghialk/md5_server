import { CreateUserDto } from './create-user.dto';
import { UserRole, UserStatus } from '../users.enum';
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    avatar?: string;
    email?: string;
    emailAuthentication?: boolean;
    firstName?: string;
    lastName?: string;
    userName?: string;
    password?: string;
    role?: UserRole;
    status?: UserStatus;
}
export {};
