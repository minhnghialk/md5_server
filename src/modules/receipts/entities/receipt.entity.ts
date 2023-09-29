import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PayMode, ReceiptStatus } from '../receipts.enum';
import { User } from 'src/modules/users/entities/user.entity';
import { ReceiptDetail } from 'src/modules/receipt-detail/entities/receipt-detail.entity';

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

  @Column()
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

  @OneToMany(() => ReceiptDetail, (detail) => detail.receipt)
  detail: ReceiptDetail[];

  @Column()
  createAt: string;

  @Column()
  total: number;

  @BeforeInsert()
  setCreateTime() {
    this.createAt = String(Date.now());
  }
}
