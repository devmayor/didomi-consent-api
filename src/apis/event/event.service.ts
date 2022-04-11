import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Events } from 'src/models/events.model';
import { CreateEventDto } from './dto/create-event.dto';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/models/user.model';
import { formatConsents } from 'src/helpers';
import { EventType } from './event.typing';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Events)
    private eventModel: typeof Events,
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create({ email, consents }: CreateEventDto) {
    const user = await this.userModel.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      // Returns a 422 error code
      throw new HttpException('Unknown User', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const newConsents = [];
    const changedConsents = [];

    for (const consent in consents) {
      changedConsents.push(consent);
      if (consents[consent]) {
        newConsents.push(consent);
      }
    }

    user.consents = newConsents;

    await this.eventModel.create({
      eventId: uuidv4(),
      userId: user.id,
      consents: newConsents,
    });
    await user.save();

    return this.formatEvents(user, changedConsents);
  }

  formatEvents(user: User, changedConsents): EventType {
    return {
      user: {
        id: user.userId,
      },
      consents: formatConsents(user.consents, changedConsents),
    };
  }
}
