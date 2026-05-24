import { cart } from "../data/cart.js";
import { getProduct } from "../data/products.js";
import { getDeliveryOption } from "../data/deliveryOptions.js";
import {addOrder} from "../data/orders.js";
 
 export function renderPayment(){
    let productPrice = 0;
    let shippingPrice = 0;
    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.Id);
        productPrice += product.price * cartItem.quantity;
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionsId);

        shippingPrice += deliveryOption.price;
    });
    const totalPrice = productPrice + shippingPrice;
    const paymentSummaryHTML = `<div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">Rs.${productPrice}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">Rs.${shippingPrice}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">Rs.${totalPrice}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`;
          document.querySelector(".payment-summary").innerHTML = paymentSummaryHTML;

document.querySelector('.place-order-button')
.addEventListener("click",async () => {
  try{
 const response = await fetch('https://supersimplebackend.dev/orders',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
        },
          body: JSON.stringify({
            cart : cart,
          }),
      });
     const order = await response.json();
      addOrder(order);

  }catch(error){
    console.error("Error placing order");
  }
  
  window.location.href = 'orders.html';
})
 }