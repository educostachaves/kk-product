import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './products/products.module';

const {
  MONGO_USER: mongoUser,
  MONGO_PASSWORD: mongoPassword,
  MONGO_HOST: mongoHost,
  MONGO_PORT: mongoPort,
  MONGO_DB: mongoDB } = process.env;

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDB}?authSource=admin`,
    ),
    ProductModule,
  ],
})
export class AppModule {}
