import { SigninUseCase } from '@/users/application/usecases/signin-users.usecase';

export class SigninDto implements SigninUseCase.Input {
  email: string;
  password: string;
}
