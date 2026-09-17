import test from "node:test";
import assert from "node:assert";
import { ShoppingCart } from "../index.js";

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
