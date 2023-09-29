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
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const categories_service_1 = require("./categories.service");
const create_category_dto_1 = require("./dto/create-category.dto");
const update_category_dto_1 = require("./dto/update-category.dto");
const swagger_1 = require("@nestjs/swagger");
const find_category_dto_1 = require("./dto/find-category.dto");
let CategoriesController = class CategoriesController {
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    async create(createCategoryDto, res) {
        try {
            const [status, message, data] = await this.categoriesService.create(createCategoryDto);
            return res.status(status ? 200 : 213).json([message, data]);
        }
        catch (err) {
            return res.status(500).json({
                message: 'Lỗi controller',
            });
        }
    }
    async findAll(res) {
        try {
            const serviceRes = await this.categoriesService.findAll();
            console.log('serviceRes', serviceRes);
            return res
                .status(serviceRes.status ? common_1.HttpStatus.OK : common_1.HttpStatus.ACCEPTED)
                .json(serviceRes);
        }
        catch (err) {
            throw new common_1.HttpException('Lỗi xử lý yêu cầu', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    findOne(id) {
        return this.categoriesService.findOne(+id);
    }
    update(id, updateCategoryDto) {
        return this.categoriesService.update(+id, updateCategoryDto);
    }
    remove(id) {
        return this.categoriesService.remove(+id);
    }
};
exports.CategoriesController = CategoriesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDto, Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lấy toàn bộ danh mục sản phẩm thành công.',
        type: find_category_dto_1.FindCategoryDto,
        isArray: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 202,
        description: 'Lấy toàn bộ danh mục thất bại.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Lỗi call apis.',
    }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "remove", null);
exports.CategoriesController = CategoriesController = __decorate([
    (0, common_1.Controller)('categories'),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesController);
//# sourceMappingURL=categories.controller.js.map