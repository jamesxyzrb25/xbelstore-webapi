import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { HasRoles } from 'src/auth/jwt/has-roles';
import { JwtRole } from 'src/auth/jwt/jwt-role';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { JwtRolesGuard } from 'src/auth/jwt/jwt-roles.guard';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@ApiBearerAuth('Token')
@Controller('products')
@ApiTags("Products")
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

    @HasRoles(JwtRole.ADMIN,JwtRole.CLIENT)
    @UseGuards(JwtAuthGuard,JwtRolesGuard)
    @Get() //http://localhost:3000/products/1 -> put
    findAll() {
        return this.productService.findAll();
    }

    @HasRoles(JwtRole.ADMIN,JwtRole.CLIENT)
    @UseGuards(JwtAuthGuard,JwtRolesGuard)
    @Get('category/:id_category') //http://localhost:3000/products/1 -> put
    findByCategory(@Param('id_category',ParseIntPipe) id_category:number) {
        return this.productService.findByCategory(id_category);
    }

    @HasRoles(JwtRole.ADMIN)
    @UseGuards(JwtAuthGuard,JwtRolesGuard)
    @Post() //http://localhost:3000/products/1 -> put
    @ApiResponse({status:201, description:'Producto creado', type:Product })
    create(@Body() product:CreateProductDto) {
        return this.productService.create(product);
    }

    @HasRoles(JwtRole.ADMIN)
    @UseGuards(JwtAuthGuard,JwtRolesGuard)
    @Put(':id') //http://localhost:3000/products/1 -> put
    update(
        @Param('id', ParseIntPipe) id:number,
        @Body() product:UpdateProductDto
    ) {
        return this.productService.update(id, product);
    }

    @HasRoles(JwtRole.ADMIN)
    @UseGuards(JwtAuthGuard,JwtRolesGuard)
    @Put(':id') //http://localhost:3000/products/1 -> delete
    delete(
        @Param('id', ParseIntPipe) id:number
    ) {
        return this.productService.delete(id);
    }
}
