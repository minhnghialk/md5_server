import { Product } from 'src/modules/products/entities/product.entity';
import { Receipt } from 'src/modules/receipts/entities/receipt.entity';
export declare class ReceiptDetail {
    id: string;
    receiptId: string;
    receipt: Receipt;
    productId: string;
    product: Product;
    quantity: number;
}
