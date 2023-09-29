import { CreateProductPictureDto } from './dto/create-product_picture.dto';
import { UpdateProductPictureDto } from './dto/update-product_picture.dto';
export declare class ProductPicturesService {
    create(createProductPictureDto: CreateProductPictureDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateProductPictureDto: UpdateProductPictureDto): string;
    remove(id: number): string;
}
