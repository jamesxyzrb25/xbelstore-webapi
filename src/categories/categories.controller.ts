import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { HasRoles } from 'src/auth/jwt/has-roles';
import { JwtRole } from 'src/auth/jwt/jwt-role';
import { JwtRolesGuard } from 'src/auth/jwt/jwt-roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('Token')
@Controller('categories')
@ApiTags("Categories")
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @HasRoles(JwtRole.ADMIN, JwtRole.CLIENT)
    @UseGuards(JwtAuthGuard,JwtRolesGuard)
    @Get()
    findAll(){
        return this.categoryService.findAll();
    }

    @HasRoles(JwtRole.ADMIN)
    @UseGuards(JwtAuthGuard,JwtRolesGuard)
    @Post() //http://localhost:3000/categories -> POST
    create(@Body() category:CreateCategoryDto
    ) {
        return this.categoryService.create(category);
    }

    @HasRoles(JwtRole.ADMIN)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Put(':id')
    update(@Param('id', ParseIntPipe) id:number, @Body() category:UpdateCategoryDto){
        return this.categoryService.update(id,category);
    }

    @HasRoles(JwtRole.ADMIN)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id:number){
        return this.categoryService.delete(id);
    }
}
