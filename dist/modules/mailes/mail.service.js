"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = exports.templates = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
const emailConfirm_1 = require("./templates/emailConfirm");
const sendOtp_1 = require("./templates/sendOtp");
exports.templates = {
    emailConfirm: emailConfirm_1.default,
    sendOtp: sendOtp_1.default,
};
let MailService = class MailService {
    async sendMail(mailOption) {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.MS_USER,
                    pass: process.env.MS_PW,
                },
            });
            await transporter.sendMail({
                from: process.env.MS_USER,
                ...mailOption,
            });
            return true;
        }
        catch (err) {
            return false;
        }
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)()
], MailService);
//# sourceMappingURL=mail.service.js.map