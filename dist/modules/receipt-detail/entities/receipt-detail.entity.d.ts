import { Receipt } from 'src/modules/receipts/entities/receipt.entity';
export declare class ReceiptDetail {
    id: string;
    receiptId: string;
    receipt: Receipt;
    quantity: string;
}
