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
exports.UserSocketGateway = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const jwt_service_1 = require("../../modules/jwts/jwt.service");
const receipt_detail_entity_1 = require("../../modules/receipt-detail/entities/receipt-detail.entity");
const receipt_entity_1 = require("../../modules/receipts/entities/receipt.entity");
const receipts_enum_1 = require("../../modules/receipts/receipts.enum");
const Repository_1 = require("typeorm/repository/Repository");
let UserSocketGateway = class UserSocketGateway {
    constructor(jwt, receipts, receiptDetail) {
        this.jwt = jwt;
        this.receipts = receipts;
        this.receiptDetail = receiptDetail;
        this.clients = [];
    }
    onModuleInit() {
        this.server.on('connect', async (socket) => {
            console.log('đã có người connect');
            this.server.on('disconnect', () => {
                this.clients = this.clients.filter((client) => client.socket.id !== socket.id);
            });
            const token = String(socket.handshake.query.token);
            const user = this.jwt.verifyToken(token);
            if (token === 'undefined' || !user) {
                socket.emit('connectStatus', {
                    status: false,
                    message: 'Đăng nhập thất bại',
                });
                socket.disconnect();
            }
            else {
                this.clients.push({
                    user,
                    socket,
                });
                socket.emit('connectStatus', {
                    status: true,
                    message: 'Đăng nhập thành công',
                });
                socket.emit('receiveUserData', user);
                const receipt = await this.findReceipByAuthId({
                    userId: user.id,
                    guestId: null,
                });
                console.log('receipt', receipt);
                socket.emit('receiveReceipt', receipt ? receipt : []);
                const cart = await this.getCartByUserId(user.id);
                if (cart) {
                    socket.emit('receiveCart', cart);
                }
                socket.on('addToCart', async (newItem) => {
                    console.log('addToCart - newItem', newItem);
                    const newCart = await this.addToCart(newItem);
                    console.log('addToCart - newCart', newCart);
                    if (newCart) {
                        socket.emit('onUpdateCart', newCart);
                    }
                });
                console.log('cart', cart);
            }
        });
    }
    async findReceipByAuthId(data) {
        try {
            if (data.userId === null && data.guestId === null)
                return false;
            const receipts = await this.receipts.find({
                where: data.userId
                    ? {
                        userId: data.userId,
                    }
                    : {
                        guestId: data.guestId,
                    },
                relations: {
                    detail: {
                        product: true,
                    },
                },
            });
            console.log('receipts', receipts);
            if (!receipts)
                return false;
            if (receipts.length === 0)
                return false;
            return receipts;
        }
        catch (err) {
            console.log('err', err);
            return false;
        }
    }
    async getCartByUserId(userId) {
        console.log('da vao');
        try {
            console.log('da vao toi 1');
            const oldCart = await this.receipts.find({
                where: {
                    userId,
                    status: receipts_enum_1.ReceiptStatus.SHOPPING,
                },
                relations: {
                    detail: {
                        product: true,
                    },
                },
            });
            console.log('da vao toi 2');
            if (!oldCart || oldCart.length == 0) {
                const newCartChema = this.receipts.create({
                    userId,
                });
                const newCart = await this.receipts.save(newCartChema);
                if (!newCart)
                    return false;
                const newCartRelation = await this.receipts.findOne({
                    where: {
                        id: newCart.id,
                    },
                    relations: {
                        detail: {
                            product: true,
                        },
                    },
                });
                if (!newCartRelation)
                    return false;
                return newCartRelation;
            }
            console.log('da vao toi 3', oldCart);
            return oldCart[0];
        }
        catch (err) {
            console.log('err', err);
            return false;
        }
    }
    async addToCart(newItem) {
        try {
            const items = await this.receiptDetail.find({
                where: {
                    receiptId: newItem.receiptId,
                },
            });
            console.log('addToCart - items', items);
            if (!items)
                return false;
            if (items.length === 0) {
                await this.receiptDetail.save(newItem);
            }
            else {
                const currentItem = items.find((item) => item.productId === newItem.productId);
                if (currentItem) {
                    const itemUpdate = this.receiptDetail.merge(currentItem, {
                        quantity: newItem.quantity,
                    });
                    await this.receiptDetail.save(itemUpdate);
                }
                else {
                    await this.receiptDetail.save(newItem);
                }
            }
            const updateCart = await this.receipts.findOne({
                where: {
                    id: newItem.receiptId,
                },
                relations: {
                    detail: {
                        product: true,
                    },
                },
            });
            console.log('updateCart.detail', updateCart.detail);
            if (!updateCart)
                return false;
            return updateCart;
        }
        catch (err) {
            console.log('addToCart - err', err);
            return false;
        }
    }
};
exports.UserSocketGateway = UserSocketGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], UserSocketGateway.prototype, "server", void 0);
exports.UserSocketGateway = UserSocketGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(3001, { cors: true }),
    __param(1, (0, typeorm_1.InjectRepository)(receipt_entity_1.Receipt)),
    __param(2, (0, typeorm_1.InjectRepository)(receipt_detail_entity_1.ReceiptDetail)),
    __metadata("design:paramtypes", [jwt_service_1.JwtService,
        Repository_1.Repository,
        Repository_1.Repository])
], UserSocketGateway);
//# sourceMappingURL=user.socket.js.map