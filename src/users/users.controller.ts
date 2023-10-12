import { Body, Controller, Get, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { HasRoles } from 'src/auth/jwt/has-roles';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtRole } from 'src/auth/jwt/jwt-role';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { JwtRolesGuard } from 'src/auth/jwt/jwt-roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('Token')
@Controller('users')
@ApiTags("Users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

    @HasRoles(JwtRole.ADMIN)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Get()
    FindAll(){
        return this.userService.findAll();
    }

  @HasRoles(JwtRole.CLIENT)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Put(':id') //http://localhost:3000/users/:id
    update(@Param('id', ParseIntPipe) id:number, @Body() user:UpdateUserDto ){
        return this.userService.update(id, user);
    }
}
