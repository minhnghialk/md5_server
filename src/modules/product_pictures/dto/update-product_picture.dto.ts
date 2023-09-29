import { PartialType } from '@nestjs/swagger';
import { CreateProductPictureDto } from './create-product_picture.dto';

export class UpdateProductPictureDto extends PartialType(CreateProductPictureDto) {}
