export class CartItem {
  constructor(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  getName() {
    return this.name;
  }

  getPrice() {
    return this.price;
  }

  getQuantity() {
    return this.quantity;
  }

  setQuantity(quantity) {
    this.quantity = quantity;
  }

  increaseQuantity(quantity) {
    this.quantity += quantity;
  }

  decreaseQuantity(quantity) {
    this.quantity -= quantity;
  }
}
