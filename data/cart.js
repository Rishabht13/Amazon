export const cart = [];
export function addToCart(productId) {
 let matchedcartItem;
    cart.forEach((cartItem) => {
      if (cartItem.Id === productId) {
        matchedcartItem = cartItem;
      }
    });
    if (matchedcartItem) {
      matchedcartItem.quantity += 1;
    } else {
      cart.push({
        Id: productId,
        quantity: 1,
      });
    }
};