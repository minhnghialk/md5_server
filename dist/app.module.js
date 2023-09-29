"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("./modules/users/users.module");
const user_addresses_module_1 = require("./modules/user-addresses/user-addresses.module");
const authentication_module_1 = require("./modules/authentication/authentication.module");
const categories_module_1 = require("./modules/categories/categories.module");
const products_module_1 = require("./modules/products/products.module");
const product_pictures_module_1 = require("./modules/product_pictures/product_pictures.module");
const socket_module_1 = require("./socket/socket.module");
const uploads_module_1 = require("./modules/uploads/uploads.module");
const receipts_module_1 = require("./modules/receipts/receipts.module");
const receipt_detail_module_1 = require("./modules/receipt-detail/receipt-detail.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.MYSQL_HOST,
                port: Number(process.env.MYSQL_PORT),
                username: process.env.MYSQL_USERNAME,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DBNAME,
                entities: ['dist/**/*.entity{.ts,.js}'],
                synchronize: true,
            }),
            users_module_1.UsersModule,
            users_module_1.UsersModule,
            user_addresses_module_1.UserAddressesModule,
            authentication_module_1.AuthenticationModule,
            categories_module_1.CategoriesModule,
            products_module_1.ProductsModule,
            product_pictures_module_1.ProductPicturesModule,
            socket_module_1.SocketModule,
            uploads_module_1.UploadsModule,
            receipts_module_1.ReceiptsModule,
            receipt_detail_module_1.ReceiptDetailModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map