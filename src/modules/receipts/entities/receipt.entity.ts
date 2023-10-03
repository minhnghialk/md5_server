import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PayMode } from '../receipts.enum';
import { User } from 'src/modules/users/entities/user.entity';
import { ReceiptDetail } from 'src/modules/receipt-detail/entities/receipt-detail.entity';
import { Guest } from 'src/modules/guest/entities/guest.entity';

export enum ReceiptStatus {
  SHOPPING = 'SHOPPING', // Khách hàng chọn sản phẩm
  PENDING = 'PENDING', // Chờ shop xác nhận đơn hàng
  ACCEPTED = 'ACCEPTED', // Shop đã ok chờ vận chuyển tới nhận
  SHIPPING = 'SHIPPING', // Vận chuyển xử lý giao hàng
  DONE = 'DONE', // Khách đã nhận được hàng và hoàn tất giao dịch mua bán
}
@Entity()
export class Receipt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true,
  })
  userId: string;

  @ManyToOne(() => User, (user) => user.receipts)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({
    nullable: true,
  })
  guestId: string;

  @ManyToOne(() => Guest, (guest) => guest.receipts)
  @JoinColumn({ name: 'guestId' })
  guest: Guest;

  @Column({
    nullable: true,
  })
  guestName: string;

  @Column({
    nullable: true,
  })
  guestEmail: string;

  @Column({
    nullable: true,
  })
  guestPhoneNumber: string;

  @Column({
    type: 'enum',
    enum: ReceiptStatus,
    default: ReceiptStatus.SHOPPING,
  })
  status: ReceiptStatus;

  @Column({
    nullable: true,
  })
  paid: boolean;

  @Column({
    type: 'enum',
    enum: PayMode,
    default: PayMode.CASH,
  })
  payMode: PayMode;

  @Column({
    nullable: true,
  })
  paidTime: string;

  @OneToMany(() => ReceiptDetail, (receiptDetail) => receiptDetail.receipt)
  detail: ReceiptDetail[];

  @Column()
  createAt: string; // thời gian tạo đơn hàng (được tạo tự động)

  @Column({
    nullable: true,
  })
  acceptedAt: string; // thời gian shop xác nhận đơn hàng

  @Column({
    nullable: true,
  })
  shipAt: string; // thời gian bên vận chuyển nhận hàng

  @Column({
    nullable: true,
  })
  doneAt: string; // thời gian khách nhận được hàng

  @Column({
    default: 0,
  })
  total: number;

  @BeforeInsert()
  setCreateTime() {
    this.createAt = String(Date.now());
  }
}
