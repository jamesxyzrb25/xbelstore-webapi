import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {

    constructor(
        @InjectRepository(Category) private categoryRepository:Repository<Category>
    ){}

    findAll(){
        return this.categoryRepository.find();
    }

    async create(category:CreateCategoryDto){
        let newCategory = this.categoryRepository.create(category);
        return this.categoryRepository.save(newCategory);
    }

    async update(id:number, category:UpdateCategoryDto){
        const categoryFound = await this.categoryRepository.findOneBy({id:id});
        if(!categoryFound){
            throw new HttpException('La categoria no existe', HttpStatus.NOT_FOUND)
        }

        const updateCategory = Object.assign(categoryFound, category);
        return this.categoryRepository.save(updateCategory);
    }

    async delete(id:number){
        const categoryFound = await this.categoryRepository.findOneBy({id:id});
        if(!categoryFound){
            throw new HttpException('La categoria no existe', HttpStatus.NOT_FOUND)
        }

        return this.categoryRepository.delete(id);
    }

}
