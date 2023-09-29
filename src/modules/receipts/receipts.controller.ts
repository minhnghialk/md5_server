/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Post, Body } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Controller('receipts')
export class ReceiptsController {
  constructor(private readonly receiptsService: ReceiptsService) {}

  @Post()
  addToCart(@Body() addToCart: AddToCartDto) {}
}
