import {
  Column,
  Model,
  Table,
  PrimaryKey,
  UpdatedAt,
  CreatedAt,
  AutoIncrement,
  BelongsTo,
  DataType,
  DeletedAt,
} from 'sequelize-typescript';
import { Consent } from 'src/enums';
import { User } from './user.model';

@Table({
  tableName: 'events',
})
export class Events extends Model<Events> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  eventId: string;

  @Column
  userId: number;

  @BelongsTo(() => User, 'id')
  user: User;

  @Column(DataType.ARRAY(DataType.ENUM(Consent.EMAIL, Consent.SMS)))
  consents: Consent[];

  @DeletedAt
  deletedAt: Date;
  @CreatedAt
  createdAt: Date;
  @UpdatedAt
  updatedAt: Date;
}
