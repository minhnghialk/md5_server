/* eslint-disable @typescript-eslint/no-unused-vars */
import { Product } from 'src/modules/products/entities/product.entity';
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
  Req,
  UploadedFile,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Response } from 'express';
import { ApiResponse } from '@nestjs/swagger';
import { FindProductDto } from './dto/find-product-dtc';
import * as fs from 'fs';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadFileToStorage } from 'src/firebase';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Mô tả Api
  // @ApiResponse({
  //   status: 200,
  //   description: 'Thêm sản phẩm mới thành công.',
  // })
  // @ApiResponse({
  //   status: 202,
  //   description: 'Thêm sản phẩm mới thất bại.',
  // })
  // @ApiResponse({
  //   status: 400,
  //   description: 'Lỗi call apis.',
  // })
  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    console.log('body', body);
    console.log('file', file);

    const data = JSON.parse(body.product);
    console.log('data', data);

    const url = await uploadFileToStorage(file, 'md5db', file.buffer);
    console.log('url', url);

    data.price = Number(data.price);
    const newProduct = {
      ...data,
      avatar: url,
    };

    // const productPictures = [];
    // for (let i = 1; Number(i) < Number(file?.length); i++) {
    //   console.log('(req.files as any)[i]', (file as any)[i]);
    //   const path = await uploadFileToStorage(
    //     (file as any)[i],
    //     'md5db',
    //     fs.readFileSync((file as any)[i].path),
    //   );
    //   fs.unlink((file as any)[i].path, (err) => {});
    //   productPictures.push({
    //     path,
    //   });
    // }

    try {
      const serviceRes = await this.productsService.create(newProduct);
      console.log('serviceRes', serviceRes);
      res.statusMessage = serviceRes.message;
      return res
        .status(serviceRes.status ? HttpStatus.OK : HttpStatus.ACCEPTED)
        .json(serviceRes);
    } catch (err) {
      throw new HttpException('Lỗi controller', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  // Mô tả Api
  @ApiResponse({
    status: 200,
    description: 'Lấy toàn bộ danh sách sản phẩm thành công.',
    type: FindProductDto,
    isArray: true,
  })
  @ApiResponse({
    status: 202,
    description: 'Lấy toàn bộ danh sách sản phẩm thất bại.',
  })
  @ApiResponse({
    status: 400,
    description: 'Lỗi call apis.',
  })
  async findAll(@Res() res: Response) {
    try {
      const serviceRes = await this.productsService.findAll();
      console.log('serviceRes', serviceRes);
      return res
        .status(serviceRes.status ? HttpStatus.OK : HttpStatus.ACCEPTED)
        .json(serviceRes);
    } catch (err) {
      throw new HttpException('Lỗi controller', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('productName')
  // Mô tả Api
  @ApiResponse({
    status: 200,
    description: 'Tìm sản phẩm thành công.',
  })
  @ApiResponse({
    status: 202,
    description: 'Tìm sản phẩm thất bại.',
  })
  @ApiResponse({
    status: 400,
    description: 'Lỗi call apis.',
  })
  // async findOne(
  //   @Param('productName') productName: string,
  //   @Res() res: Response,
  // ) {
  //   try {
  //     const serviceRes = await this.productsService.findOne(productName);
  //     console.log('serviceRes', serviceRes);
  //     return res
  //       .status(serviceRes.status ? HttpStatus.OK : HttpStatus.ACCEPTED)
  //       .json(serviceRes);
  //   } catch (err) {
  //     throw new HttpException('Lỗi controller', HttpStatus.BAD_REQUEST);
  //   }
  // }
  @Get()
  async findByName(@Res() res: Response, @Query('name') name: string) {
    try {
      if (name != undefined) {
        return res
          .status(HttpStatus.OK)
          .json(await this.productsService.searchByName(name));
      }
      return res.status(HttpStatus.OK).json(await this.productsService.find());
    } catch (err) {
      throw new HttpException('Lỗi Controller', HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('avatar'))
  update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const data = JSON.parse(body.product);
    console.log('update product', data);
    data.price = Number(data.price);

    return this.productsService.update(+id, data);
  }

  @Delete(':id')
  // Mô tả Api
  @ApiResponse({
    status: 200,
    description: 'Xoá sản phẩm thành công.',
  })
  @ApiResponse({
    status: 202,
    description: 'Xoá sản phẩm thất bại.',
  })
  @ApiResponse({
    status: 400,
    description: 'Lỗi call apis.',
  })
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const serviceRes = await this.productsService.remove(+id);
      console.log('serviceRes', serviceRes);
      return res
        .status(serviceRes.status ? HttpStatus.OK : HttpStatus.ACCEPTED)
        .json(serviceRes);
    } catch (err) {
      throw new HttpException('Lỗi controller', HttpStatus.BAD_REQUEST);
    }
  }
}
