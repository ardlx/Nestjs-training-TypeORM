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
//extends to global HTTP status and response message
export class ProductController extends BaseController{
    constructor(private productService: ProductService){
      super()
    }
    //dependency injection : sample to call function from service

        @Post()
        async create(
          @Body() data: CreateProductDto,
          @Res() res: Response ){
            const result = await this.productService.insertProduct(data)
            return this.createdResponse(res, result)
          }
      
        @Get()
        async getAll(@Res() res: Response) {
          const result = await this.productService.getProducts({
              order: {
                price: 'DESC' // sample condition
            }
          })
            return this.retrievedResponse(res, result)
          }
      
        @Get(':prodId')
        async getSingle(
          @Param('prodId') prodId: string, 
          @Res() res: Response) {
            
            const result = await this.productService.getSingleProduct(prodId)
            if(!result) throw new HttpException('Product Not Found!', HttpStatus.BAD_REQUEST)

            return this.retrievedResponse(res, result)
          }
      
        @Patch(':prodId')
        async update(
          @Param('prodId') prodId: string,
          @Body() updateProductDto: UpdateProductDto,
          @Res() res: Response){
            const result = await this.productService.updateProduct(prodId, updateProductDto)
            return this.updatedResponse(res, result)
          }
      
        @Delete(':prodId')
        async delete(
          @Param('prodId') prodId: string,
          @Res() res: Response){
            await this.productService.deleteProduct(prodId)
            return  this.deletedResponse(res,[])
        }
      }