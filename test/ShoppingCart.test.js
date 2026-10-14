import test from "node:test";
import assert from "node:assert";
import { ShoppingCart, CartItem } from "../index.js";

test("adds an item to the cart", () => {
  const cart = new ShoppingCart();

  cart.addItem("Rooibos tea", 60, 2);

  assert.equal(cart.getItems().length, 1);
});

test("changes the quantity of an item", () => {
  const cart = new ShoppingCart();

  cart.addItem("Rooibos tea", 60, 2);

  const item = cart.getItems()[0];
  item.setQuantity(3);

  assert.equal(item.getQuantity(), 3);
});

test("increases quantity when adding the same item again", () => {
  const cart = new ShoppingCart();

  cart.addItem("Rooibos tea", 60, 2);
  cart.addItem("Rooibos tea", 60, 1);

  const item = cart.getItems()[0];

  assert.equal(cart.getItems().length, 1);
  assert.equal(item.getQuantity(), 3);
});

test("removes an item from the cart", () => {
  const cart = new ShoppingCart();

  cart.addItem("Rooibos tea", 60, 2);
  cart.addItem("Green tea", 50, 1);

  cart.removeItem("Rooibos tea");

  assert.equal(cart.getItems().length, 1);
  assert.equal(cart.getItems()[0].getName(), "Green tea");
});

test("gets an item from the cart", () => {
  const cart = new ShoppingCart();

  cart.addItem("Rooibos tea", 60, 2);
  cart.addItem("Green tea", 50, 1);

  const item = cart.getItem("Green tea");

  assert.equal(item.getName(), "Green tea");
  assert.equal(item.getPrice(), 50);
});

test("checks if an item is in the cart", () => {
  const cart = new ShoppingCart();

  cart.addItem("Rooibos tea", 60, 2);

  assert.equal(cart.hasItem("Rooibos tea"), true);
  assert.equal(cart.hasItem("Green tea"), false);
});

test("calculates the total price of an item", () => {
  const cart = new ShoppingCart();

  cart.addItem("Rooibos tea", 60, 2);

  const item = cart.getItem("Rooibos tea");

  assert.equal(item.getTotalPrice(), 120);
});

test("calculates the cart subtotal", () => {
  const cart = new ShoppingCart();

  cart.addItem("Rooibos tea", 60, 2);
  cart.addItem("Green tea", 50, 1);

  assert.equal(cart.getSubtotal(), 170);
});

test("counts the number of products in the cart", () => {
  const cart = new ShoppingCart();

  cart.addItem("Rooibos tea", 60, 2);
  cart.addItem("Green tea", 50, 3);

  assert.equal(cart.getNumberOfProducts(), 2);
});

test("counts the total number of items in the cart", () => {
  const cart = new ShoppingCart();

  cart.addItem("Rooibos tea", 60, 2);
  cart.addItem("Green tea", 50, 3);

  assert.equal(cart.getTotalItems(), 5);
});

test("applies a discount to the cart", () => {
  const cart = new ShoppingCart();

  cart.addItem("Rooibos tea", 60, 2);
  cart.addItem("Green tea", 50, 1);

  cart.applyDiscount(10);

  assert.equal(cart.getDiscount(), 10);
  assert.equal(cart.getTotalPrice(), 153);
});

test("removes the discount from the cart", () => {
  const cart = new ShoppingCart();

  cart.addItem("Rooibos tea", 60, 2);
  cart.addItem("Green tea", 50, 1);

  cart.applyDiscount(10);
  cart.removeDiscount();

  assert.equal(cart.getDiscount(), 0);
  assert.equal(cart.getTotalPrice(), 170);
});

test("does not add an item with an invalid price", () => {
  const cart = new ShoppingCart();

  const result = cart.addItem("Rooibos tea", -60, 2);

  assert.equal(result, false);
  assert.equal(cart.getItems().length, 0);
});

test("does not allow an invalid quantity", () => {
  const cart = new ShoppingCart();

  cart.addItem("Rooibos tea", 60, 2);

  const item = cart.getItem("Rooibos tea");
  const result = item.setQuantity(0);

  assert.equal(result, false);
  assert.equal(item.getQuantity(), 2);
});

test("does not allow a discount over 100 percent", () => {
  const cart = new ShoppingCart();

  const result = cart.applyDiscount(150);

  assert.equal(result, false);
  assert.equal(cart.getDiscount(), 0);
});

test("updates the quantity of an item", () => {
  const cart = new ShoppingCart();

  cart.addItem("Rooibos tea", 60, 2);
  cart.updateQuantity("Rooibos tea", 5);

  assert.equal(cart.getItem("Rooibos tea").getQuantity(), 5);
});

test("increases the quantity of an item", () => {
  const cart = new ShoppingCart();

  cart.addItem("Rooibos tea", 60, 2);
  cart.increaseItemQuantity("Rooibos tea", 2);

  assert.equal(cart.getItem("Rooibos tea").getQuantity(), 4);
});

test("decreases the quantity of an item", () => {
  const cart = new ShoppingCart();

  cart.addItem("Rooibos tea", 60, 4);
  cart.decreaseItemQuantity("Rooibos tea", 2);

  assert.equal(cart.getItem("Rooibos tea").getQuantity(), 2);
});

test("checks if the cart is empty", () => {
  const cart = new ShoppingCart();

  assert.equal(cart.isEmpty(), true);

  cart.addItem("Rooibos tea", 60, 2);

  assert.equal(cart.isEmpty(), false);
});

test("clears the cart", () => {
  const cart = new ShoppingCart();

  cart.addItem("Rooibos tea", 60, 2);
  cart.addItem("Green tea", 50, 1);
  cart.applyDiscount(10);

  cart.clearCart();

  assert.equal(cart.getItems().length, 0);
  assert.equal(cart.getDiscount(), 0);
  assert.equal(cart.isEmpty(), true);
});

test("returns null when a product does not exist", () => {
  const cart = new ShoppingCart();

  cart.addItem("Rooibos tea", 60, 2);

  assert.equal(cart.getItem("Green tea"), null);
});

test("rejects quantity changes for a missing product without changing the cart", () => {
  const cart = new ShoppingCart();

  cart.addItem("Rooibos tea", 60, 2);

  assert.equal(cart.updateQuantity("Green tea", 3), false);
  assert.equal(cart.increaseItemQuantity("Green tea", 1), false);
  assert.equal(cart.decreaseItemQuantity("Green tea", 1), false);
  assert.equal(cart.getNumberOfProducts(), 1);
  assert.equal(cart.getTotalItems(), 2);
  assert.equal(cart.getTotalPrice(), 120);
});

test("increases quantity by one when no quantity is supplied", () => {
  const cart = new ShoppingCart();

  cart.addItem("Rooibos tea", 60, 2);

  assert.equal(cart.increaseItemQuantity("Rooibos tea"), true);
  assert.equal(cart.getItem("Rooibos tea").getQuantity(), 3);
});

test("decreases quantity by one when no quantity is supplied", () => {
  const cart = new ShoppingCart();

  cart.addItem("Rooibos tea", 60, 2);

  assert.equal(cart.decreaseItemQuantity("Rooibos tea"), true);
  assert.equal(cart.getItem("Rooibos tea").getQuantity(), 1);
});

test("rejects decreases to zero or below without removing the product", () => {
  const cart = new ShoppingCart();

  cart.addItem("Rooibos tea", 60, 2);

  assert.equal(cart.decreaseItemQuantity("Rooibos tea", 2), false);
  assert.equal(cart.getItem("Rooibos tea").getQuantity(), 2);
  assert.equal(cart.decreaseItemQuantity("Rooibos tea", 3), false);
  assert.equal(cart.getItem("Rooibos tea").getQuantity(), 2);
  assert.equal(cart.getNumberOfProducts(), 1);
});

test("accepts zero percent discount and restores the subtotal", () => {
  const cart = new ShoppingCart();

  cart.addItem("Rooibos tea", 60, 2);
  cart.applyDiscount(10);

  assert.equal(cart.applyDiscount(0), true);
  assert.equal(cart.getDiscount(), 0);
  assert.equal(cart.getTotalPrice(), 120);
});

test("accepts 100 percent discount and makes the total price zero", () => {
  const cart = new ShoppingCart();

  cart.addItem("Rooibos tea", 60, 2);

  assert.equal(cart.applyDiscount(100), true);
  assert.equal(cart.getDiscount(), 100);
  assert.equal(cart.getTotalPrice(), 0);
});

test("rejects invalid prices without adding a product", () => {
  const cart = new ShoppingCart();
  const invalidPrices = [undefined, null, NaN, Infinity, -Infinity, "60", 0, -1];

  for (const price of invalidPrices) {
    assert.equal(cart.addItem("Rooibos tea", price, 2), false);
    assert.equal(cart.isEmpty(), true);
    assert.equal(cart.getTotalPrice(), 0);
  }
});

test("rejects invalid quantities without adding a product", () => {
  const cart = new ShoppingCart();
  const invalidQuantities = [undefined, null, NaN, Infinity, -Infinity, "2", 0, -1];

  for (const quantity of invalidQuantities) {
    assert.equal(cart.addItem("Rooibos tea", 60, quantity), false);
    assert.equal(cart.isEmpty(), true);
    assert.equal(cart.getTotalPrice(), 0);
  }
});

test("rejects invalid quantity updates without changing the product", () => {
  const cart = new ShoppingCart();
  const invalidQuantities = [undefined, null, NaN, Infinity, -Infinity, "2", 0, -1];
  cart.addItem("Rooibos tea", 60, 2);

  for (const quantity of invalidQuantities) {
    assert.equal(cart.updateQuantity("Rooibos tea", quantity), false);
    assert.equal(cart.getItem("Rooibos tea").getQuantity(), 2);
    assert.equal(cart.getTotalPrice(), 120);
  }
});

test("rejects invalid increases without changing the product", () => {
  const cart = new ShoppingCart();
  const invalidQuantities = [null, NaN, Infinity, -Infinity, "2", 0, -1];
  cart.addItem("Rooibos tea", 60, 2);

  for (const quantity of invalidQuantities) {
    assert.equal(cart.increaseItemQuantity("Rooibos tea", quantity), false);
    assert.equal(cart.getItem("Rooibos tea").getQuantity(), 2);
    assert.equal(cart.getTotalPrice(), 120);
  }
});

test("rejects invalid decreases without changing the product", () => {
  const cart = new ShoppingCart();
  const invalidQuantities = [null, NaN, Infinity, -Infinity, "2", 0, -1];
  cart.addItem("Rooibos tea", 60, 2);

  for (const quantity of invalidQuantities) {
    assert.equal(cart.decreaseItemQuantity("Rooibos tea", quantity), false);
    assert.equal(cart.getItem("Rooibos tea").getQuantity(), 2);
    assert.equal(cart.getTotalPrice(), 120);
  }
});

test("CartItem rejects invalid quantity changes", () => {
  const item = new CartItem("Rooibos tea", 60, 2);
  const invalidQuantities = [undefined, null, NaN, Infinity, -Infinity, "2", 0, -1];

  for (const quantity of invalidQuantities) {
    assert.equal(item.setQuantity(quantity), false);
    assert.equal(item.getQuantity(), 2);
    assert.equal(item.increaseQuantity(quantity), false);
    assert.equal(item.getQuantity(), 2);
    assert.equal(item.decreaseQuantity(quantity), false);
    assert.equal(item.getQuantity(), 2);
    assert.equal(item.getTotalPrice(), 120);
  }
});

test("rejects invalid discounts without changing the current discount", () => {
  const cart = new ShoppingCart();
  const invalidDiscounts = [undefined, null, NaN, Infinity, -Infinity, "10", -1, 101];
  cart.addItem("Rooibos tea", 60, 2);
  cart.applyDiscount(10);

  for (const percent of invalidDiscounts) {
    assert.equal(cart.applyDiscount(percent), false);
    assert.equal(cart.getDiscount(), 10);
    assert.equal(cart.getTotalPrice(), 108);
  }
});

test("continues to accept decimal prices, quantities and discounts", () => {
  const cart = new ShoppingCart();

  assert.equal(cart.addItem("Rooibos tea", 12.5, 1.5), true);
  assert.equal(cart.updateQuantity("Rooibos tea", 2.5), true);
  assert.equal(cart.increaseItemQuantity("Rooibos tea", 0.5), true);
  assert.equal(cart.decreaseItemQuantity("Rooibos tea", 0.5), true);
  assert.equal(cart.getItem("Rooibos tea").getQuantity(), 2.5);
  assert.equal(cart.applyDiscount(2.5), true);
  assert.equal(cart.getTotalPrice(), 30.46875);
});
