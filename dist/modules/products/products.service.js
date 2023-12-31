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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entities/product.entity");
let ProductsService = class ProductsService {
    constructor(products) {
        this.products = products;
    }
    async create(createProductDto) {
        console.log('da vao');
        try {
            const newProduct = this.products.create(createProductDto);
            console.log('newProduct', newProduct);
            const result = await this.products.save(newProduct);
            return {
                status: true,
                data: result,
                message: 'Product created successfully',
            };
        }
        catch (err) {
            return {
                status: false,
                data: null,
                message: 'Lỗi service',
            };
        }
    }
    async findAll() {
        try {
            const result = await this.products.find();
            console.log('result', result);
            return {
                status: true,
                data: result,
                message: 'Get all products successfully',
            };
        }
        catch (err) {
            console.log('create product', err);
            return {
                status: false,
                data: null,
                message: 'Lỗi service',
            };
        }
    }
    async findByName(searchString) {
        try {
            console.log('searchString', searchString);
            const result = await this.products.find({
                where: {
                    name: (0, typeorm_2.ILike)(`%${searchString}%`),
                },
            });
            return {
                status: true,
                data: result,
                message: 'Find product by name successfully',
            };
        }
        catch (err) {
            throw new common_1.HttpException('Lỗi Service', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async update(id, updateProductDto) {
        try {
            const currentProduct = await this.products.findOne({
                where: {
                    id: +id,
                },
            });
            const updateProduct = await this.products.merge(currentProduct, updateProductDto);
            console.log('updateProduct', updateProduct);
            const result = await this.products.save(updateProduct);
            return {
                status: true,
                data: result,
                message: 'Product created successfully',
            };
        }
        catch (err) {
            return {
                status: false,
                data: null,
                message: 'Lỗi service',
            };
        }
    }
    async remove(id) {
        try {
            console.log('remove', id);
            const result = await this.products.delete(id);
            return {
                status: true,
                data: result,
                message: 'Removed #${id} product successfully',
            };
        }
        catch (err) {
            console.log('remove - err', err);
            return {
                status: false,
                data: null,
                message: 'Lỗi service',
            };
        }
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductsService);
//# sourceMappingURL=products.service.js.map