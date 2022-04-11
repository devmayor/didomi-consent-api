import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { Events } from 'src/models/events.model';

@Module({
  controllers: [EventController],
  providers: [EventService],
  imports: [SequelizeModule.forFeature([User, Events])]
})
export class EventModule {}
