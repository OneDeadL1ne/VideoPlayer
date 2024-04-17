import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { AppStrings } from "src/constants/strings";
import { Film } from "src/modules/film/entities/film.entity";

@Table({tableName:"Actor", timestamps:false})
export class Actor extends Model{

    id_actor:number

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

@Table({tableName:"ActorFilm", timestamps:false})
export class ActorFilm extends Model{

    @ForeignKey(()=>Film)
    @Column({type:DataType.INTEGER, allowNull:false})
    id_film:number

    @ForeignKey(()=>Actor)
    @Column({type:DataType.INTEGER, allowNull:false})
    id_actor:number

    @Column({type:DataType.INTEGER, allowNull:true})
    position_role?:number
}
