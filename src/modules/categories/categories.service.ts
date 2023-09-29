/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categories: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const newCategory = await this.categories.create(createCategoryDto);
      if (!newCategory) {
        return [false, 'Category creation failed'];
      }
      return [true, 'Category created successfully', newCategory];
    } catch (err) {
      return [false, 'Lỗi service', null];
    }
  }

  async findAll() {
    try {
      const categories = await this.categories.find();
      console.log('categories', categories);
      return {
        status: true,
        data: categories,
        message: 'Get all categories successfully',
      };
    } catch (err) {
      return {
        status: false,
        data: null,
        message: 'Lỗi service',
      };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
