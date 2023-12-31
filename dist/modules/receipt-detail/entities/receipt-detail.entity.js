"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptDetail = void 0;
const product_entity_1 = require("../../products/entities/product.entity");
const receipt_entity_1 = require("../../receipts/entities/receipt.entity");
const typeorm_1 = require("typeorm");
let ReceiptDetail = class ReceiptDetail {
};
exports.ReceiptDetail = ReceiptDetail;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ReceiptDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReceiptDetail.prototype, "receiptId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => receipt_entity_1.Receipt, (receipt) => receipt.detail),
    (0, typeorm_1.JoinColumn)({ name: 'receiptId' }),
    __metadata("design:type", receipt_entity_1.Receipt)
], ReceiptDetail.prototype, "receipt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReceiptDetail.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.id, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'productId' }),
    __metadata("design:type", product_entity_1.Product)
], ReceiptDetail.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ReceiptDetail.prototype, "quantity", void 0);
exports.ReceiptDetail = ReceiptDetail = __decorate([
    (0, typeorm_1.Entity)()
], ReceiptDetail);
//# sourceMappingURL=receipt-detail.entity.js.map