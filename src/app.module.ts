//modulo principal
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './logger.middleware';
import { EnvConfigModule } from './shared/infraestructure/env-config/env-config.module';
import { EnvConfigService } from './shared/infraestructure/env-config/env-config.service';

@Module({
  imports: [EnvConfigModule.forRoot()], //quando criei o module pelo cli(comando), ele já importou o módulo
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
