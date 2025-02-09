import { Module } from '@nestjs/common';
import { EnvConfigModule } from './shared/infraestructure/env-config/env-config.module';
import { UsersModule } from './users/infraestructure/users.module';
import { DatabaseModule } from './shared/infraestructure/database/database.module';
import { AuthModule } from './auth/infraestructure/auth.module';

@Module({
  imports: [
    EnvConfigModule,
    UsersModule,
    DatabaseModule,
    AuthModule,
  ],
})
export class AppModule {}
