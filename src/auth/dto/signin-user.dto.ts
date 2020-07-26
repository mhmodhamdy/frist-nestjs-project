import { IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator';

export class SignInUserDto {
  @IsNotEmpty()
  @IsEmail()
  @MinLength(5)
  @MaxLength(255)
  email: string;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(1024)
  password: string;
}
