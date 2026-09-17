import { CartItem } from "./CartItem.js";

export class ShoppingCart {
  constructor() {
    this.items = [];
    this.discount = 0;
  }

  addItem(name, price, quantity) {
    if (!name) {
      return false;
    }

    if (price <= 0) {
      return false;
    }

    if (quantity <= 0) {
      return false;
    }

    for (const item of this.items) {
      if (item.getName() === name) {
        item.increaseQuantity(quantity);
        return true;
      }
    }

    const item = new CartItem(name, price, quantity);
    this.items.push(item);
    return true;
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

  updateQuantity(name, quantity) {
    if (quantity <= 0) {
      return false;
    }

    for (const item of this.items) {
      if (item.getName() === name) {
        item.setQuantity(quantity);
        return true;
      }
    }

    return false;
  }

  increaseItemQuantity(name, quantity = 1) {
    if (quantity <= 0) {
      return false;
    }

    for (const item of this.items) {
      if (item.getName() === name) {
        item.increaseQuantity(quantity);
        return true;
      }
    }

    return false;
  }

  decreaseItemQuantity(name, quantity = 1) {
    if (quantity <= 0) {
      return false;
    }

    for (const item of this.items) {
      if (item.getName() === name) {
        return item.decreaseQuantity(quantity);
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

  getNumberOfProducts() {
    return this.items.length;
  }

  getTotalItems() {
    let totalItems = 0;

    for (const item of this.items) {
      totalItems += item.getQuantity();
    }

    return totalItems;
  }

  getSubtotal() {
    let subtotal = 0;

    for (const item of this.items) {
      subtotal += item.getTotalPrice();
    }

    return subtotal;
  }

  applyDiscount(percent) {
    if (percent < 0) {
      return false;
    }

    if (percent > 100) {
      return false;
    }

    this.discount = percent;
    return true;
  }

  removeDiscount() {
    this.discount = 0;
  }

  getDiscount() {
    return this.discount;
  }

  getTotalPrice() {
    const subtotal = this.getSubtotal();
    const discountAmount = subtotal * (this.discount / 100);

    return subtotal - discountAmount;
  }

  isEmpty() {
    if (this.items.length === 0) {
      return true;
    }

    return false;
  }

  clearCart() {
    this.items = [];
    this.discount = 0;
  }
}
