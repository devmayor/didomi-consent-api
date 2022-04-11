import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from '../src/apis/event/event.controller';
import { EventService } from '../src/apis/event/event.service';

describe('EventController', () => {
  let controller: EventController;
  const createResponse = {
    "user": {
      "id": "62729707-ff6f-415f-9eff-0fd9b3d2b890"
    },
    "consents": [
      {
        "id": "sms_notifications",
        "enabled": true
      }
    ]
  }
  beforeEach(async () => {
    
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [{
        provide: EventService,
        useValue: {
          create: jest.fn(() => {
            return createResponse
          }),
        },
      }],
    }).compile();

    controller = module.get<EventController>(EventController);
  });

  it('should be defined', async () => {
    const createEvent = await controller.create({
      "email": "test@gmail.com",
      "consents": {
        "email_notifications": false,
        "sms_notifications": true
      }
    });
    expect(createEvent).toEqual(createResponse);
  });
});
