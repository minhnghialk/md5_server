import { Product } from 'src/modules/products/entities/product.entity';
import { Receipt } from 'src/modules/receipts/entities/receipt.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ReceiptDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  receiptId: string;

  @ManyToOne(() => Receipt, (receipt) => receipt.detail)
  @JoinColumn({ name: 'receiptId' })
  receipt: Receipt;

  @Column()
  productId: string;
  @ManyToOne(() => Product, (product) => product.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column()
  quantity: number;
}
