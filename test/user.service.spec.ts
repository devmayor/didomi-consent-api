import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/models/user.model';
import { UserService } from '../src/apis/users/user.service';

describe('UserService', () => {
  let service: UserService;
  let userModel: typeof User;
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
      providers: [
        UserService,
        {
          provide: getModelToken(User),
          useValue: {
            findAll: jest.fn(() => [testUser]),
            findOne: jest.fn(()=> testUser),
            create: jest.fn(() => {
              return {
                ...testUser,
                consents: []
              }
            }),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userModel = module.get<typeof User>(getModelToken(User));
  });

  it('should be create a new user', async() => {
    const newUser = await service.create({email: 'testEmail@gmail.com'});
    expect(newUser)
    .toHaveProperty('id')

    expect(newUser)
    .toHaveProperty('email','testEmail@gmail.com')
    expect(newUser)
    .toHaveProperty('consents',[])
  });    
  it('should be return all users', async () => {
    const users = await service.findAll();
    expect(users.length).toEqual(1)
    expect(users[0]).toHaveProperty('id')
    expect(users[0]).toHaveProperty('email','testEmail@gmail.com')
    expect(users[0]).toHaveProperty('consents', [
      {"enabled": true, "id": "email_notifications"}, 
      {"enabled": true, "id": "sms_notifications"}
    ])
  });
  it('should be format data response', () => {
    
    const user = service.formatUser(testUser as unknown as User,['email_notifications']);
    expect(user).toEqual({
      id: '62729707-ff6f-415f-9eff-0fd9b3d2b890',
      email: 'testEmail@gmail.com',
      consents: [ { id: 'email_notifications', enabled: true } ]
    });
  });
});
