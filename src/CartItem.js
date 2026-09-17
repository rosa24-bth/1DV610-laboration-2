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
    if (quantity <= 0) {
      return false;
    }

    this.quantity = quantity;
    return true;
  }

  increaseQuantity(quantity) {
    if (quantity <= 0) {
      return false;
    }

    this.quantity += quantity;
    return true;
  }

  decreaseQuantity(quantity) {
    if (quantity <= 0) {
      return false;
    }

    // An item should always have a quantity of at least one
    if (this.quantity - quantity <= 0) {
      return false;
    }

    this.quantity -= quantity;
    return true;
  }

  getTotalPrice() {
    return this.price * this.quantity;
  }
}
