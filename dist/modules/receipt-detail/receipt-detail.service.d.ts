import { CreateReceiptDetailDto } from './dto/create-receipt-detail.dto';
import { UpdateReceiptDetailDto } from './dto/update-receipt-detail.dto';
export declare class ReceiptDetailService {
    create(createReceiptDetailDto: CreateReceiptDetailDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateReceiptDetailDto: UpdateReceiptDetailDto): string;
    remove(id: number): string;
}
