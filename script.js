let cartCount = 0;
let cartItems = [];

document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const product = button.closest(".product");
    const name = product.getAttribute("data-name");
    const price = parseFloat(product.getAttribute("data-price"));
    const quantity = parseInt(product.querySelector(".quantity").value);

    for (let i = 0; i < quantity; i++) {
      cartItems.push({ name, price });
    }

    cartCount += quantity;
    document.getElementById("cart-count").textContent = cartCount;

    document.getElementById("cart-count").classList.add("bump");
    setTimeout(() => document.getElementById("cart-count").classList.remove("bump"), 300);

    updateCartItems();
    showToast(`${quantity} x ${name} added to cart!`);
  });
});

function updateCartItems() {
  const cartItemsDiv = document.getElementById("cart-items");
  cartItemsDiv.innerHTML = '';

  let total = 0;
  cartItems.forEach((item, index) => {
    total += item.price;
    const cartItemDiv = document.createElement("div");
    cartItemDiv.classList.add("cart-item");
    cartItemDiv.innerHTML = `
      <span>${item.name} - $${item.price.toFixed(2)}</span>
      <button onclick="removeItem(${index})">Remove</button>
    `;
    cartItemsDiv.appendChild(cartItemDiv);
  });
}

function removeItem(index) {
  const removed = cartItems.splice(index, 1)[0];
  cartCount--;
  document.getElementById("cart-count").textContent = cartCount;
  updateCartItems();
  showToast(`${removed.name} removed!`);
}

document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cartItems.length) {
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    alert(`Thank you! Total: $${total.toFixed(2)}`);
    cartCount = 0;
    cartItems = [];
    document.getElementById("cart-count").textContent = cartCount;
    updateCartItems();
  } else {
    alert("Cart is empty!");
  }
});

document.getElementById("theme-toggle").addEventListener("change", (e) => {
  document.body.classList.toggle("dark", e.target.checked);
});

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.display = "block";
  setTimeout(() => toast.style.display = "none", 2500);
}
