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
  // exports: [EnvConfigService],
  // controllers: [],
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

// forRoot é usado para configuração global entre todos os módulos. Inclusive é comum colocar a flag global: true no módulo.

// Exemplo: inicializar props de configuração para o banco de dados.

// Já o forFeature é nomenclatura voltada para o scoped dentro de cada módulo especificamente.

// Isto é: tu quer aplicar uma configuração  específica pra aquele módulo. É o nosso caso no vídeo: queremos gerar um provider de maneira dinâmica específica para o módulo de Customer, por exemplo :)
