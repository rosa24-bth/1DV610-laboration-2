# Shopping Cart Module

A simple JavaScript module for managing a shopping cart.

The module can be used by other JavaScript apps that need basic shopping cart functionaltiy. It handles products, quantities, prices and percentage discounts.

The module only handles the shopping cart itself. It does not include other stuff like user interface, checkout, payments or product storage.

## Features

You can:

- Add products to the cart
- Remove products from the cart
- Update product quantities
- Increase or decrease quantities
- Check if a product exists in the cart
- Get the number of products and items
- Calculate subtotal and total price
- Apply and remove percentage discounts
- Clear the cart

## Installation

Clone the repo:

```bash
git clone git@github.com:rosa24-bth/1DV610-laboration-2.git
```

Go to the project directory:

```bash
cd 1DV610-laboration-2
```

No external dependencies are required.

## Usage example

Import `ShoppingCart` from the module:

```javascript
import { ShoppingCart } from "./index.js";

const cart = new ShoppingCart();

cart.addItem("Rooibos tea", 60, 2);
cart.addItem("Green tea", 50, 1);

console.log(cart.getSubtotal());

cart.applyDiscount(10);

console.log(cart.getTotalPrice());
```

If a product with the same name is added more than once, its quantity is increased instead of creating another cart item.

## Public methods

### ShoppingCart

`addItem(name, price, quantity)`
Adds a product to the cart.

`removeItem(name)`
Removes a product from the cart.

`updateQuantity(name, quantity)`
Changes the quantity of a product.

`increaseItemQuantity(name, quantity)`
Increases the quantity of a product. The quantity defaults to 1.

`decreaseItemQuantity(name, quantity)`
Decreases the quantity of a product. The quantity defaults to 1.

`getItem(name)`
Returns a product from the cart, or `null` if it does not exist.

`getItems()`
Returns all products in the cart.

`hasItem(name)`
Checks if a product exists in the cart.

`getNumberOfProducts()`
Returns the number of different products in the cart.

`getTotalItems()`
Returns the total quantity of all products.

`getSubtotal()`
Returns the price before discount.

`applyDiscount(percent)`
Applies a percentage discount between 0 and 100.

`removeDiscount()`
Removes the current discount.

`getDiscount()`
Returns the current discount percentage.

`getTotalPrice()`
Returns the total price after discount.

`isEmpty()`
Checks if the cart is empty.

`clearCart()`
Removes all products and resets the discount.

### CartItem

A `CartItem` represents one product in the shopping cart.

It provides methods for getting the product name, price and quantity, changing the quantity and calculating the total price for the item.

## Testing

The module is tested with Node.js built-in test runner.

You can run the tests with:

```bash
npm test
```

## Requirements

- JavaScript
- Node.js
- No external dependencies

## License

This project is licensed under the ISC License.
