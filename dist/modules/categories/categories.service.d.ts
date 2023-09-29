import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm/repository/Repository';
export declare class CategoriesService {
    private categories;
    constructor(categories: Repository<Category>);
    create(createCategoryDto: CreateCategoryDto): Promise<(string | boolean | Category)[]>;
    findAll(): Promise<{
        status: boolean;
        data: Category[];
        message: string;
    }>;
    findOne(id: number): string;
    update(id: number, updateCategoryDto: UpdateCategoryDto): string;
    remove(id: number): string;
}
