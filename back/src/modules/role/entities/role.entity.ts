import { ApiProperty } from "@nestjs/swagger";
import { NonAttribute } from "sequelize";
import { Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "src/modules/user/entities/user.entity";

@Table({tableName:"Role", timestamps:false})
export class Role extends Model {
    @PrimaryKey
    @ApiProperty()
    @Column({type:DataType.INTEGER, allowNull:false, autoIncrement:true})
    id_role:number

    
    @ApiProperty()
    @Column({type:DataType.STRING(50), allowNull:false})
    role_name:string

    @HasMany(()=>User)
    users:NonAttribute<User[]>   
}
