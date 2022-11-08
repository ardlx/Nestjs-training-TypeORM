import { Injectable } from '@nestjs/common'
import { CreateProductDto } from '../dto/create-product.dto'
import { UpdateProductDto } from '../dto/update-product.dto'
import { v4 as uuidv4 } from 'uuid'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { Product } from 'src/typeorm/entities/products.entity'
 
//typeORM function like create is already asynchronous so no need to await
@Injectable({})
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ){}

    insertProduct(data: CreateProductDto) {
      const newProdId = uuidv4()
      const newProduct = this.productRepository.create({
        ...data,
        prodId: newProdId,
        createdAt: new Date()
      })
      return this.productRepository.save(newProduct)
    }

    //pass params for dynamic condition in controller
    getProducts(params?: FindManyOptions) {
      return this.productRepository.find(params);
    }
    
    getSingleProduct(prodId: string)  {
      return this.productRepository.findOne({where: {
        prodId: prodId
      }});
    }
    
    updateProduct(prodId: string, dto: UpdateProductDto) {
      return this.productRepository.update(
        {prodId},
        {...dto, updatedAt: new Date()}
      )
    }
    
    deleteProduct(prodId: string) {
      return this.productRepository.delete({prodId})
  }
    
}