import { Module } from '@nestjs/common';
import { ProductPicturesService } from './product_pictures.service';
import { ProductPicturesController } from './product_pictures.controller';

@Module({
  controllers: [ProductPicturesController],
  providers: [ProductPicturesService],
})
export class ProductPicturesModule {}
