/*==================================================
        LAXMI DAIRY FARM
            CART PAGE
==================================================*/

const cart = [
  {
    id: 1,
    name: "Fresh Buffalo Milk",
    unit: "1 Litre",
    price: 90,
    qty: 0,
    image: "milk.jpeg",
  },

  {
    id: 2,
    name: "Pure Buffalo Ghee",
    unit: "500 ml",
    price: 850,
    qty: 0,
    image: "Ghee.jpeg",
  },

  {
    id: 3,
    name: "Fresh Curd",
    unit: "500 gm",
    price: 80,
    qty: 0,
    image: "curd.jpeg",
  },
];

const cartItems = document.getElementById("cartItems");

const subtotal = document.getElementById("subtotal");

const total = document.getElementById("total");

function loadCart() {
  cartItems.innerHTML = "";

  let grandTotal = 0;

  cart.forEach((product, index) => {
    grandTotal += product.price * product.qty;

    cartItems.innerHTML += `

        <div class="cart-item">

            <div class="product-info">

                <img src="${product.image}">

                <div class="product-details">

                    <h3>${product.name}</h3>

                    <p>${product.unit}</p>

                    <div class="price">₹${product.price}</div>

                </div>

            </div>

            <div class="quantity">

                <button class="qty-btn"
                onclick="decreaseQty(${index})">−</button>

                <span class="qty-number">

                    ${product.qty}

                </span>

                <button class="qty-btn"
                onclick="increaseQty(${index})">+</button>

            </div>

        </div>

        `;
  });

  subtotal.innerHTML = "₹" + grandTotal;

  total.innerHTML = "₹" + grandTotal;
}

function increaseQty(index) {
  cart[index].qty++;

  loadCart();
}

function decreaseQty(index) {
  if (cart[index].qty > 0) {
    cart[index].qty--;
  }

  loadCart();
}

loadCart();
function goToCheckout() {
  localStorage.setItem("cart", JSON.stringify(cart));

  window.location.href = "checkout.html";
}
const placeBtn = document.getElementById("placeOrderBtn");

const popup = document.getElementById("paymentPopup");

const closeBtn = document.querySelector(".close-payment");

const paidBtn = document.getElementById("paidBtn");

const paymentProof = document.getElementById("paymentProof");

placeBtn.addEventListener("click", () => {
  const payment = document.querySelector('input[name="payment"]:checked');

  if (!payment) {
    alert("Select Payment Method");

    return;
  }

  if (payment.value === "UPI" || payment.value === "Online") {
    popup.style.display = "flex";
  } else {
    // COD

    alert("Order Placed Successfully");

    // Firebase later
  }
});

closeBtn.onclick = () => {
  popup.style.display = "none";
};

paidBtn.onclick = () => {
  popup.style.display = "none";

  paymentProof.style.display = "block";

  paymentProof.scrollIntoView({
    behavior: "smooth",
  });
};

window.onclick = (e) => {
  if (e.target == popup) {
    popup.style.display = "none";
  }
};
