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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptDetailController = void 0;
const common_1 = require("@nestjs/common");
const receipt_detail_service_1 = require("./receipt-detail.service");
const create_receipt_detail_dto_1 = require("./dto/create-receipt-detail.dto");
const update_receipt_detail_dto_1 = require("./dto/update-receipt-detail.dto");
let ReceiptDetailController = class ReceiptDetailController {
    constructor(receiptDetailService) {
        this.receiptDetailService = receiptDetailService;
    }
    create(createReceiptDetailDto) {
        return this.receiptDetailService.create(createReceiptDetailDto);
    }
    findAll() {
        return this.receiptDetailService.findAll();
    }
    findOne(id) {
        return this.receiptDetailService.findOne(+id);
    }
    update(id, updateReceiptDetailDto) {
        return this.receiptDetailService.update(+id, updateReceiptDetailDto);
    }
    remove(id) {
        return this.receiptDetailService.remove(+id);
    }
};
exports.ReceiptDetailController = ReceiptDetailController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_receipt_detail_dto_1.CreateReceiptDetailDto]),
    __metadata("design:returntype", void 0)
], ReceiptDetailController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReceiptDetailController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReceiptDetailController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_receipt_detail_dto_1.UpdateReceiptDetailDto]),
    __metadata("design:returntype", void 0)
], ReceiptDetailController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReceiptDetailController.prototype, "remove", null);
exports.ReceiptDetailController = ReceiptDetailController = __decorate([
    (0, common_1.Controller)('receipt-detail'),
    __metadata("design:paramtypes", [receipt_detail_service_1.ReceiptDetailService])
], ReceiptDetailController);
//# sourceMappingURL=receipt-detail.controller.js.map