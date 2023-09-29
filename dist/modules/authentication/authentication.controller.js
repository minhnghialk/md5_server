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
exports.AuthenticationController = void 0;
const common_1 = require("@nestjs/common");
const authentication_service_1 = require("./authentication.service");
const users_service_1 = require("./../users/users.service");
const authentication_dto_1 = require("./dto/authentication.dto");
const jwt_service_1 = require("../jwts/jwt.service");
let AuthenticationController = class AuthenticationController {
    constructor(authenticationService, usersService, jwt) {
        this.authenticationService = authenticationService;
        this.usersService = usersService;
        this.jwt = jwt;
    }
    async memberAuthentication(authenticationDto, res) {
        try {
            const userDecode = this.jwt.verifyToken(authenticationDto.token);
            if (userDecode) {
                const serResUser = await this.usersService.findById(userDecode.id);
                if (serResUser.status) {
                    if (userDecode.updateAt == serResUser.data.updateAt) {
                        return res.status(200).json(serResUser);
                    }
                }
            }
            return res.status(213).json({
                message: 'Authen failed!',
            });
        }
        catch {
            return res.status(500).json({
                message: 'Lỗi controller',
            });
        }
    }
};
exports.AuthenticationController = AuthenticationController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authentication_dto_1.AuthenticationDto, Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "memberAuthentication", null);
exports.AuthenticationController = AuthenticationController = __decorate([
    (0, common_1.Controller)('authentication'),
    __metadata("design:paramtypes", [authentication_service_1.AuthenticationService,
        users_service_1.UsersService,
        jwt_service_1.JwtService])
], AuthenticationController);
//# sourceMappingURL=authentication.controller.js.map