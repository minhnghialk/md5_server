import { Product } from 'src/modules/products/entities/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class ProductPicture {
  [x: string]: any;
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @Column()
  productId: number;

  @ManyToOne(() => Product, (product) => product.product_pictures)
  @JoinColumn({ name: 'productId' })
  product: Product;
}
