/// <reference types="multer" />
import { Product } from 'src/modules/products/entities/product.entity';
import { ProductsService } from './products.service';
import { Response } from 'express';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(file: Express.Multer.File, body: any, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
    findByName(res: Response, name: string): Promise<Response<any, Record<string, any>>>;
    update(id: string, file: Express.Multer.File, body: any, req: Request, res: Response): Promise<{
        status: boolean;
        data: Product;
        message: string;
    }>;
    remove(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
