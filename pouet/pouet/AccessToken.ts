import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "../prout/User";

export const tableName = "access_tokens";

@Table({
  tableName,
})
export class AccessToken extends Model<AccessToken> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id!: number;

  @Column({ allowNull: false })
  token!: string;

  @Column({ allowNull: false })
  @ForeignKey(() => User)
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @CreatedAt
  @Column({ allowNull: false })
  createdAt!: Date;

  @UpdatedAt
  @Column({ allowNull: false })
  updatedAt!: Date;
}
