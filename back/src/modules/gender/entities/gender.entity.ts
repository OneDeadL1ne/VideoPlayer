import { ApiProperty } from "@nestjs/swagger";
import { NonAttribute } from "sequelize";
import {  Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Person } from "src/modules/person/entities/person.entity";

@Table({tableName:"Gender", timestamps:false})
export class Gender extends Model {
    @PrimaryKey
    @ApiProperty()
    @Column({type:DataType.INTEGER, allowNull:false, autoIncrement:true})
    id_gender:number

    
    @ApiProperty()
    @Column({type:DataType.STRING(50), allowNull:false})
    gender_name:string

    @HasMany(()=>Person)
    persons:NonAttribute<Person[]>    
}
