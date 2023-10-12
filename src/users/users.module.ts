import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Rol } from 'src/roles/rol.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Rol])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
