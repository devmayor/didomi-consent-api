import { Test, TestingModule } from '@nestjs/testing';
import { Consent } from 'src/enums';
import { EventController } from '../src/apis/event/event.controller';
import { EventService } from '../src/apis/event/event.service';

describe('EventController', () => {
  let controller: EventController;
  const createResponse = {
    user: {
      id: '6b747b16-c42c-4ce8-8d57-21008da59c26',
    },
    consents: [
      {
        id: Consent.SMS,
        enabled: true,
      },
    ],
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [
        {
          provide: EventService,
          useValue: {
            create: jest.fn(() => {
              return createResponse;
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<EventController>(EventController);
  });

  it('should be defined', async () => {
    const createEvent = await controller.create({
      user: {
        id: '6b747b16-c42c-4ce8-8d57-21008da59c26',
      },
      consents: [
        {
          id: Consent.SMS,
          enabled: true,
        },
      ],
    });
    expect(createEvent).toEqual(createResponse);
  });
});
