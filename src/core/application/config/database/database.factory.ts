import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { ConnectionString } from 'connection-string';
import * as mongoose from 'mongoose';
import { mongooseHideObjectId } from '@plugins/mongoose-hide-object-id';
import * as mongoosePaginate from 'mongoose-paginate';

import { Json } from '../../../../app/types/json.type';
import { DatabaseConfiguration } from './database.type';
import { AuthMechanism } from 'mongodb';

@Injectable()
export class DatabaseFactory implements MongooseOptionsFactory {
  protected config: DatabaseConfiguration;

  constructor(private readonly configService: ConfigService) {
    this.config = configService.get<DatabaseConfiguration>('database');
  }

  public createMongooseOptions(): MongooseModuleOptions {
    const mongodbOptions: MongooseModuleOptions = {};
    const uriConfig: Json = {
      protocol: this.config.port ? 'mongodb' : 'mongodb+srv',
      hosts: [{ name: this.config.host }],
      params: {},
    };

    if (this.config.auth.mechanism === AuthMechanism.MONGODB_X509) {
      const cert = `${process.cwd()}/mongodb.pem`;
      mongodbOptions.sslKey = cert;
      mongodbOptions.sslCert = cert;
      mongodbOptions.authMechanism = this.config.auth.mechanism;
      uriConfig.params.authSource = '$external';
      uriConfig.params.authMechanism = AuthMechanism.MONGODB_X509;
    }

    if (
      this.config.auth.mechanism === AuthMechanism.MONGODB_SCRAM_SHA1 ||
      this.config.auth.mechanism === AuthMechanism.MONGODB_SCRAM_SHA256 ||
      this.config.auth.mechanism === AuthMechanism.MONGODB_PLAIN ||
      this.config.auth.mechanism === AuthMechanism.MONGODB_DEFAULT
    ) {
      uriConfig.user = this.config.auth.username;
      uriConfig.password = this.config.auth.password;
      mongodbOptions.authMechanism = this.config.auth.mechanism;
    }

    const uri = new ConnectionString('', uriConfig).toString();

    return {
      uri,
      dbName: this.config.database,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ...mongodbOptions,
      connectionFactory: async (
        connection: mongoose.Connection,
      ): Promise<mongoose.Connection> => {
        connection.plugin(mongooseHideObjectId);
        connection.plugin(mongoosePaginate);
        return connection;
      },
    };
  }
}
