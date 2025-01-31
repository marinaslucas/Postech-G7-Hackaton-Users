import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ClassSerializerInterceptor } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }) //possível passar construtores para o FastifyAdapter
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector))); //permite serializar objetos para JSON (class-serializer) para funcionar o @Transform()
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0'); //permite outros hosts acessarem a aplicação
}
bootstrap();
