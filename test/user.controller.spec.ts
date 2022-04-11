import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../src/apis/users/user.controller';
import { UserService } from '../src/apis/users/user.service';

describe('UserController', () => {
  let controller: UserController;
  const consents = ['email_notifications', 'sms_notifications'];
  const testUser = {
    id: 6,
    userId: '62729707-ff6f-415f-9eff-0fd9b3d2b890',
    email: 'testEmail@gmail.com',
    consents ,
    createdAt: '2022-04-11T08:38:23.165Z',
    updatedAt: '2022-04-11T08:50:59.658Z',
    deletedAt: null,
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{
        provide: UserService,
        useValue: {
          create: jest.fn(() => testUser),
          findAll: jest.fn(() => [testUser]),
          remove: jest.fn(),
        },
      },],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', async() => {
    const createUser = await controller.create({email: "test@gmail.com"});
    expect(createUser).toBeDefined();
    expect(createUser).toEqual({
        "consents":  [
          "email_notifications",
          "sms_notifications",
        ],
        "createdAt": "2022-04-11T08:38:23.165Z",
        "deletedAt": null,
        "email": "testEmail@gmail.com",
        "id": 6,
        "updatedAt": "2022-04-11T08:50:59.658Z",
        "userId": "62729707-ff6f-415f-9eff-0fd9b3d2b890",
      });
  });
});
