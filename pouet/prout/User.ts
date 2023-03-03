import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  HasMany,
} from "sequelize-typescript";
import { AccessToken } from "../pouet/AccessToken";

export const tableName = "users";

@Table({
  tableName,
})
export class User extends Model<User> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id!: number;

  @Column({ allowNull: false })
  username!: string;

  @Column({ allowNull: false })
  password!: string;

  @Column
  email?: string;

  @Column({ field: "useless_column" })
  uselessColumn?: string;

  @CreatedAt
  @Column({ allowNull: false })
  createdAt!: Date;

  @UpdatedAt
  @Column({ allowNull: false })
  updatedAt!: Date;

  @HasMany(() => AccessToken)
  accessTokens!: AccessToken[];
}
