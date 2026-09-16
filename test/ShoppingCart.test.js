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
