import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { Events } from 'src/models/events.model';
import { User } from 'src/models/user.model';
import { EventService } from '../src/apis/event/event.service';

describe('EventService', () => {
  let service: EventService;
  const consents = ['email_notifications', 'sms_notifications'];
  const testUser = {
    id: 6,
    userId: '62729707-ff6f-415f-9eff-0fd9b3d2b890',
    email: 'testEmail@gmail.com',
    consents,
    createdAt: '2022-04-11T08:38:23.165Z',
    updatedAt: '2022-04-11T08:50:59.658Z',
    deletedAt: null,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventService,
        {
          provide: getModelToken(Events),
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: getModelToken(User),
          useValue: {
            findOne: jest.fn(() => {
              return { ...testUser, save: jest.fn(() => testUser) };
            }),
          },
        },
      ],
    }).compile();

    service = module.get<EventService>(EventService);
  });

  it('should create events', async () => {
    const consents = { email_notifications: false, sms_notifications: true };
    const event = await service.create({ email: 'test@gmail.com', consents });
    expect(event).toEqual({
      user: { id: '62729707-ff6f-415f-9eff-0fd9b3d2b890' },
      consents: [
        { id: 'email_notifications', enabled: false },
        { id: 'sms_notifications', enabled: true }
      ]
    });
  });
});
