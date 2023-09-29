import { PayMode, ReceiptStatus } from './../receipts.enum';
import { Allow, IsNotEmpty } from 'class-validator';

export class Receipt {
  @Allow()
  userId?: string;

  @Allow()
  guestName?: string;

  @Allow()
  guestEmail?: string;

  @Allow()
  guestPhoneNumber?: string;

  @Allow()
  status?: ReceiptStatus;

  @Allow()
  PayMode: PayMode;

  @Allow()
  paid?: boolean;

  @Allow()
  paidTime?: string;
}

export class ReceiptDetail {
  @IsNotEmpty()
  receiptId: string;

  @IsNotEmpty()
  quantity: number;
}

export class AddToCartDto {
  receipt: Receipt;
  ReceiptDetail: ReceiptDetail;
}
