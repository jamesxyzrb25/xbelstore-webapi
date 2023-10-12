import { IsString } from "class-validator";


export class UpdateUserDto{

    
    @IsString()
    name?:string;

    lastname:string;
    phone:string;
}