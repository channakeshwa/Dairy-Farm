// ==========================
// Load Current Order
// ==========================

const currentOrder = JSON.parse(localStorage.getItem("currentOrder"));

if (!currentOrder) {
  alert("No order found!");

  window.location.href = "products.html";
}

// Product Details
document.getElementById("summaryImage").src = currentOrder.product.image;

document.getElementById("summaryName").innerText = currentOrder.product.name;

document.getElementById("summaryPrice").innerText =
  `₹${currentOrder.product.price} / ${currentOrder.product.unit}`;

document.getElementById("summaryQty").innerText =
  `Quantity : ${currentOrder.quantity}`;

document.getElementById("summaryTotal").innerText = `₹${currentOrder.total}`;
// ==========================
// Place Order
// ==========================

document.getElementById("placeOrderBtn").addEventListener("click", placeOrder);

function placeOrder() {
  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const address = document.getElementById("customerAddress").value.trim();
  const city = document.getElementById("customerCity").value.trim();
  const pincode = document.getElementById("customerPincode").value.trim();

  // Validation

  if (name === "") {
    alert("Please enter customer name.");
    return;
  }

  if (!/^[0-9]{10}$/.test(phone)) {
    alert("Enter a valid 10-digit mobile number.");
    return;
  }

  if (address === "") {
    alert("Please enter delivery address.");
    return;
  }

  if (city === "") {
    alert("Please enter city.");
    return;
  }

  if (!/^[0-9]{6}$/.test(pincode)) {
    alert("Enter a valid 6-digit pincode.");
    return;
  }

  // Get existing orders
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  // Create new order
  const newOrder = {
    id: Date.now(),

    customer: {
      name,
      phone,
      address,
      city,
      pincode,
    },

    product: currentOrder.product,

    quantity: currentOrder.quantity,

    total: currentOrder.total,

    status: "Pending",

    orderDate: new Date().toLocaleString(),
  };

  // Save order
  orders.push(newOrder);

  // ==========================
  // Admin Notification
  // ==========================
  // ==========================
  // Save Order For Admin
  // ==========================


  orders.push(newOrder);

  localStorage.setItem("orders", JSON.stringify(orders));

  let notifications = JSON.parse(localStorage.getItem("notifications")) || [];

  notifications.push({
    message: "🛒 New Order Received",

    product: newOrder.product.name,

    quantity: newOrder.quantity,

    unit: newOrder.product.unit,

    amount: newOrder.total,

    customer: newOrder.customer.name,

    phone: newOrder.customer.phone,

    address: newOrder.customer.address,

    city: newOrder.customer.city,

    pincode: newOrder.customer.pincode,

    time: newOrder.orderDate,

    seen: false,
  });

  localStorage.setItem("notifications", JSON.stringify(notifications));
  localStorage.removeItem("currentOrder");

  // Success message
  alert("🎉 Order Placed Successfully!");

  // Redirect to Orders page
  window.location.href = "shop.html";

  // Reduce Stock

  let products = JSON.parse(localStorage.getItem("products")) || [];

  const productIndex = products.findIndex(
    (p) =>
      p.name === currentOrder.product.name &&
      p.category === currentOrder.product.category,
  );

  if (productIndex !== -1) {
    products[productIndex].stock =
      Number(products[productIndex].stock) - currentOrder.quantity;

    localStorage.setItem("products", JSON.stringify(products));
  }
  alert("🎉 Order Saved Successfully!");
}
