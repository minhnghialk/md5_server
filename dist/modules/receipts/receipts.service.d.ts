import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
export declare class ReceiptsService {
    create(createReceiptDto: CreateReceiptDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateReceiptDto: UpdateReceiptDto): string;
    remove(id: number): string;
}
