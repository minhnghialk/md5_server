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
exports.AddToCartDto = exports.ReceiptDetail = exports.Receipt = void 0;
const receipts_enum_1 = require("./../receipts.enum");
const class_validator_1 = require("class-validator");
class Receipt {
}
exports.Receipt = Receipt;
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], Receipt.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], Receipt.prototype, "guestName", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], Receipt.prototype, "guestEmail", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], Receipt.prototype, "guestPhoneNumber", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], Receipt.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], Receipt.prototype, "PayMode", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", Boolean)
], Receipt.prototype, "paid", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], Receipt.prototype, "paidTime", void 0);
class ReceiptDetail {
}
exports.ReceiptDetail = ReceiptDetail;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ReceiptDetail.prototype, "receiptId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ReceiptDetail.prototype, "quantity", void 0);
class AddToCartDto {
}
exports.AddToCartDto = AddToCartDto;
//# sourceMappingURL=add-to-cart.dto.js.map