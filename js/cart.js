const removeButtons = document.querySelectorAll('.btn-secondary');
const inputHandler = document.querySelectorAll('.cart-quantity-input');
const shoppingItems = document.querySelectorAll('.shop-items .btn-primary');
const cartItemsContainer = document.querySelector('.cart-items');

function updateCartTotal() {
  let total = 0;
  const cartItems = document.querySelectorAll('.cart-items .flex');
  cartItems.forEach(item => {
    let itemPrice = item.querySelector('.cart-price').innerText.replace('$', '');
    let itemQuantity = item.querySelector('.cart-quantity-input').value;
    let name = item.querySelector('.cart-item-title').innerText;
    total += parseFloat(itemPrice) * parseFloat(itemQuantity);
  });
  total = Math.round(total * 100) / 100;
  document.querySelector('.cart-total-price').innerText = `$${total}`;
}

for (item of shoppingItems) {
  item.addEventListener('click', event => {
    const item = event.target.parentNode.parentNode.parentNode;
    const imageSrc = item.querySelector('img.w-full').getAttribute('src');
    const price = parseFloat(item.querySelector('.price').innerText.replace('$', ''));
    const name = item.querySelector('.card-title').innerText;
    const cartItemsName = cartItemsContainer.querySelectorAll('.cart-item-title');
    for (itemName of cartItemsName) {
      if (itemName.innerText === name) {
        let currentItemCount = itemName.parentNode.parentNode.querySelector('.cart-quantity-input');
        let updatedValue = parseInt(currentItemCount.value) + 1;
        currentItemCount.value = updatedValue;
        updateCartTotal();
        return;
      }
    }

    const html = `
    <div class="flex w-full items-center justify-between">
                <div class="cart-item mb-4">
                  <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
                  <span class="cart-item-title">${name}</span>
                </div>
                <span class="cart-price mb-4">$${price}</span>
                <div class="cart-quantity mb-4">
                  <input class="cart-quantity-input" type="number" value="1">
                  <button class="btn btn-secondary" type="button">REMOVE</button>
                </div>
              </div>
    `;
    cartItemsContainer.insertAdjacentHTML('beforeend', html);
    updateCartTotal();

    cartItemsContainer.querySelector('.flex:last-child .btn-secondary').addEventListener('click', removeItem);
    cartItemsContainer.querySelector('.flex:last-child .cart-quantity-input').addEventListener('change', inputPriceController);
  });
}

const removeItem = event => {
  event.target.parentNode.parentNode.remove();
  updateCartTotal();
};

const inputPriceController = event => {
  if (event.target.value <= 0) {
    event.target.value = 1;
  }
  updateCartTotal();
};

removeButtons.forEach(button => {
  button.addEventListener('click', removeItem);
});

for (input of inputHandler) {
  input.addEventListener('change', inputPriceController);
}
