import { ReceiptsService } from './receipts.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
export declare class ReceiptsController {
    private readonly receiptsService;
    constructor(receiptsService: ReceiptsService);
    addToCart(addToCart: AddToCartDto): void;
}
