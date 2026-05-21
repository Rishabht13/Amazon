import { cart, removeFromCart,updateDeliveryOption } from "../data/cart.js";
import { getProduct, products } from "../data/products.js";
import dayjs from " https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions,getDeliveryOption } from "../data/deliveryOptions.js";
import { renderPayment } from "./paymentSummary.js";
export function renderCheckout() {
let cartItemsHTML = "";
cart.forEach((cartItem) => {
  const productid = cartItem.Id;
   
    const matchedProduct = getProduct(productid);
  const deliveryOptionId = cartItem.deliveryOptionsId;
     
    const deliveryOption = getDeliveryOption(deliveryOptionId);
     const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format("dddd, MMMM D");
  
  cartItemsHTML += `<div class="cart-item-container container-${matchedProduct.id}">
            <div class="delivery-date"
            >
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchedProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                    ${matchedProduct.name}
                </div>
                <div class="product-price">
                    Rs. ${matchedProduct.price}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary" data-product-id="${matchedProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchedProduct,cartItem)}
                </div>
              </div>
            </div>
          </div>`;
});
function deliveryOptionsHTML(matchedProduct,cartItem) {
  let html = "";
  deliveryOptions.forEach((option) => {
    const today = dayjs();
    const deliveryDate = today.add(option.deliveryDays, 'days');const dateString = deliveryDate.format("dddd, MMMM D");
    const priceString = option.price === 0 ? "FREE Shipping" : `Rs${option.price} - Shipping`;
    

    html +=
    `<div class="delivery-option"
    data-option-id="${option.id}"
    data-product-id="${matchedProduct.id}">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchedProduct.id}"
                    ${option.id === cartItem.deliveryOptionsId ? "checked" : ""}>
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString}
                    </div>
                  </div>
                </div>`
  });
  return html;
}
document.querySelector(".order-summary").innerHTML = cartItemsHTML;

document.querySelectorAll(".delete-quantity-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);
    const container = document.querySelector(`.container-${productId}`);

    container.remove();
    renderPayment();
  });
});
document.querySelectorAll('.delivery-option').forEach((element) =>{
element.addEventListener('click', () => {
  const {productId, optionId} = element.dataset;
  updateDeliveryOption(productId, optionId);
  renderCheckout();
  renderPayment();
})
})
}
renderCheckout();