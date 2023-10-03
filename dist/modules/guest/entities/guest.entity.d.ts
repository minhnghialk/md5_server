import { Receipt } from 'src/modules/receipts/entities/receipt.entity';
export declare class Guest {
    id: string;
    name: string;
    phoneNumber: string;
    email: string;
    receipts: Receipt[];
}
