"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptDetailService = void 0;
const common_1 = require("@nestjs/common");
let ReceiptDetailService = class ReceiptDetailService {
    create(createReceiptDetailDto) {
        return 'This action adds a new receiptDetail';
    }
    findAll() {
        return `This action returns all receiptDetail`;
    }
    findOne(id) {
        return `This action returns a #${id} receiptDetail`;
    }
    update(id, updateReceiptDetailDto) {
        return `This action updates a #${id} receiptDetail`;
    }
    remove(id) {
        return `This action removes a #${id} receiptDetail`;
    }
};
exports.ReceiptDetailService = ReceiptDetailService;
exports.ReceiptDetailService = ReceiptDetailService = __decorate([
    (0, common_1.Injectable)()
], ReceiptDetailService);
//# sourceMappingURL=receipt-detail.service.js.map