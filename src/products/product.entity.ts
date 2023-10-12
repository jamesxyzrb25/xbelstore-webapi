import { ApiProperty } from "@nestjs/swagger";
import { Category } from "src/categories/category.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'products'})
export class Product{

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id:number;

    @ApiProperty()    
    @Column()
    name:string;

    @ApiProperty()
    @Column()
    description:string;

    @ApiProperty()
    @Column()
    id_category:number;

    @ApiProperty()
    @Column()
    price:number;

    @ApiProperty()
    @Column({type:'datetime', default:()=>'CURRENT_TIMESTAMP'})
    created_at:Date;

    @ApiProperty()
    @Column({type:'datetime', default:()=>'CURRENT_TIMESTAMP'})
    updated_at:Date;

    @ManyToOne(()=> Category, (category)=> category.id)
    @JoinColumn({name:'id_category'})
    category:Category;
}