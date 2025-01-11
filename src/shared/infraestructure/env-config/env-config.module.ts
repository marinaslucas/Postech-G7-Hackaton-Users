//command: nest generate module shared/infraestructure/env-config
import { DynamicModule, Module } from '@nestjs/common';
import { EnvConfigService } from './env-config.service';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { join } from 'node:path';

//por default ele pega o .env
//se nao precisamos configurar para ele pegar .env com outros sufixos
//para isso, passamos um objeto para o método forRoot
@Module({
  providers: [EnvConfigService],
})
export class EnvConfigModule extends ConfigModule {
  static async forRoot(
    //static para eu poder chamar sem instanciar a classe
    options: ConfigModuleOptions = {}
  ): Promise<DynamicModule> {
    return super.forRoot({
      //super porque estou chamando a classe pai ConfigModule
      ...options,
      envFilePath: [
        join(__dirname, `../../../../.env.${process.env.NODE_ENV}`),
      ], //C:\dev\nestjs\project\.env.example => dirname C:\dev\nestjs\ file name .env.example
    });
  }
}
