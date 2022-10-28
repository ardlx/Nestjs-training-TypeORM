import {  HttpException, 
          HttpStatus, 
          Controller, 
          Post, 
          Body, 
          Get, 
          Param, 
          Patch, 
          Delete, 
          Res
        } from '@nestjs/common';
import { ProductService } from '../services/products.service'
import { ApiTags } from '@nestjs/swagger'
import { CreateProductDto } from '../dto/create-product.dto'
import { UpdateProductDto } from '../dto/update-product.dto'
import { BaseController } from '../../../core/controller'
import { Response, Request } from 'express'


//responsible in handling request
//controller will need to call the service
//controller will receive a request from internet for instance, a post request
//it will call a function in service class and return its result back to browser

@ApiTags('Product')
@Controller('products')
export class ProductController extends BaseController{
    constructor(private productService: ProductService){
      super()
    }
    //dependency injection : sample to call function from service

        @Post()
        async addProduct(
          @Body() data: CreateProductDto,
          @Res() res: Response ){
            const result = await this.productService.insertProduct(data)
            return this.createdResponse(res, result)
          }
      
        @Get()
        async getAllProducts(@Res() res: Response) {
          const result = await this.productService.getProducts()
            return this.retrievedResponse(res, result)
          }
      
        @Get(':prodId')
        async getProduct(
          @Param('prodId') prodId: string, 
          @Res() res: Response) {
            const result = await this.productService.getSingleProduct(prodId)
            if(!result) throw new HttpException('Product Not Found!', HttpStatus.BAD_REQUEST)

            return this.retrievedResponse(res, result)
          }
      
        @Patch(':prodId')
        async updateProduct(
          @Param('prodId') prodId: string,
          @Body() updateProductDto: UpdateProductDto,
          @Res() res: Response){
            const result = await this.productService.updateProduct(prodId, updateProductDto)
            console.log(result)
            return this.updatedResponse(res, result)
          }
      
        @Delete(':prodId')
        async removeProduct(
          @Param('prodId') prodId: string,
          @Res() res: Response){
            await this.productService.deleteProduct(prodId)
            return  this.deletedResponse(res,[])
        }
      }