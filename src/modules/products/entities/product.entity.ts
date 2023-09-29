import { Category } from 'src/modules/categories/entities/category.entity';
import { ProductPicture } from 'src/modules/product_pictures/entities/product_picture.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Product {
  static find(arg0: (product: any) => boolean) {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    default:
      'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930',
  })
  avatar: string;

  @Column()
  price: number;

  @Column()
  des: string;

  @Column()
  categoryId: string;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @OneToMany(() => ProductPicture, (product_picture) => product_picture.product)
  product_pictures: ProductPicture[];
}
