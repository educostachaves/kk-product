import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './products.schema';
import { ProductDTO } from './products.dto';
import { IProduct } from './products.interface';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) public ProductModel: Model<ProductDocument>) {}

  async create(createProduct: ProductDTO): Promise<Record<string, any>> {
    const createdProduct = new this.ProductModel(createProduct);
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.ProductModel.find().exec();
  }

  async findById(id: string): Promise<Product> {
    return this.ProductModel.findById(id);
  }

  async delete(id: string): Promise<Product> {
    return this.ProductModel.findByIdAndDelete(id);
  }

  async update(id: string, Product: IProduct): Promise<Product> {
    return this.ProductModel.findByIdAndUpdate(id, Product);
  }
}
