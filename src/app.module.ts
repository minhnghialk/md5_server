/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { UserAddressesModule } from './modules/user-addresses/user-addresses.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProductsModule } from './modules/products/products.module';
import { ProductPicturesModule } from './modules/product_pictures/product_pictures.module';
import { SocketModule } from './socket/socket.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { ReceiptsModule } from './modules/receipts/receipts.module';
import { ReceiptDetailModule } from './modules/receipt-detail/receipt-detail.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // load env toàn bộ hệ thống
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DBNAME,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    UsersModule,
    UserAddressesModule,
    AuthenticationModule,
    CategoriesModule,
    ProductsModule,
    ProductPicturesModule,
    SocketModule,
    UploadsModule,
    ReceiptsModule,
    ReceiptDetailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
