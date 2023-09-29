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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const update_product_dto_1 = require("./dto/update-product.dto");
const swagger_1 = require("@nestjs/swagger");
const find_product_dtc_1 = require("./dto/find-product-dtc");
const platform_express_1 = require("@nestjs/platform-express");
const firebase_1 = require("../../firebase");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async create(file, body, req, res) {
        console.log('body', body);
        console.log('file', file);
        const data = JSON.parse(body.product);
        console.log('data', data);
        const url = await (0, firebase_1.uploadFileToStorage)(file, 'md5db', file.buffer);
        console.log('url', url);
        data.price = Number(data.price);
        const newProduct = {
            ...data,
            avatar: url,
        };
        try {
            const serviceRes = await this.productsService.create(newProduct);
            console.log('serviceRes', serviceRes);
            res.statusMessage = serviceRes.message;
            return res
                .status(serviceRes.status ? common_1.HttpStatus.OK : common_1.HttpStatus.ACCEPTED)
                .json(serviceRes);
        }
        catch (err) {
            throw new common_1.HttpException('Lỗi controller', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAll(res) {
        try {
            const serviceRes = await this.productsService.findAll();
            console.log('serviceRes', serviceRes);
            return res
                .status(serviceRes.status ? common_1.HttpStatus.OK : common_1.HttpStatus.ACCEPTED)
                .json(serviceRes);
        }
        catch (err) {
            throw new common_1.HttpException('Lỗi controller', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findByName(res, name) {
        try {
            if (name != undefined) {
                return res
                    .status(common_1.HttpStatus.OK)
                    .json(await this.productsService.searchByName(name));
            }
            return res.status(common_1.HttpStatus.OK).json(await this.productsService.find());
        }
        catch (err) {
            throw new common_1.HttpException('Lỗi Controller', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    update(id, updateProductDto) {
        return this.productsService.update(+id, updateProductDto);
    }
    async remove(id, res) {
        try {
            const serviceRes = await this.productsService.remove(+id);
            console.log('serviceRes', serviceRes);
            return res
                .status(serviceRes.status ? common_1.HttpStatus.OK : common_1.HttpStatus.ACCEPTED)
                .json(serviceRes);
        }
        catch (err) {
            throw new common_1.HttpException('Lỗi controller', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Request, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lấy toàn bộ danh sách sản phẩm thành công.',
        type: find_product_dtc_1.FindProductDto,
        isArray: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 202,
        description: 'Lấy toàn bộ danh sách sản phẩm thất bại.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Lỗi call apis.',
    }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('productName'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Tìm sản phẩm thành công.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 202,
        description: 'Tìm sản phẩm thất bại.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Lỗi call apis.',
    }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findByName", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Xoá sản phẩm thành công.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 202,
        description: 'Xoá sản phẩm thất bại.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Lỗi call apis.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "remove", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map