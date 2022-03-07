import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { configOptions } from './config';
import { databaseConfig } from './config/database/database.config';
import { DatabaseFactory } from './config/database/database.factory';

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
  providers: [DatabaseFactory],
})
export class CoreModule {}
