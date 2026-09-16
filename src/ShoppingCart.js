import { CartItem } from "./CartItem.js";

export class ShoppingCart {
  constructor() {
    this.items = [];
  }

  addItem(name, price, quantity) {
    const item = new CartItem(name, price, quantity);
    this.items.push(item);
  }

  getItems() {
    return this.items;
  }
}
