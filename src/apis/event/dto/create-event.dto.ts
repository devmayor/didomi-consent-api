import {
  IsString,
  IsDefined,
  ValidateNested,
  IsBoolean,
  IsArray,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Consent } from 'src/enums';

class Consents {
  @IsDefined()
  @IsEnum(Consent)
  id: Consent;

  @IsBoolean()
  @IsDefined()
  enabled: boolean;
}

class User {
  @IsString()
  id: String;
}
export class CreateEventDto {
  @IsDefined()
  @ValidateNested()
  @Type(() => User)
  user: User;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Consents)
  consents: Consents[];
}
