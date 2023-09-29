import { PayMode, ReceiptStatus } from '../receipts.enum';
import { User } from 'src/modules/users/entities/user.entity';
import { ReceiptDetail } from 'src/modules/receipt-detail/entities/receipt-detail.entity';
export declare class Receipt {
    id: string;
    userId: string;
    user: User;
    guestName: string;
    guestEmail: string;
    guestPhoneNumber: string;
    status: ReceiptStatus;
    paid: boolean;
    payMode: PayMode;
    paidTime: string;
    detail: ReceiptDetail[];
    createAt: string;
    total: number;
    setCreateTime(): void;
}
