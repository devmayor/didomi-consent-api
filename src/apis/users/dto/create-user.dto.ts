import { IsString, IsNotEmpty, IsEmail, Validate } from 'class-validator';
import { EmailExistsRule } from '../validation/UserExists';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Validate(EmailExistsRule)
  email: string;
}
