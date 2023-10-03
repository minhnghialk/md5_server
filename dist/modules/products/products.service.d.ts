import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
export declare class ProductsService {
    private products;
    [x: string]: any;
    constructor(products: Repository<Product>);
    create(createProductDto: CreateProductDto): Promise<{
        status: boolean;
        data: Product;
        message: string;
    }>;
    findAll(): Promise<{
        status: boolean;
        data: Product[];
        message: string;
    }>;
    findByName(searchString: string): Promise<{
        status: boolean;
        data: Product[];
        message: string;
    }>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<{
        status: boolean;
        data: Product;
        message: string;
    }>;
    remove(id: number): Promise<{
        status: boolean;
        data: import("typeorm").DeleteResult;
        message: string;
    }>;
}
