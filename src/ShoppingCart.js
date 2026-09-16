import { CartItem } from "./CartItem.js";

export class ShoppingCart {
  constructor() {
    this.items = [];
  }

  addItem(name, price, quantity) {
    for (const item of this.items) {
      if (item.getName() === name) {
        item.increaseQuantity(quantity);
        return;
      }
    }

    const item = new CartItem(name, price, quantity);
    this.items.push(item);
  }

  getItems() {
    return this.items;
  }
}
