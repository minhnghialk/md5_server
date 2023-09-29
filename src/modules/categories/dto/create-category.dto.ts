// import { IsNotEmpty } from 'class-validator';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class CreateCategoryDto {
  // @Column()
  // title: string;

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
}
