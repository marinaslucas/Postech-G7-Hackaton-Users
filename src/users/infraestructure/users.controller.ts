import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  HttpCode,
  Query,
  Put,
} from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ListUsersUseCase } from '../application/usecases/list-users.usecase';
import { DeleteUserUseCase } from '../application/usecases/delete-user.usecase';
import { SignupUseCase } from '../application/usecases/signup-users.usecase';
import { SigninUseCase } from '../application/usecases/signin-users.usecase';
import { GetUserUseCase } from '../application/usecases/get-user.usecase';
import { UpdateUserUseCase } from '../application/usecases/update-user.usecase';
import { UpdatePasswordUseCase } from '../application/usecases/update-password.usecase';
import { UpdatePasswordDto } from './dtos/update-password.dto copy';
import { ListUsersDto } from './dtos/list-users.dto copy';

@Controller('users')
export class UsersController {
  @Inject(SignupUseCase.UseCase) //provide no module
  private signupUseCase: SignupUseCase.UseCase; //dependency injection

  @Inject(SigninUseCase.UseCase)
  private signinUseCase: SigninUseCase.UseCase;

  @Inject(GetUserUseCase.UseCase)
  private getUserUseCase: GetUserUseCase.UseCase;

  @Inject(ListUsersUseCase.UseCase)
  private listUsersUseCase: ListUsersUseCase.UseCase;

  @Inject(UpdateUserUseCase.UseCase)
  private updateUserUseCase: UpdateUserUseCase.UseCase;

  @Inject(UpdatePasswordUseCase.UseCase)
  private updatePasswordUseCase: UpdatePasswordUseCase.UseCase;

  @Inject(DeleteUserUseCase.UseCase)
  private deleteUserUseCase: DeleteUserUseCase.UseCase;

  @HttpCode(201)
  @Post()
  async create(@Body() signupDto: SignupDto) {
    return await this.signupUseCase.execute(signupDto);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() signupDto: SignupDto) {
    return await this.signinUseCase.execute(signupDto);
  }

  @Get()
  async search(@Query() searchParams: ListUsersDto) {
    return await this.listUsersUseCase.execute(searchParams);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.getUserUseCase.execute({ id });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.updateUserUseCase.execute({ id, ...updateUserDto });
  }

  @Patch(':id')
  async updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto
  ) {
    return await this.updatePasswordUseCase.execute({
      id,
      ...updatePasswordDto,
    });
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.deleteUserUseCase.execute({ id });
  }
}
