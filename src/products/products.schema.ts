import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IProduct } from './products.interface';

export type ProductDocument = Product & Document;

@Schema()
export class Product implements IProduct {
  @Prop({ type: Number, required: true, unique: true })
  productId: number;

  @Prop({ type: String, required: true })
  productName: string;

  @Prop({ type: Number, required: true })
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
