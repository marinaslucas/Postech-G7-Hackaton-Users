import { Test, TestingModule } from '@nestjs/testing';
import { EnvConfigService } from '../../env-config.service';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { EnvConfigModule } from '../../env-config.module';

// Você precisa importar EnvConfigModule.forRoot() no seu teste para garantir que o ConfigModule seja configurado corretamente e que as variáveis de ambiente sejam carregadas. O EnvConfigService depende do ConfigModule para acessar as variáveis de ambiente, então é necessário configurar o ConfigModule no ambiente de teste.

// Explicação:
// Configuração do ConfigModule: O EnvConfigModule estende o ConfigModule e o configura com o método forRoot. Importar EnvConfigModule.forRoot() no teste garante que o ConfigModule seja configurado corretamente.
// Injeção de Dependências: O EnvConfigService depende do ConfigModule para acessar as variáveis de ambiente. Sem importar EnvConfigModule.forRoot(), o ConfigModule não seria configurado e as variáveis de ambiente não estariam disponíveis para o EnvConfigService.

describe('EnvConfigService unit tests', () => {
  let sut: EnvConfigService; //sut = system under test seria o service

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnvConfigService],
      imports: [EnvConfigModule.forRoot()], //preciso importar o módulo para que o ConfigModule seja injetado e as variaveis de ambiente sejam carregadas
    }).compile();

    sut = module.get<EnvConfigService>(EnvConfigService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should return the value of the environment variable PORT', () => {
    const appPort = sut.getAppPort();
    expect(appPort).toBe(3000);
  });

  it('should return the value of the environment variable NODE_ENV', () => {
    const nodeEnv = sut.getNodeEnv();
    expect(nodeEnv).toBe('test'); //por padrão o NODE_ENV já é test se não eu teria de colocar NODE_ENV=test no package.json no script de jest
  });
});
