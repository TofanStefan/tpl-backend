import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  last_name?: string;

  @IsString()
  @MinLength(6)
  password: string;
}
