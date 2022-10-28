import { Module } from '@nestjs/common';
import { ProductModule } from './products/modules/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './typeorm/entities/products.entity';
//main module of the app that will import other modules 
@Module({
  //automatic migration when running npm start 
  //synchronize: true - triggers the automatic migration of tables and colums
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'nestjs_training',
    entities: [Product],
    synchronize: true,
    
  }),
  ProductModule],

})
export class AppModule {}
