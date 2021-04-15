export class CountryProfileDTO {
  productId = '';
  productName = '';
  price = '';

  constructor(productId, productName, price) {
    this.productId = productId;
    this.productName = productName;
    this.price = price;
  }
}
