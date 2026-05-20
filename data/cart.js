export let cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
    cart = [
       
    ];
}
function saveToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}
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
    saveToLocalStorage();
};
export function removeFromCart(productId) {
    let newCart = [];
    cart.forEach((cartItem) => {
      if (cartItem.Id !== productId) {
        newCart.push(cartItem);
      }
    });
    cart = newCart;
    saveToLocalStorage();
}