/// <reference types="multer" />
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { Response } from 'express';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(file: Express.Multer.File, body: any, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
    findByName(res: Response, name: string): Promise<Response<any, Record<string, any>>>;
    update(id: string, updateProductDto: UpdateProductDto): string;
    remove(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
