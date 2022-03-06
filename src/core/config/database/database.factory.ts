import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { ConnectionString } from 'connection-string';
import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';
import { Json } from 'src/app/types/json.type';
import { ServerApiVersion } from 'mongodb';
import { mongooseHideObjectId } from '@plugins/mongoose-hide-object-id';

import { DatabaseConfiguration } from './database.type';
import { DatabaseMechanism } from './enums/mechanism.enum';

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

    if (this.config.auth.mechanism === DatabaseMechanism.X509) {
      const cert = `${process.cwd()}/mongodb.pem`;
      mongodbOptions.sslKey = cert;
      mongodbOptions.sslCert = cert;
      mongodbOptions.serverApi = ServerApiVersion.v1;
      uriConfig.params.authSource = '$external';
      uriConfig.params.authMechanism = DatabaseMechanism.X509;
    }

    const uri = new ConnectionString('', uriConfig).toString();

    return {
      uri,
      dbName: this.config.database,
      authMechanism: this.config.auth.mechanism,
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
