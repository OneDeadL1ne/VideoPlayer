import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Film } from "src/modules/film/entities/film.entity";

@Table({timestamps:false, tableName:"Genre"})
export class Genre extends Model {

    @PrimaryKey
    @ApiProperty()
    @Column({type: DataType.INTEGER, allowNull: false, autoIncrement: true })
    id_genre:number

    @ApiProperty()
    @Column({type:DataType.STRING(50), allowNull:false})
    genre_name:string
}

@Table({tableName:"GenreFilm", timestamps:false})
export class GenreFilm extends Model {

    @ForeignKey(()=>Film)
    @Column({type:DataType.INTEGER, allowNull:false})
    id_film:number
    
    @ForeignKey(()=>Genre)    
    @Column({type:DataType.INTEGER, allowNull:false})
    id_genre:number
}
