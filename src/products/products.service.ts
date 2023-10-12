import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) private productRepository:Repository<Product>){}

    findAll(){
        return this.productRepository.find();
    }

    findByCategory(id_category: number){
        return this.productRepository.findBy({id_category:id_category});
    }

    findById(id:number){
        return this.productRepository.findOneBy({id:id});
    }

    async create(product:CreateProductDto){

        const newProduct = this.productRepository.create(product);
        const savedProduct = await this.productRepository.save(newProduct);
        return savedProduct;
    }

    async update(id:number, product:UpdateProductDto){
        const productFound = await this.productRepository.findOneBy({id:id});

        if(!productFound){
            throw new HttpException("Producto no encontrado", HttpStatus.NOT_FOUND);

        }

        const updateProductDto = Object.assign(productFound, product);
        return this.productRepository.save(updateProductDto)
    }

    async delete(id:number){
        const productFound = await this.productRepository.findOneBy({id:id});

        if(!productFound){
            throw new HttpException("Producto no encontrado", HttpStatus.NOT_FOUND);

        }

        return this.productRepository.delete(id)
    }
}
