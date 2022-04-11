import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { EmailExistsRule } from './validation/UserExists';

@Module({
  controllers: [UserController],
  providers: [UserService, EmailExistsRule],
  imports: [SequelizeModule.forFeature([User])],
})
export class UserModule {}
