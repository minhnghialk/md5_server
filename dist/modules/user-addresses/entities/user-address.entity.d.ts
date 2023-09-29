import { User } from 'src/modules/users/entities/user.entity';
export declare class UserAddresses {
    id: string;
    userId: string;
    user: User;
    detail: string;
    provinceId: number;
    provinceName: string;
    districtId: number;
    districtName: string;
    wardCode: string;
    wardName: string;
}
