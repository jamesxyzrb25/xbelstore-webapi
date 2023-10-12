import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository:Repository<User>){

    }

    findAll(){
        return this.userRepository.find({relations: ['roles']});
    }

    async update(id:number, user:UpdateUserDto){
        const userFound = await this.userRepository.findOneBy({id:id});

        if(!userFound){
            throw new HttpException('Usuario no existe', HttpStatus.NOT_FOUND);
        }

        const updateUser = Object.assign(userFound, user);
        return this.userRepository.save(updateUser);
    }
}
