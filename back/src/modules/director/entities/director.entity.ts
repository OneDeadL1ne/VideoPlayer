import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { AppStrings } from "src/constants/strings";
import { Film } from "src/modules/film/entities/film.entity";

@Table({tableName:"Director", timestamps:false})
export class Director extends Model{

    id_director:number

    @ApiProperty({ example: AppStrings.PERSON_LAST_NAME_EXAMPLE, description: AppStrings.PERSON_LAST_NAME_DESCRIPTION })
    @Column({ type: DataType.STRING(50), allowNull: false })
    last_name: string

    @ApiProperty({ example: AppStrings.PERSON_FIRST_NAME_EXAMPLE, description: AppStrings.PERSON_FIRST_NAME_DESCRIPTION })
    @Column({ type: DataType.STRING(50), allowNull: false })
    first_name: string

    @ApiProperty({ example: AppStrings.PERSON_PATRONYMIC_NAME_EXAMPLE, description: AppStrings.PERSON_PATRONYMIC_NAME_DESCRIPTION })
    @Column({ type: DataType.STRING(50), defaultValue: '' })
    patronymic: string
}

@Table({tableName:"DirectorFilm", timestamps:false})
export class DirectorFilm extends Model{

    @ForeignKey(()=>Film)
    @Column({type:DataType.INTEGER, allowNull:false})
    id_film:number

    @ForeignKey(()=>Director)
    @Column({type:DataType.INTEGER, allowNull:false})
    id_director:number
}
