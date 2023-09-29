import { ReceiptDetailService } from './receipt-detail.service';
import { CreateReceiptDetailDto } from './dto/create-receipt-detail.dto';
import { UpdateReceiptDetailDto } from './dto/update-receipt-detail.dto';
export declare class ReceiptDetailController {
    private readonly receiptDetailService;
    constructor(receiptDetailService: ReceiptDetailService);
    create(createReceiptDetailDto: CreateReceiptDetailDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateReceiptDetailDto: UpdateReceiptDetailDto): string;
    remove(id: string): string;
}
