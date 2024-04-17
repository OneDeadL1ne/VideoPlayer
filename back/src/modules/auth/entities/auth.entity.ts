import { Model, Table } from 'sequelize-typescript';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  PrimaryKey,
} from 'sequelize-typescript';

import { sign } from 'jsonwebtoken';
import { User } from 'src/modules/user/entities/user.entity';

@Table({tableName:"Auth", timestamps:false})
export class Auth extends Model<Auth> {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true })
  id_auth: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  id_user: number;

  @BelongsTo(() => User)
  user: User;

  @Column({ type: DataType.STRING, allowNull: false })
  user_agent: string;

  @Column({ type: DataType.STRING, allowNull: false })
  ip_address: string;

  sign(): string {
    return sign({ ...this }, process.env.REFRESH_SECRET);
  }
}
