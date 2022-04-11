import {Column, Model, Table, PrimaryKey, UpdatedAt, CreatedAt, AutoIncrement, DataType, DeletedAt} from 'sequelize-typescript';
import { Consent } from 'src/enums';
  
  @Table({
    tableName: 'users'
  })
  export class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;
  
    @Column
    userId: string;

    @Column
    email: string;

    @Column(DataType.ARRAY(
      DataType.ENUM(
        Consent.EMAIL,
        Consent.SMS,
      )
    ))
    consents: Consent[];

    @DeletedAt
    deletedAt: Date;
    @CreatedAt
    createdAt: Date;
    @UpdatedAt
    updatedAt: Date;
  }
  