import { Module } from "@nestjs/common";
import { Product } from "src/typeorm/entities/products.entity";
import { ProductController } from "../controllers/products.controller";
import { ProductService } from "../services/products.service";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    controllers: [ProductController],
    providers:[ProductService]
})

//use export so other file can use class
export class ProductModule {}