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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const validation_1 = require("../../utils/validation");
let UsersService = class UsersService {
    constructor(users) {
        this.users = users;
    }
    async register(createUserDto) {
        try {
            const newUser = this.users.create(createUserDto);
            const result = await this.users.save(newUser);
            return {
                status: true,
                data: result,
                message: 'Register ok!',
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
    async update(userId, updateUserDto) {
        try {
            const userSource = await this.users.findOne({
                where: {
                    id: userId,
                },
            });
            const userSourceUpdate = this.users.merge(userSource, updateUserDto);
            const result = await this.users.save(userSourceUpdate);
            return {
                status: true,
                data: result,
                message: 'Update ok!',
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
    async findById(userId) {
        try {
            const result = await this.users.findOne({
                where: {
                    id: userId,
                },
            });
            if (!result) {
                throw new Error();
            }
            return {
                status: true,
                data: result,
                message: 'Find user by id ok!',
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
    async findByUserNameOrEmail(userNameOrEmail) {
        try {
            const result = await this.users.findOne({
                where: validation_1.default.isEmail(userNameOrEmail)
                    ? {
                        email: userNameOrEmail,
                        emailAuthentication: true,
                    }
                    : {
                        userName: userNameOrEmail,
                    },
            });
            if (!result) {
                throw new Error();
            }
            return {
                status: true,
                data: result,
                message: 'Find user ok!',
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
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map