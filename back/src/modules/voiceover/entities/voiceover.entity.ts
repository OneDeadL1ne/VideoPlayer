import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Film } from "src/modules/film/entities/film.entity";

@Table({tableName:"Voiceover", timestamps:false})
export class Voiceover extends Model {

    @PrimaryKey
    @ApiProperty()
    @Column({type:DataType.INTEGER, allowNull:false, autoIncrement:true})
    id_voiceover:number

    @ApiProperty()
    @Column({type:DataType.STRING(50), allowNull:false})
    voiceover_name:string
}

@Table({tableName:"VoiceoverFilm", timestamps:false})
export class VoiceoverFilm extends Model {
    
    @ForeignKey(()=>Film)
    @Column({type:DataType.INTEGER, allowNull:false})
    id_film:number

    @ForeignKey(()=>Voiceover)
    @Column({type:DataType.INTEGER, allowNull:false})
    id_voiceover:number
    
}