import { Injectable } from '@nestjs/common';
import { EnvConfig } from './env-config.interface';
import { ConfigService } from '@nestjs/config';

//criando este serviço para carregar as variáveis de ambiente sem ter que usar o módulo do nestjs diretamente
//no modulo principal. Entao este modulo é responsável por carregar as variáveis de ambiente
//e o modulo principal apenas injeta este modulo e usa as variáveis de ambiente

@Injectable()
export class EnvConfigService implements EnvConfig {
  //interface que define os métodos que este serviço deve ter
  constructor(private configService: ConfigService) {} //esse modulo do nestjs é responsável por carregar as variáveis de ambiente

  getAppPort(): number {
    return Number(this.configService.get<number>('PORT'));
  }
  getNodeEnv(): string {
    return this.configService.get<string>('NODE_ENV');
  }
}
