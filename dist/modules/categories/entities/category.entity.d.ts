import { Product } from 'src/modules/products/entities/product.entity';
export declare class Category {
    [x: string]: any;
    id: number;
    title: string;
    active: boolean;
    avatar: string;
    products: Product[];
}
