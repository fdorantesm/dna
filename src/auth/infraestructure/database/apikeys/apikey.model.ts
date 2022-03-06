import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'apiKeys',
  timestamps: true,
})
export class ApiKeyModel extends Document {
  @Prop({ type: String, required: true })
  public uuid: string;

  @Prop({ type: String, required: true })
  public publicKey: string;
}
