 export let deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    price: 0,
},{
    id: '2',
    deliveryDays: 3,
    price: 100,
},{
    id: '3',
    deliveryDays: 1,
    price: 200,
}];
export function getDeliveryOption(optionId) {
     let deliveryOption;
  deliveryOptions.forEach((option) => {
    if (option.id === optionId) {
      deliveryOption = option;
    }  });
        return deliveryOption || deliveryOptions[0];
}