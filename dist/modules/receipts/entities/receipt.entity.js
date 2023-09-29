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
exports.Receipt = void 0;
const typeorm_1 = require("typeorm");
const receipts_enum_1 = require("../receipts.enum");
const user_entity_1 = require("../../users/entities/user.entity");
const receipt_detail_entity_1 = require("../../receipt-detail/entities/receipt-detail.entity");
let Receipt = class Receipt {
    setCreateTime() {
        this.createAt = String(Date.now());
    }
};
exports.Receipt = Receipt;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Receipt.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], Receipt.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.receipts),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], Receipt.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], Receipt.prototype, "guestName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], Receipt.prototype, "guestEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], Receipt.prototype, "guestPhoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: receipts_enum_1.ReceiptStatus,
        default: receipts_enum_1.ReceiptStatus.SHOPPING,
    }),
    __metadata("design:type", String)
], Receipt.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Receipt.prototype, "paid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: receipts_enum_1.PayMode,
        default: receipts_enum_1.PayMode.CASH,
    }),
    __metadata("design:type", String)
], Receipt.prototype, "payMode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], Receipt.prototype, "paidTime", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => receipt_detail_entity_1.ReceiptDetail, (detail) => detail.receipt),
    __metadata("design:type", Array)
], Receipt.prototype, "detail", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Receipt.prototype, "createAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Receipt.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Receipt.prototype, "setCreateTime", null);
exports.Receipt = Receipt = __decorate([
    (0, typeorm_1.Entity)()
], Receipt);
//# sourceMappingURL=receipt.entity.js.map