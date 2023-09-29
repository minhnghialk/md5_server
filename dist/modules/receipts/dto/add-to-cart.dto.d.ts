import { PayMode, ReceiptStatus } from './../receipts.enum';
export declare class Receipt {
    userId?: string;
    guestName?: string;
    guestEmail?: string;
    guestPhoneNumber?: string;
    status?: ReceiptStatus;
    PayMode: PayMode;
    paid?: boolean;
    paidTime?: string;
}
export declare class ReceiptDetail {
    receiptId: string;
    quantity: number;
}
export declare class AddToCartDto {
    receipt: Receipt;
    ReceiptDetail: ReceiptDetail;
}
