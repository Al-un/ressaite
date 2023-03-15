import { randomUUID } from "crypto";
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";

import { User } from "./User";

export const tableName = "access_table";

@Table({
  tableName,
})
export class AccessToken extends Model {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id!: number;

  @Column({ allowNull: false })
  token!: string;

  @Column({ allowNull: false })
  @ForeignKey(() => User)
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @Column({ allowNull: false })
  expiresAt!: Date;

  init(): void {
    this.token = randomUUID();
    this.expiresAt = new Date();
    this.expiresAt.setDate(this.expiresAt.getDate() + 30);
  }
}
