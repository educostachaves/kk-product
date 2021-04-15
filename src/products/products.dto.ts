export class ProductDTO {
  productId = 0;
  productName = '';
  price = 0.0;

  constructor(productId, productName, price) {
    this.productId = productId;
    this.productName = productName;
    this.price = price;
  }
}
