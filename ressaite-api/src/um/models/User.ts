import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { AccessToken } from "./AccessToken";

export const tableName = "users";

@Table({
  tableName,
})
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id!: number;

  @Column({ allowNull: false })
  username!: string;

  @Column({ allowNull: false })
  password!: string;

  @Column
  email?: string;

  @HasMany(() => AccessToken)
  accessTokens!: AccessToken[];
}
