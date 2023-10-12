import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@ApiBearerAuth('Token')
@Controller('auth')
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //Endpoint para registrar usuarios
  @Post('register') //http://localhost:5000/auth/register -> POST
  @ApiOperation({
      description:"Crea un nuevo usuario"
  })
  @ApiBody({
      type:RegisterAuthDto,
      description:"Crea un usuario usando RegisterAuthDto"
  })
  @ApiResponse({
      status:201,
      description:"Usuario creado correctamente"
  })
  register(@Body() user:RegisterAuthDto){
      return this.authService.register(user);
  }

  @Post('login') //http://localhost:5000/auth/login -> POST
  login(@Body() loginData:LoginAuthDto){
      console.log('Client data: ',loginData);
      return this.authService.login(loginData);
  }
}
