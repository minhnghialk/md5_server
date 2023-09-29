import { ProductPicturesService } from './product_pictures.service';
import { CreateProductPictureDto } from './dto/create-product_picture.dto';
import { UpdateProductPictureDto } from './dto/update-product_picture.dto';
export declare class ProductPicturesController {
    private readonly productPicturesService;
    constructor(productPicturesService: ProductPicturesService);
    create(createProductPictureDto: CreateProductPictureDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateProductPictureDto: UpdateProductPictureDto): string;
    remove(id: string): string;
}
