import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';

@Schema({
  collection: 'dnas',
  timestamps: true,
  autoIndex: true,
})
export class DnaModel extends Document {
  @Prop({ type: String, default: uuid })
  public uuid: string;

  @Prop({ type: Number, required: true })
  public mutationsCount: number;

  @Prop({ type: Array, required: true })
  public mutations: string[];

  @Prop({ type: Array, required: true })
  public sequence: string[];
}
