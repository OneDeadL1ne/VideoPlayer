import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Film } from "src/modules/film/entities/film.entity";

@Table({timestamps:false, tableName:"Agelimit"})
export class Agelimit extends Model {

    @PrimaryKey
    @ApiProperty()
    @Column({type: DataType.INTEGER, allowNull: false, autoIncrement: true })
    id_age_limit:number

    @ApiProperty()
    @Column({type:DataType.STRING(50), allowNull:false})
    age_limit_name:string

    @HasMany(()=>Film)
    films:Film[]
}
