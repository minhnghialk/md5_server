import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from 'src/modules/products/entities/product.entity';

@Entity()
export class Category {
  [x: string]: any;
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column({ default: false })
  active: boolean;

  @Column({
    default:
      'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930',
  })
  avatar: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
