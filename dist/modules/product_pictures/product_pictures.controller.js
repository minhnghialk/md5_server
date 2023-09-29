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
exports.ProductPicturesController = void 0;
const common_1 = require("@nestjs/common");
const product_pictures_service_1 = require("./product_pictures.service");
const create_product_picture_dto_1 = require("./dto/create-product_picture.dto");
const update_product_picture_dto_1 = require("./dto/update-product_picture.dto");
let ProductPicturesController = class ProductPicturesController {
    constructor(productPicturesService) {
        this.productPicturesService = productPicturesService;
    }
    create(createProductPictureDto) {
        return this.productPicturesService.create(createProductPictureDto);
    }
    findAll() {
        return this.productPicturesService.findAll();
    }
    findOne(id) {
        return this.productPicturesService.findOne(+id);
    }
    update(id, updateProductPictureDto) {
        return this.productPicturesService.update(+id, updateProductPictureDto);
    }
    remove(id) {
        return this.productPicturesService.remove(+id);
    }
};
exports.ProductPicturesController = ProductPicturesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_picture_dto_1.CreateProductPictureDto]),
    __metadata("design:returntype", void 0)
], ProductPicturesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductPicturesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductPicturesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_picture_dto_1.UpdateProductPictureDto]),
    __metadata("design:returntype", void 0)
], ProductPicturesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductPicturesController.prototype, "remove", null);
exports.ProductPicturesController = ProductPicturesController = __decorate([
    (0, common_1.Controller)('product-pictures'),
    __metadata("design:paramtypes", [product_pictures_service_1.ProductPicturesService])
], ProductPicturesController);
//# sourceMappingURL=product_pictures.controller.js.map