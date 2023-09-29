/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Response } from 'express';
import { ApiResponse } from '@nestjs/swagger';
import { FindCategoryDto } from './dto/find-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Res() res: Response,
  ) {
    try {
      const [status, message, data] =
        await this.categoriesService.create(createCategoryDto);
      return res.status(status ? 200 : 213).json([message, data]);
    } catch (err) {
      return res.status(500).json({
        message: 'Lỗi controller',
      });
    }
  }

  @Get()
  // Viết mô tả Api
  @ApiResponse({
    status: 200,
    description: 'Lấy toàn bộ danh mục sản phẩm thành công.',
    type: FindCategoryDto,
    isArray: true,
  })
  @ApiResponse({
    status: 202,
    description: 'Lấy toàn bộ danh mục thất bại.',
  })
  @ApiResponse({
    status: 400,
    description: 'Lỗi call apis.',
  })
  async findAll(@Res() res: Response) {
    try {
      const serviceRes = await this.categoriesService.findAll();
      console.log('serviceRes', serviceRes);
      return res
        .status(serviceRes.status ? HttpStatus.OK : HttpStatus.ACCEPTED)
        .json(serviceRes);
    } catch (err) {
      throw new HttpException('Lỗi xử lý yêu cầu', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
