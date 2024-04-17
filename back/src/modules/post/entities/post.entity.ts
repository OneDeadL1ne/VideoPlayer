import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";

import { Film } from "src/modules/film/entities/film.entity";
import { User, UserPost } from "src/modules/user/entities/user.entity";
@Table({tableName:"Post", timestamps:false})
export class Post extends Model {

    @PrimaryKey
    @ApiProperty()
    @Column({type: DataType.INTEGER, allowNull: false, autoIncrement: true })
    id_post:number

    @ForeignKey(()=>User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    id_user:number

    @BelongsTo(()=>User)
    user:User

    @ForeignKey(()=>Film)
    @Column({ type: DataType.INTEGER, allowNull: false })
    id_film:number

    @BelongsTo(()=>Film)
    film:Film

    @ApiProperty()
    @Column({type:DataType.STRING(500), allowNull:false})
    description:string

    @ApiProperty()
    @Column({type:DataType.INTEGER, allowNull:false})
    rating:number

    @ApiProperty()
    @Column({type:DataType.DATE, allowNull:false})
    data_create:Date

    @ApiProperty()
    @Column({type:DataType.DATE, allowNull:true})
    data_public?:Date

    @ApiProperty()
    @Column({type:DataType.INTEGER, allowNull:false, defaultValue:0})
    likes:number

    @ApiProperty()
    @Column({type:DataType.INTEGER, allowNull:false, defaultValue:0})
    dislike:number

    @ApiProperty()
    @Column({type:DataType.BOOLEAN, allowNull:false, defaultValue:false})
    approved:boolean

    @ApiProperty()
    @Column({type:DataType.BOOLEAN, allowNull:false, defaultValue:false})
    is_deleted:boolean

    
    @BelongsToMany(()=>User, ()=>UserPost)  
    reactions:Array<User & {UserPost:UserPost}>
}


