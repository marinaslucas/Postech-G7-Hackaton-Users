import { SignupUseCase } from '@/users/application/usecases/signup-users.usecase';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class SignupDto implements SignupUseCase.Input {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
