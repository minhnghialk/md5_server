"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptsService = void 0;
const common_1 = require("@nestjs/common");
let ReceiptsService = class ReceiptsService {
    create(createReceiptDto) {
        return 'This action adds a new receipt';
    }
    findAll() {
        return `This action returns all receipts`;
    }
    findOne(id) {
        return `This action returns a #${id} receipt`;
    }
    update(id, updateReceiptDto) {
        return `This action updates a #${id} receipt`;
    }
    remove(id) {
        return `This action removes a #${id} receipt`;
    }
};
exports.ReceiptsService = ReceiptsService;
exports.ReceiptsService = ReceiptsService = __decorate([
    (0, common_1.Injectable)()
], ReceiptsService);
//# sourceMappingURL=receipts.service.js.map