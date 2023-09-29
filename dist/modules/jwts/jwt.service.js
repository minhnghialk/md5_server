"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
let JwtService = class JwtService {
    createToken(data, time) {
        try {
            return jwt.sign({
                ...data,
            }, String(process.env.JWT_KEY), { expiresIn: `${time}` });
        }
        catch (err) {
            return false;
        }
    }
    verifyToken(token) {
        let result;
        try {
            jwt.verify(token, String(process.env.JWT_KEY), function (err, decoded) {
                if (err) {
                    result = false;
                }
                else {
                    result = decoded;
                }
            });
            return result;
        }
        catch (err) {
            return false;
        }
    }
};
exports.JwtService = JwtService;
exports.JwtService = JwtService = __decorate([
    (0, common_1.Injectable)()
], JwtService);
//# sourceMappingURL=jwt.service.js.map