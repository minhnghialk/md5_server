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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const mail_service_1 = require("../mailes/mail.service");
const jwt_service_1 = require("../jwts/jwt.service");
const login_dto_1 = require("./dto/login.dto");
const bcrypt = require("bcrypt");
const change_password_dto_1 = require("./dto/change-password.dto");
const reset_password_dto_1 = require("./dto/reset-password.dto");
const common_2 = require("../../utils/common");
let UsersController = class UsersController {
    constructor(usersService, mail, jwt) {
        this.usersService = usersService;
        this.mail = mail;
        this.jwt = jwt;
    }
    async changePassword(changePasswordDto, req, res) {
        try {
            const userDecode = this.jwt.verifyToken(String(req.headers.token));
            if (userDecode) {
                const serResUser = await this.usersService.findById(userDecode.id);
                if (serResUser.data.updateAt == userDecode.updateAt) {
                    if (serResUser.status) {
                        if (await bcrypt.compare(changePasswordDto.oldPassword, userDecode.password)) {
                            await this.mail.sendMail({
                                subject: 'Thay đổi mật khẩu',
                                to: userDecode.email,
                                html: `
                  <h2>Mật khẩu của bạn sẽ bị thay đổi nếu bấm vào link bên dưới</h2>
                  <a href='${process.env.HOST}:${process.env.PORT}/api/v1/users/authentication-change-password/${this.jwt.createToken({
                                    ...serResUser.data,
                                    newPassword: changePasswordDto.newPassword,
                                }, '300000')}'>Xác Nhận</a>
                `,
                            });
                            return res.status(200).json({
                                message: 'Kiểm tra email để xác nhận đổi mật khẩu!',
                            });
                        }
                        else {
                            return res.status(213).json({
                                message: 'Mật khẩu không chính xác!',
                            });
                        }
                    }
                }
            }
            return res.status(213).json({
                message: 'Xác thực thất bại!',
            });
        }
        catch (err) {
            return res.status(500).json({
                message: 'Server Controller Error!',
            });
        }
    }
    async resetPassword(resetPasswordDto, res) {
        try {
            const serResUser = await this.usersService.findByUserNameOrEmail(resetPasswordDto.email);
            if (serResUser) {
                await this.mail.sendMail({
                    subject: 'Khôi phục mật khẩu',
                    to: resetPasswordDto.email,
                    html: `
              <h2>Xác nhận email để nhận mật khẩu khôi phục</h2>
              <a href='${process.env.HOST}:${process.env.PORT}/api/v1/users/authentication-reset-password/${this.jwt.createToken(serResUser.data, '300000')}'>Xác Nhận</a>
            `,
                });
                return res.status(200).json({
                    message: 'Check email!',
                });
            }
        }
        catch (err) {
            return res.status(500).json({
                message: 'Server Controller Error!',
            });
        }
    }
    async authenticationResetPassword(token, res) {
        try {
            const userDecode = this.jwt.verifyToken(String(token));
            if (userDecode) {
                const serResUser = await this.usersService.findById(userDecode.id);
                if (serResUser.data.updateAt == userDecode.updateAt) {
                    if (serResUser.status) {
                        if (serResUser.data.updateAt == userDecode.updateAt) {
                            const randomPassword = common_2.default.generateOTP();
                            const serUpdateUser = await this.usersService.update(userDecode.id, {
                                password: await bcrypt.hash(randomPassword, 10),
                            });
                            if (serUpdateUser.status) {
                                await this.mail.sendMail({
                                    subject: 'Khôi phục mật khẩu',
                                    to: userDecode.email,
                                    html: `
                    <h2>Mật khẩu của bạn là</h2>
                    <span>${randomPassword}</span>
                  `,
                                });
                                return res.status(200).send('Check your mail!');
                            }
                        }
                    }
                }
            }
            return res.status(213).json({
                message: 'Xác thực thất bại!',
            });
        }
        catch (err) {
            return res.status(500).json({
                message: 'Server Controller Error!',
            });
        }
    }
    async authenticationChangePassword(token, res) {
        try {
            const userDecode = this.jwt.verifyToken(String(token));
            if (userDecode) {
                const serResUser = await this.usersService.findById(userDecode.id);
                if (serResUser.data.updateAt == userDecode.updateAt) {
                    if (serResUser.status) {
                        if (serResUser.data.updateAt == userDecode.updateAt) {
                            const serUpdateUser = await this.usersService.update(userDecode.id, {
                                password: await bcrypt.hash(userDecode.newPassword, 10),
                            });
                            if (serUpdateUser.status) {
                                return res.status(200).send('Change Password Ok!');
                            }
                        }
                    }
                }
            }
            return res.status(213).json({
                message: 'Xác thực thất bại!',
            });
        }
        catch (err) {
            return res.status(500).json({
                message: 'Server Controller Error!',
            });
        }
    }
    async emailAuthentication(userId, token, res) {
        try {
            const userDecode = this.jwt.verifyToken(token);
            const serResUser = await this.usersService.findById(userId);
            if (serResUser.status && userDecode) {
                if (serResUser.data.updateAt == userDecode.updateAt) {
                    if (!serResUser.data.emailAuthentication) {
                        const serRes = await this.usersService.update(userId, {
                            emailAuthentication: true,
                        });
                        console.log('serRes', serRes);
                        if (serRes.status) {
                            this.mail.sendMail({
                                subject: 'Authentication Email Notice',
                                to: serRes.data.email,
                                text: `Email đã được liên kết với tài khoản ${serRes.data.userName}`,
                            });
                        }
                        return res
                            .status(serRes.status ? 200 : 213)
                            .send(serRes.status ? 'ok' : 'fail');
                    }
                    else {
                        return res.status(213).send('Tài khoản đã kích hoạt email!');
                    }
                }
            }
            return res.status(213).send('Email đã hết hạn!');
        }
        catch (err) {
            return res.status(500).json({
                message: 'Server Controller Error!',
            });
        }
    }
    async resendEmail(req, res) {
        try {
            const userDecode = this.jwt.verifyToken(String(req.headers.token));
            const serResUser = await this.usersService.findById(userDecode.id);
            if (serResUser.status && userDecode) {
                if (serResUser.data.updateAt == userDecode.updateAt) {
                    if (!serResUser.data.emailAuthentication) {
                        const check = await this.mail.sendMail({
                            subject: 'Authentication Email',
                            to: serResUser.data.email,
                            html: mail_service_1.templates.emailConfirm({
                                confirmLink: `${process.env.HOST}:${process.env.PORT}/api/v1/users/email-authentication/${serResUser.data.id}/${this.jwt.createToken(serResUser.data, '300000')}`,
                                language: 'vi',
                                productName: 'MN Store',
                                productWebUrl: 'mnstore.com',
                                receiverName: `${serResUser.data.firstName} ${serResUser.data.lastName}`,
                            }),
                        });
                        console.log('check', check);
                        return res.status(200).send('Check email');
                    }
                    else {
                        return res.status(213).send('Tài khoản đã kích hoạt email!');
                    }
                }
            }
            return res.status(213).send('Xác thực thất bại');
        }
        catch (err) {
            return res.status(500).json({
                message: 'Server Controller Error!',
            });
        }
    }
    async login(loginDto, res) {
        try {
            const serRes = await this.usersService.findByUserNameOrEmail(loginDto.userNameOrEmail);
            if (!serRes.status) {
                return res.status(213).json({
                    message: 'Không tìm thấy tài khoản',
                });
            }
            if (serRes.data.status != 'ACTIVE') {
                return res.status(213).json({
                    message: `Tài khoản bị ${serRes.data.status}`,
                });
            }
            if (!(await bcrypt.compare(loginDto.password, serRes.data.password))) {
                return res.status(213).json({
                    message: 'Mật khẩu không chính xác',
                });
            }
            this.mail.sendMail({
                subject: 'Register Authentication Email',
                to: serRes.data.email,
                text: `Tài khoản của bạn vừa được login ở một thiết bị mới`,
            });
            return res.status(200).json({
                token: this.jwt.createToken(serRes.data, '1d'),
            });
        }
        catch (err) {
            return res.status(500).json({
                message: 'Server Controller Error!',
            });
        }
    }
    async register(createUserDto, res) {
        try {
            const serRes = await this.usersService.register(createUserDto);
            console.log('id', serRes.data.id);
            if (serRes.status) {
                this.mail.sendMail({
                    subject: 'Register Authentication Email',
                    to: serRes.data.email,
                    html: mail_service_1.templates.emailConfirm({
                        confirmLink: `${process.env.HOST}:${process.env.PORT}/api/v1/users/email-authentication/${serRes.data.id}/${this.jwt.createToken(serRes.data, '300000')}`,
                        language: 'vi',
                        productName: 'MN Store',
                        productWebUrl: 'mnstore.com',
                        receiverName: `${serRes.data.firstName} ${serRes.data.lastName}`,
                    }),
                });
            }
            return res.status(serRes.status ? 200 : 213).json(serRes);
        }
        catch (err) {
            return res.status(500).json({
                message: 'Server Controller Error!',
            });
        }
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)('change-password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [change_password_dto_1.ChangePasswordDto, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Get)('authentication-reset-password/:token'),
    __param(0, (0, common_1.Param)('token')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "authenticationResetPassword", null);
__decorate([
    (0, common_1.Get)('authentication-change-password/:token'),
    __param(0, (0, common_1.Param)('token')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "authenticationChangePassword", null);
__decorate([
    (0, common_1.Get)('email-authentication/:userId/:token'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('token')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "emailAuthentication", null);
__decorate([
    (0, common_1.Get)('resend-email'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "resendEmail", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "register", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        mail_service_1.MailService,
        jwt_service_1.JwtService])
], UsersController);
//# sourceMappingURL=users.controller.js.map