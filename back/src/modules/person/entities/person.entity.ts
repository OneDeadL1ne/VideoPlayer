import { ApiProperty } from '@nestjs/swagger'
import { NonAttribute } from 'sequelize'
import {  BelongsTo, ForeignKey,  HasMany,  Model, Table } from 'sequelize-typescript'
import { Column, DataType, PrimaryKey } from 'sequelize-typescript'
import { AppStrings } from 'src/constants/strings'
import { Gender } from 'src/modules/gender/entities/gender.entity'
import { User } from 'src/modules/user/entities/user.entity'


@Table({tableName:"Person", timestamps:false})
export class Person extends Model {
  @PrimaryKey
  @ApiProperty()
  @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true })
  id_person: number

  @ApiProperty({ example: AppStrings.PERSON_LAST_NAME_EXAMPLE, description: AppStrings.PERSON_LAST_NAME_DESCRIPTION })
  @Column({ type: DataType.STRING(50), allowNull: false })
  last_name: string

  @ApiProperty({ example: AppStrings.PERSON_FIRST_NAME_EXAMPLE, description: AppStrings.PERSON_FIRST_NAME_DESCRIPTION })
  @Column({ type: DataType.STRING(50), allowNull: false })
  first_name: string

  @ApiProperty({ example: AppStrings.PERSON_PATRONYMIC_NAME_EXAMPLE, description: AppStrings.PERSON_PATRONYMIC_NAME_DESCRIPTION })
  @Column({ type: DataType.STRING(50), defaultValue: '' })
  patronymic: string

  @ApiProperty({
    example: AppStrings.PHONE_EXAMPLE,
    description: AppStrings.PHONE_DESCRIPTION,
  })
  @Column({ type: DataType.STRING(12) })
  phone: string

  @ForeignKey(()=>Gender)
  @ApiProperty({
    type: () => Gender,
    description: AppStrings.GENDER,
  })  
  @Column({ type: DataType.INTEGER, allowNull: false })
  id_gender: number

  @BelongsTo(()=>Gender)
  gender:Gender

  @HasMany(()=>User)
  users:NonAttribute<Person[]>  

}
