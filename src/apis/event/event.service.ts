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

  async create({ user, consents }: CreateEventDto): Promise<any> {
    const userData = await this.userModel.findOne({
      where: {
        userId: user.id as string,
      },
    });

    if (!userData) {
      // Returns a 422 error code
      throw new HttpException('Unknown User', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    let currentConsentState = Object.values(userData.consents);
    consents.forEach((consent) => {
      if (consent.enabled) {
        if (!currentConsentState.includes(consent.id)) {
          currentConsentState.push(consent.id);
        }
      } else {
        currentConsentState = currentConsentState.filter(
          (state) => state != consent.id,
        );
      }
    });
    userData.consents = currentConsentState;
    await userData.save();

    await this.eventModel.create({
      eventId: uuidv4(),
      userId: userData.id,
      consents: userData.consents,
    });

    return { user, consents };
  }
}
