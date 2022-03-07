import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { configOptions } from './application/config';
import { databaseConfig } from './application/config/database/database.config';
import { DatabaseFactory } from './application/config/database/database.factory';
import { HttpExceptionFilter } from './infrastructure/filters/exception.filter';
import { TransformInterceptor } from './infrastructure/interceptors/transform.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfig)],
      inject: [ConfigService],
      useClass: DatabaseFactory,
    }),
    ScheduleModule.forRoot(),
  ],
  providers: [
    DatabaseFactory,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class CoreModule {}
