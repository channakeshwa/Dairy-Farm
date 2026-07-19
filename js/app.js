import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

console.log("Firebase Connected 🥛🔥", db);
// Owner page protection

if (localStorage.getItem("adminLogin") !== "true") {
  window.location.href = "login.html";
}
let products = JSON.parse(localStorage.getItem("products")) || [];
let customer = JSON.parse(localStorage.getItem("customer")) || [];
let editIndex = -1;
let selectedProductIndex = -1;
let quantity = 1;
// ==========================
// Add Customer
// ==========================

function addCustomer() {
  let name = document.getElementById("customerName").value;
  let phone = document.getElementById("customerPhone").value;

  if (name === "" || phone === "") {
    alert("Please fill all fields");
    return;
  }

  let customer = {
    name: name,
    phone: phone,
  };
  customer.push(customer);

  localStorage.setItem("customer", JSON.stringify(customer));

  loadCustomer();

  document.getElementById("customerName").value = "";
  document.getElementById("customerPhone").value = "";
}

function loadCustomer() {
  let customerList = document.getElementById("customerList");

  if (!customerList) return;

  customerList.innerHTML = "";

  customer.forEach((customer) => {
    customerList.innerHTML += `
            <div class="customer-card">
                <h3>${customer.name}</h3>
                <p>Phone : ${customer.phone}</p>
            </div>
        `;
  });
}
// ==========================
// Popup
// ==========================

const popup = document.getElementById("popup");
const addBtn = document.getElementById("addBtn");
const cancelBtn = document.getElementById("cancelBtn");

popup.style.display = "none";

addBtn.onclick = function () {
  popup.style.display = "flex";
};

cancelBtn.onclick = function () {
  popup.style.display = "none";
};

// ==========================
// Image Preview
// ==========================

const imageInput = document.getElementById("image");
const previewImage = document.getElementById("previewImage");

imageInput.addEventListener("change", function () {
  let file = this.files[0];

  if (!file) return;

  let reader = new FileReader();

  reader.onload = function (e) {
    previewImage.src = e.target.result;
    previewImage.style.display = "block";

    document.getElementById("uploadText").style.display = "none";
  };

  reader.readAsDataURL(file);
});

// ==========================
// Add Product
// ==========================

async function addProduct() {
  let name = document.getElementById("productName").value;
  let price = document.getElementById("productPrice").value;
  let stock = document.getElementById("productStock").value;
  let category = document.getElementById("productCategory").value;
  let unit = document.getElementById("productUnit").value;
  let image = previewImage.src;

  if (
    name === "" ||
    price === "" ||
    stock === "" ||
    category === "" ||
    image === ""
  ) {
    alert("Please fill all fields.");
    return;
  }

  let product = {
    name,
    price,
    stock,
    category,
    unit,
    image,
  };

  if (editIndex === -1) {
    await addDoc(collection(db, "products"), product);

    alert("Product added successfully 🥛🔥");
  } else {
    products[editIndex] = product;

    editIndex = -1;
  }

  loadProducts();

  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productStock").value = "";
  document.getElementById("productCategory").selectedIndex = 0;
  document.getElementById("productUnit").selectedIndex = 0;

  previewImage.src = "";
  previewImage.style.display = "none";

  document.getElementById("uploadText").style.display = "block";

  document.getElementById("saveBtn").innerHTML = "💾 Save Product";

  popup.style.display = "none";
}

// ==========================
// Load Products
// ==========================

function loadProducts() {
  let productList = document.getElementById("productContainer");

  productList.innerHTML = "";

  products.forEach((product, index) => {
    let stockStatus = "";
    let stockColor = "";

    if (Number(product.stock) === 0) {
      stockStatus = "🔴 Out of Stock";
      stockColor = "#E53935";
    } else if (Number(product.stock) <= 5) {
      stockStatus = "🟡 Low Stock";
      stockColor = "#FB8C00";
    } else {
      stockStatus = "🟢 In Stock";
      stockColor = "#2E7D32";
    }

    productList.innerHTML += `

        <div class="product-card">

            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>

            <div class="product-info">

                <h3>${product.name}</h3>

                <div class="category">${product.category}</div>

                <div class="price">
                    ₹${product.price} / ${product.unit}
                </div>

                <div class="stock">
                    Stock : ${product.stock} ${product.unit}
                </div>

                <div class="stock-status"
                     style="color:${stockColor};">

                     ${stockStatus}

                </div>
<div class="actions">

    <button
        class="order-btn"
        onclick="openOrderPopup(${index})">

        🛒 Order Now

    </button>

    <button
        class="edit-btn"
        onclick="editProduct(${index})">

        ✏ Edit

    </button>

    <button
        class="delete-btn"
        onclick="deleteProduct(${index})">

        🗑 Delete

    </button>

</div>

            </div>

        </div>

        `;
  });
}

// ==========================
// Delete Product
// ==========================

function deleteProduct(index) {
  let confirmDelete = confirm("Delete this product?");

  if (!confirmDelete) return;

  products.splice(index, 1);

  localStorage.setItem("products", JSON.stringify(products));

  loadProducts();
}

// ==========================
// Edit Product
// ==========================

function editProduct(index) {
  editIndex = index;

  let product = products[index];

  document.getElementById("productName").value = product.name;
  document.getElementById("productPrice").value = product.price;
  document.getElementById("productStock").value = product.stock;
  document.getElementById("productCategory").value = product.category;
  document.getElementById("productUnit").value = product.unit;

  previewImage.src = product.image;
  previewImage.style.display = "block";

  document.getElementById("uploadText").style.display = "none";

  document.getElementById("saveBtn").innerHTML = "✏ Update Product";

  popup.style.display = "flex";
}

// ==========================
// Initial Load
// ==========================

loadProducts();

loadCustomer();
function openOrderPopup(index) {
  selectedProductIndex = index;

  let product = products[index];
  quantity = 1;

  document.getElementById("orderProductImage").src = product.image;

  document.getElementById("orderProductName").innerText = product.name;

  document.getElementById("orderProductPrice").innerText = product.price;

  document.getElementById("orderProductUnit").innerText = product.unit;

  document.getElementById("orderProductStock").innerText = product.stock;

  document.getElementById("orderStockUnit").innerText = product.unit;

  document.getElementById("orderQuantity").innerText = 1;

  document.getElementById("orderTotal").innerText = product.price;

  document.getElementById("orderPopup").style.display = "flex";
}
function closeOrderPopup() {
  document.getElementById("orderPopup").style.display = "none";
}

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
document.getElementById("continueBtn").addEventListener("click", () => {
  const order = {
    product: products[selectedProductIndex],

    quantity: quantity,

    total: quantity * Number(products[selectedProductIndex].price),
  };
  localStorage.setItem("currentOrder", JSON.stringify(order));

  window.location.href = "checkout.html";
});
