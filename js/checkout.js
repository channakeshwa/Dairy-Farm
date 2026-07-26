/*==========================================================
            LAXMI DAIRY FARM
              CHECKOUT PAGE
==========================================================*/

const checkoutProducts = document.getElementById("checkoutProducts");
const subTotal = document.getElementById("subTotal");
const grandTotal = document.getElementById("grandTotal");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

loadCheckout();

function loadCheckout() {
  checkoutProducts.innerHTML = "";

  let total = 0;

  if (cart.length === 0) {
    checkoutProducts.innerHTML = `
            <h3 style="text-align:center;color:#777;padding:40px;">
                Your cart is empty
            </h3>
        `;

    subTotal.innerHTML = "₹0";
    grandTotal.innerHTML = "₹0";

    return;
  }

  cart.forEach((product) => {
    if (product.qty > 0) {
      total += product.price * product.qty;

      checkoutProducts.innerHTML += `

            <div class="checkout-product">

                <img src="${product.image}" alt="${product.name}">

                <div>

                    <h4>${product.name}</h4>

                    <p>${product.unit}</p>

                    <p>Qty : ${product.qty}</p>

                </div>

                <div class="checkout-price">

                    ₹${product.price * product.qty}

                </div>

            </div>

            `;
    }
  });

  subTotal.innerHTML = "₹" + total;
  grandTotal.innerHTML = "₹" + total;
}

/*==============================
        PLACE ORDER
==============================*/

const placeOrder = document.getElementById("placeOrderBtn");
placeOrder.addEventListener("click", () => {
  const name = document
    .querySelector("input[placeholder='Full Name']")
    .value.trim();

  const phone = document
    .querySelector("input[placeholder='Phone Number']")
    .value.trim();

  const house = document
    .querySelector("input[placeholder='House / Flat / Building']")
    .value.trim();

  const area = document
    .querySelector("input[placeholder='Area / Street']")
    .value.trim();

  const city = document.querySelector("input[placeholder='City']").value.trim();

  if (
    name === "" ||
    phone === "" ||
    house === "" ||
    area === "" ||
    pincode === "" ||
    city === "" ||
    state === ""
  ) {
    alert("Please fill all the delivery details.");

    return;
  }

  const order = {
    customer: {
      name,

      phone,

      house,

      area,

      pincode,

      city,

      state,
    },

    products: cart,

    total: grandTotal.innerText,

    date: new Date().toLocaleString(),

    orderId: "LDF" + Math.floor(Math.random() * 100000),
  };

  localStorage.setItem("order", JSON.stringify(order));

  localStorage.removeItem("cart");

  window.location.href = "success.html";
});
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
document.getElementById("finalOrderBtn").addEventListener("click", () => {
  // Later we'll save to Firebase here

  // Clear cart
  localStorage.removeItem("cart");

  // Remove order if needed
  localStorage.removeItem("order");

  // Redirect
  window.location.href = "cart.html";
});
