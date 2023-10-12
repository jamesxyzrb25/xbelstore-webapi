//import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterAuthDto{
    
    @IsNotEmpty()
    @IsString()
    dni:string;
    //@ApiProperty()
    @IsNotEmpty()
    @IsString()
    name:string;

    //@ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastname:string;

    //@ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsEmail({}, {message:'El email no es valido'})
    email:string;

    //@ApiProperty()
    @IsNotEmpty()
    @IsString()
    phone:string;

    //@ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(6, {message:"La contraseña debe tenera al menos 6 caracteres"})
    password:string;

    
    rolesIds:string[];
}