import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './application/services/auth.service';
import { ApiKeyService } from './domain/apikey.service';
import { ApiKeyRepository } from './infraestructure/database/apikeys/apikey.repository';
import { models } from './infraestructure/database/models';
import { BearerAuthGuard } from './infraestructure/passport/guards/bearer.guard';
import { BearerStrategy } from './infraestructure/passport/strategies/bearer.strategy';

@Module({
  imports: [PassportModule, MongooseModule.forFeature(models)],
  providers: [
    AuthService,
    BearerStrategy,
    BearerAuthGuard,
    ApiKeyRepository,
    ApiKeyService,
  ],
  controllers: [],
})
export class AuthModule {}
