import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UserType } from './user.typing';
import { formatConsents } from 'src/helpers';
import { Consent } from 'src/enums';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}
  /**
   * @todo Api needs to be protected with an authentication
   */
  async create({ email }: CreateUserDto) {
    const user = await this.userModel.create({
      userId: uuidv4(),
      email,
      consents: [],
    });
    return this.formatUser(user, []);
  }

  /**
   * @todo Add pagination to response to limit the size of the data
   */
  async findAll() {
    const users = await this.userModel.findAll();
    const data = users.map((user) =>
      this.formatUser(user, Object.values(Consent)),
    );
    return data;
  }

  async remove(userId: string) {
    const user = await this.userModel.findOne({
      where: {
        userId: userId,
      },
    });
    if (!user) {
      throw new BadRequestException(`User with id ${userId} not found`);
    }
    await user.destroy();
    return {
      message: 'User Deleted',
    };
  }

  formatUser(user: User, changedConsents): UserType {
    return {
      id: user.userId,
      email: user.email,
      consents: formatConsents(user.consents, changedConsents),
    };
  }
}
