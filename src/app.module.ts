import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type:'mssql',
      host:process.env.DB_HOST,
      port:+process.env.DB_PORT,
      username:process.env.DB_USER,
      password:process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname+'/**/*.entity{.ts,.js}'],
      synchronize: true,
      driver:require('mssql'),
      requestTimeout:30000,
      extra: {
        trustServerCertificate: true,
      }
  }),
   UsersModule,
    AuthModule,
     RolesModule,
     CategoriesModule,
     ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
