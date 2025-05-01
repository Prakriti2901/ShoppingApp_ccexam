let cartCount = 0;
let cartTotal = 0;
let cartItems = [];

// Function to handle adding products to the cart
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const product = button.parentElement;
    const name = product.getAttribute("data-name");
    const price = parseFloat(product.getAttribute("data-price"));

    // Add product to cart array
    cartItems.push({ name, price });

    // Update the cart count and total price
    cartCount++;
    cartTotal += price;

    // Update the cart UI
    document.getElementById("cart-count").textContent = cartCount;
    document.getElementById("cart-total").textContent = cartTotal.toFixed(2);

    // Add the product to the cart item list on the page
    updateCartItems();
  });
});

// Function to update the cart items list on the page
function updateCartItems() {
  const cartItemsDiv = document.getElementById("cart-items");
  cartItemsDiv.innerHTML = '';

  cartItems.forEach((item, index) => {
    const cartItemDiv = document.createElement("div");
    cartItemDiv.classList.add("cart-item");

    cartItemDiv.innerHTML = `
      <span>${item.name} - $${item.price.toFixed(2)}</span>
      <button onclick="removeItem(${index})">Remove</button>
    `;

    cartItemsDiv.appendChild(cartItemDiv);
  });
}

// Function to remove an item from the cart
function removeItem(index) {
  // Remove item from cart array
  const removedItem = cartItems.splice(index, 1)[0];

  // Update cart count and total
  cartCount--;
  cartTotal -= removedItem.price;

  // Update the cart UI
  document.getElementById("cart-count").textContent = cartCount;
  document.getElementById("cart-total").textContent = cartTotal.toFixed(2);

  // Update the cart items list
  updateCartItems();
}

// Checkout function
document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cartCount > 0) {
    alert(`Thank you for your purchase!\nTotal: $${cartTotal.toFixed(2)}`);
    // Reset cart after checkout
    cartCount = 0;
    cartTotal = 0;
    cartItems = [];

    document.getElementById("cart-count").textContent = cartCount;
    document.getElementById("cart-total").textContent = cartTotal.toFixed(2);
    updateCartItems();
  } else {
    alert("Your cart is empty!");
  }
});
