import { ProductController } from '../../src/products/products.controller';

describe('ProductController', () => {
  describe('get', async () => {
    const result = ['test'];
    jest.spyOn(ProductController, 'get').mockImplementation(() => result);
    expect(await ProductController.getAll()).toBe(result);
  });
});
