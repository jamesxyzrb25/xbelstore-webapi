import { IsNotEmpty, IsString } from "class-validator";

export class UpdateCategoryDto{
    //@IsNotEmpty()
    //@IsString()
    name?:string;

    //@IsNotEmpty()
    //@IsString()
    description?:string;

}