import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SignupUseCase } from '../application/usecases/signup-users.usecase';
import { UserInMemoryRepository } from './database/in-memory/repositories/user-in-memory.repository';
import { HashProvider } from '@/shared/application/providers/implementations/hash-provider';
import { UserRepository } from '../domain/repositories/user.repository';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'UserRepository',
      useClass: UserInMemoryRepository,
    },
    { provide: 'HashProvider', useClass: HashProvider },
    {
      provide: SignupUseCase.UseCase,
      useFactory: (
        userRepository: UserRepository.Repository,
        hashProvider: HashProvider
      ) => {
        return new SignupUseCase.UseCase(userRepository, hashProvider);
      },
    },
  ],
})
export class UsersModule {}
