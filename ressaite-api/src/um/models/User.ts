import { Column, HasMany, Model, Table } from "sequelize-typescript";
import bcrypt from "bcrypt";

import { AccessToken } from "./AccessToken";

export const tableName = "users";

export const hashPassword = (clearPassword: string): [string, string] => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(clearPassword, salt);

  return [hash, salt];
};

@Table({
  tableName,
})
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id!: number;

  @Column({ allowNull: false })
  username!: string;

  @Column({ allowNull: false })
  get password(): string {
    return this.getDataValue("password");
  }
  set password(value: string) {
    const [hash, salt] = hashPassword(value);
    this.setDataValue("password", hash);
    this.setDataValue("salt", salt);
  }

  @Column({ allowNull: false })
  salt!: string;

  @Column
  email?: string;

  @HasMany(() => AccessToken)
  accessTokens!: AccessToken[];
}
