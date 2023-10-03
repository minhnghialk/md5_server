import { PayMode } from '../receipts.enum';
import { User } from 'src/modules/users/entities/user.entity';
import { ReceiptDetail } from 'src/modules/receipt-detail/entities/receipt-detail.entity';
import { Guest } from 'src/modules/guest/entities/guest.entity';
export declare enum ReceiptStatus {
    SHOPPING = "SHOPPING",
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    SHIPPING = "SHIPPING",
    DONE = "DONE"
}
export declare class Receipt {
    id: string;
    userId: string;
    user: User;
    guestId: string;
    guest: Guest;
    guestName: string;
    guestEmail: string;
    guestPhoneNumber: string;
    status: ReceiptStatus;
    paid: boolean;
    payMode: PayMode;
    paidTime: string;
    detail: ReceiptDetail[];
    createAt: string;
    acceptedAt: string;
    shipAt: string;
    doneAt: string;
    total: number;
    setCreateTime(): void;
}
