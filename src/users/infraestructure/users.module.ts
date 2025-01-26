import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SignupUseCase } from '../application/usecases/signup-users.usecase';
import { UserInMemoryRepository } from './database/in-memory/repositories/user-in-memory.repository';
import { HashProvider } from '@/shared/application/providers/implementations/hash-provider';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      //devo colocar todas as dependências aqui também
      provide: 'UserRepository', //nome registrado no container
      useClass: UserInMemoryRepository, //aqui eu coloquei o repo InMemory mas depois coloco o repo real também
    },
    { provide: 'HashProvider', useClass: HashProvider },
    {
      //dentro do objeto eu passo a classe mas também digo o nome que quero, permite que eu altere o nome para o container
      provide: SignupUseCase.UseCase, //nome para ficar no container
      useClass: SignupUseCase.UseCase, //digo aqui a classe que vai ser usada
    },
  ],
})
export class UsersModule {}
