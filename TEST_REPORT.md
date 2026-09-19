# Test Report

## Summary

I choose to test the module with automated unit tests using Node.js built-in test runner and `node:assert`. I made that choice because automated tests make it easy to test the different parts of the module and run the same tests again and again after making changes. I also felt it fitted the project well and was easy to build new tests for each functionlaity I added to the module.

The tests are located in `test/ShoppingCart.test.js`.

To run the tests make sure to install Node.js and then run the following command:

```bash
npm test
```

This runs all tests and shows if results passed or failed.

## Test Results

| What was tested                        | How it was tested                                                                                          | Result    |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------- | --------- |
| Adding an item to the cart             | Added a product and checked that the cart contained one item.                                              | ✅ Passed |
| Changing the quantity of an item       | Changed the quantity with `setQuantity()` and checked that the new quantity was correct.                   | ✅ Passed |
| Adding the same item again             | Added the same product twice and checked that its quantity increased instead of creating another item.     | ✅ Passed |
| Removing an item                       | Added two products, removed one and checked that the correct product remained.                             | ✅ Passed |
| Getting an item from the cart          | Added products and used `getItem()` to check the name and price of one product.                            | ✅ Passed |
| Checking if an item exists             | Used `hasItem()` with a product that existed and one that did not exist.                                   | ✅ Passed |
| Calculating the total price of an item | Added a product with quantity 2 and checked that `getTotalPrice()` returned the expected price.            | ✅ Passed |
| Calculating the cart subtotal          | Added two products and checked that `getSubtotal()` returned the expected subtotal.                        | ✅ Passed |
| Counting the number of products        | Added two different products and checked that `getNumberOfProducts()` returned 2.                          | ✅ Passed |
| Counting the total number of items     | Added products with quantities 2 and 3 and checked that `getTotalItems()` returned 5.                      | ✅ Passed |
| Applying a discount                    | Applied a 10% discount and checked the discount and total price.                                           | ✅ Passed |
| Removing a discount                    | Applied and removed a discount and checked that the discount was 0 and the total price was back to normal. | ✅ Passed |
| Adding an item with an invalid price   | Tried to add a product with a negative price and checked that it was not added.                            | ✅ Passed |
| Setting an invalid quantity            | Tried to change an item quantity to 0 and checked that the change was rejected.                            | ✅ Passed |
| Applying an invalid discount           | Tried to apply a discount over 100% and checked that it was rejected.                                      | ✅ Passed |
| Updating the quantity of an item       | Used `updateQuantity()` and checked that the quantity was updated.                                         | ✅ Passed |
| Increasing the quantity of an item     | Used `increaseItemQuantity()` and checked that the quantity increased correctly.                           | ✅ Passed |
| Decreasing the quantity of an item     | Used `decreaseItemQuantity()` and checked that the quantity decreased correctly.                           | ✅ Passed |
| Checking if the cart is empty          | Checked a new cart and then checked it again after adding a product.                                       | ✅ Passed |
| Clearing the cart                      | Added products and a discount, cleared the cart and checked that the products and discount were removed.   | ✅ Passed |

All 20 automated tests passed.
