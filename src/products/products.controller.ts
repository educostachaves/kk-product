import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Put
} from '@nestjs/common';
import { ProductService } from './products.service';
import { IProduct } from './products.interface';

@Controller('product')
export class ProductController {
  constructor(public readonly ProductService: ProductService) {}

  @Get()
  async getAll() {
    const res = await this.ProductService.findAll();
    if (res) {
      return {
        status: 200,
        data: res,
      };
    } else {
      return {
        status: 404,
        data: 'No profiles available.',
      };
    }
  }

  @Get(':id')
  async findById(@Param() params) {
    const res = await this.ProductService.findById(params.id);
    if (res) {
      return {
        status: 200,
        data: res,
      };
    } else {
      return {
        status: 404,
        data: 'Profile not found.',
      };
    }
  }

  @Post()
  async create(@Body() Product: IProduct) {
    const res = await this.ProductService.create(Product);
    if (res) {
      return {
        status: 200,
        data: res,
      };
    } else {
      return {
        status: 500,
        data: 'A error ocurred.',
      };
    }
  }

  @Delete(':id')
  async delete(@Param() params) {
    const res = await this.ProductService.delete(params.id);
    if (res) {
      return {
        status: 200,
        data: res,
      };
    } else {
      return {
        status: 404,
        data: 'Profile not found.',
      };
    }
  }

  @Put(':id')
  async update(@Param() params, @Body() ProductUpdate: IProduct) {
    const res = await this.ProductService.update(params.id, ProductUpdate);
    if (res) {
      return {
        status: 200,
        data: res,
      };
    } else {
      return {
        status: 404,
        data: 'Profile not found.',
      };
    }
  }
}
