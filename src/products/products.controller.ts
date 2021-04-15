import {
  Controller,
  Get,
  Post,
  Res,
  Param,
  Body,
  Delete,
  Put,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { ProductDTO } from './products.dto';
import { ProductService } from './products.service';
import { IProduct } from './products.interface';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(public readonly ProductService: ProductService) {}

  @Get()
  async getAll(@Res() res) {
    const data = await this.ProductService.findAll();
    if (data) {
      return res.status(HttpStatus.OK).send(data);
    }

    return res.status(HttpStatus.NOT_FOUND).send(data);
  }

  @Get(':id')
  async findById(@Param() params, @Res() res) {
    const data = await this.ProductService.findById(params.id);
    if (data) {
      return res.status(HttpStatus.OK).send(data);
    }

    return res.status(HttpStatus.NOT_FOUND).send(data);
  }

  @ApiBody({ type: [ProductDTO] })
  @Post()
  async create(@Body() Product: IProduct, @Res() res) {
    try {
      const data = await this.ProductService.create(Product);
      if (typeof res.data !== 'undefined') {
        return res.status(HttpStatus.OK).send(data);
      }

      return res.status(HttpStatus.NOT_FOUND).send(data);
    } catch (e) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: e.message});
    }
  }

  @Delete(':id')
  async delete(@Param() params, @Res() res) {
    try {
      const data = await this.ProductService.delete(params.id);
      if (typeof res.data !== 'undefined') {
        return res.status(HttpStatus.OK).send(data);
      }

      return res.status(HttpStatus.NOT_FOUND).send(data);
    } catch (e) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: e.message});
    }
  }

  @ApiBody({ type: [ProductDTO] })
  @Put(':id')
  async update(@Param() params, @Body() product: ProductDTO, @Res() res) {
    try {
      const data = await this.ProductService.update(params.id, product);
      if (data) {
        return res.status(HttpStatus.OK).send(data);
      }

      return res.status(HttpStatus.NOT_FOUND).send(data);
    } catch (e) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: e.message});
    }
  }
}
