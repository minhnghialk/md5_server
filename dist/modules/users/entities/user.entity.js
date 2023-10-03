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
exports.User = void 0;
const user_address_entity_1 = require("../../user-addresses/entities/user-address.entity");
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const users_enum_1 = require("../users.enum");
const receipt_entity_1 = require("../../receipts/entities/receipt.entity");
let User = class User {
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
    async setUpdateTime() {
        this.updateAt = String(Date.now());
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 'https://png.pngtree.com/png-clipart/20210608/ourmid/pngtree-gray-silhouette-avatar-png-image_3418406.jpg',
    }),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 150 }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "emailAuthentication", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 20 }),
    __metadata("design:type", String)
], User.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "hashPassword", null);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: users_enum_1.UserRole, default: users_enum_1.UserRole.MEMBER }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: users_enum_1.UserStatus, default: users_enum_1.UserStatus.ACTIVE }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: String(Date.now()),
    }),
    __metadata("design:type", String)
], User.prototype, "createAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: String(Date.now()),
    }),
    __metadata("design:type", String)
], User.prototype, "updateAt", void 0);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "setUpdateTime", null);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_address_entity_1.UserAddresses, (userAddresses) => userAddresses.user),
    __metadata("design:type", Array)
], User.prototype, "userAddresses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => receipt_entity_1.Receipt, (receipt) => receipt.user),
    __metadata("design:type", Array)
], User.prototype, "receipts", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
//# sourceMappingURL=user.entity.js.map