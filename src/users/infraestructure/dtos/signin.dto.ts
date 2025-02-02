import { SigninUseCase } from '@/users/application/usecases/signin-users.usecase';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SigninDto implements SigninUseCase.Input {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
