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

  removeItem(name) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].getName() === name) {
        this.items.splice(i, 1);
        return true;
      }
    }

    return false;
  }

  getItem(name) {
    for (const item of this.items) {
      if (item.getName() === name) {
        return item;
      }
    }

    return null;
  }

  getItems() {
    return this.items;
  }

  hasItem(name) {
    for (const item of this.items) {
      if (item.getName() === name) {
        return true;
      }
    }

    return false;
  }

  getSubtotal() {
    let subtotal = 0;

    for (const item of this.items) {
      subtotal += item.getTotalPrice();
    }

    return subtotal;
  }
}
