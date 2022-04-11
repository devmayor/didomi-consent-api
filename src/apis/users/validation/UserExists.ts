import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
    ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { User } from 'src/models/user.model';

@ValidatorConstraint({ name: 'EmailExists', async: true })
@Injectable()
export class EmailExistsRule implements ValidatorConstraintInterface {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async validate(email: string) {
    try {
      const user = await this.userModel.findOne({
        where: {email},
      });
      if(user){
          throw new Error();
      }
    } catch (e) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `Email already exist`;
  }
}
