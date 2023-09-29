/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  [x: string]: any;
  constructor(
    @InjectRepository(Product) private products: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    console.log('da vao');
    try {
      const newProduct = this.products.create(createProductDto);
      console.log('newProduct', newProduct);
      const result = await this.products.save(newProduct);
      return {
        status: true,
        data: result,
        message: 'Product created successfully',
      };
    } catch (err) {
      return {
        status: false,
        data: null,
        message: 'Lỗi service',
      };
    }
  }

  async findAll() {
    try {
      const result = await this.products.find();
      console.log('result', result);
      return {
        status: true,
        data: result,
        message: 'Get all products successfully',
      };
    } catch (err) {
      console.log('create product', err);

      return {
        status: false,
        data: null,
        message: 'Lỗi service',
      };
    }
  }

  async findByName(searchString: string) {
    try {
      console.log('searchString', searchString);
      const result = await this.products.find({
        where: {
          name: ILike(`%${searchString}%`),
        },
      });
      return {
        status: true,
        data: result,
        message: 'Find product by name successfully',
      };
    } catch (err) {
      throw new HttpException('Lỗi Service', HttpStatus.BAD_REQUEST);
    }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: number) {
    try {
      const result = await this.products.delete(id);
      return {
        status: true,
        data: result,
        message: 'Removed #${id} product successfully',
      };
    } catch (err) {
      return {
        status: false,
        data: null,
        message: 'Lỗi service',
      };
    }
  }
}
