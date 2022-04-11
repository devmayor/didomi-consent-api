
import { IsString, IsNotEmpty, IsEmail, IsDefined, ValidateNested, IsBoolean, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class Consents {
    @IsBoolean()
    @IsOptional()
    email_notifications?: Boolean;
  
    @IsBoolean()
    @IsOptional()
    sms_notifications?: Boolean;
  }
export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Consents)
  consents:  Consents;
}
