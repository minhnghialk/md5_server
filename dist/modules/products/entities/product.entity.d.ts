import { Category } from 'src/modules/categories/entities/category.entity';
import { ProductPicture } from 'src/modules/product_pictures/entities/product_picture.entity';
export declare class Product {
    static find(arg0: (product: any) => boolean): void;
    id: number;
    name: string;
    avatar: string;
    price: number;
    des: string;
    categoryId: string;
    category: Category;
    product_pictures: ProductPicture[];
}
