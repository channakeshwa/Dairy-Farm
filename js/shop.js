// ==========================
// Load Products From Owner
// ==========================

let products = JSON.parse(localStorage.getItem("products")) || [];

let selectedProductIndex = -1;

let quantity = 1;

// ==========================
// Display Products
// ==========================

function loadShopProducts() {
  let container = document.getElementById("shopProducts");

  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = `
<h2>No Products Available</h2>
`;

    return;
  }

  products.forEach((product, index) => {
    let status = "";

    if (Number(product.stock) === 0) {
      status = `
<span style="color:red">
Out of Stock
</span>
`;
    } else {
      status = `
<span style="color:green">
🟢 Available
</span>
`;
    }

    container.innerHTML += `

<div class="product-card">


<div class="product-image">

<img src="${product.image}">

</div>



<div class="product-info">


<h3>
${product.name}
</h3>


<div class="category">

${product.category}

</div>


<div class="price">

₹${product.price}
/ ${product.unit}

</div>



<div class="stock-status">

${status}

</div>



<button 
class="order-btn"
onclick="openOrderPopup(${index})">

🛒 Order Now

</button>



</div>


</div>


`;
  });
}

// ==========================
// Order Popup
// ==========================

function openOrderPopup(index) {
  selectedProductIndex = index;

  let product = products[index];

  quantity = 1;

  document.getElementById("orderProductImage").src = product.image;

  document.getElementById("orderProductName").innerText = product.name;

  document.getElementById("orderProductPrice").innerText = product.price;

  document.getElementById("orderProductUnit").innerText = product.unit;

  document.getElementById("orderQuantity").innerText = quantity;

  document.getElementById("orderTotal").innerText = product.price;

  document.getElementById("orderPopup").style.display = "flex";
}

// ==========================
// Close Popup
// ==========================

function closeOrderPopup() {
  document.getElementById("orderPopup").style.display = "none";
}

// ==========================
// Quantity
// ==========================

function increaseQty() {
  quantity++;

  updateTotal();
}

function decreaseQty() {
  if (quantity > 1) {
    quantity--;
  }

  updateTotal();
}

function updateTotal() {
  let product = products[selectedProductIndex];

  document.getElementById("orderQuantity").innerText = quantity;

  document.getElementById("orderTotal").innerText =
    quantity * Number(product.price);
}

// ==========================
// Continue Checkout
// ==========================

document.getElementById("continueBtn").addEventListener("click", () => {
  let product = products[selectedProductIndex];

  let order = {
    product: product,

    quantity: quantity,

    total: quantity * Number(product.price),
  };

  localStorage.setItem("currentOrder", JSON.stringify(order));

  window.location.href = "checkout.html";
});

// ==========================
// Search
// ==========================

document.getElementById("search").addEventListener("keyup", function () {
  let value = this.value.toLowerCase();

  let filtered = products.filter((p) => p.name.toLowerCase().includes(value));

  let oldProducts = products;

  products = filtered;

  loadShopProducts();

  products = oldProducts;
});

// Initial Load

loadShopProducts();
