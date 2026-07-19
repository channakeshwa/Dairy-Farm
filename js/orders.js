// ==========================================
// ORDER HISTORY
// ==========================================
if (localStorage.getItem("adminLogin") !== "true") {
  window.location.href = "login.html";
}
let orders = JSON.parse(localStorage.getItem("orders")) || [];

// ==========================================
// INITIAL LOAD
// ==========================================

loadSummary();
loadOrders();

// ==========================================
// SUMMARY
// ==========================================

function loadSummary() {
  document.getElementById("totalOrders").innerText = orders.length;

  const pending = orders.filter((order) => order.status === "Pending").length;

  document.getElementById("pendingOrders").innerText = pending;

  let revenue = 0;

  orders.forEach((order) => {
    revenue += Number(order.total);
  });

  document.getElementById("totalRevenue").innerText = "₹" + revenue;
}

// ==========================================
// LOAD ORDERS
// ==========================================

function loadOrders(orderData = orders) {
  const orderContainer = document.getElementById("orderContainer");

  if (!orderContainer) return;

  orderContainer.innerHTML = "";

  if (orderData.length === 0) {
    orderContainer.innerHTML = `

        <div class="no-orders">

            <h2>📦 No Orders Yet</h2>

            <p>Your placed orders will appear here.</p>

        </div>

        `;

    return;
  }

  orderData.forEach((order, index) => {
    orderContainer.innerHTML += `

<div class="order-card">

    <div class="order-image-box">

        <img
            src="${order.product.image}"
            class="order-image"
            alt="${order.product.name}">

    </div>

    <div class="order-content">

        <div class="order-header">

            <div>

                <h2 class="product-title">

                    ${order.product.name}

                </h2>

                <p class="customer-name">

                    👤 ${order.customer.name}

                </p>

                <p class="customer-phone">

                    📞 ${order.customer.phone}

                </p>

            </div>

            <span class="status-badge">

                ${order.status}

            </span>

        </div>

        <div class="order-divider"></div>

        <div class="order-info">

            <div class="info-box">

                <span>Quantity</span>

                <strong>

                    ${order.quantity}
                    ${order.product.unit}

                </strong>

            </div>

            <div class="info-box">

                <span>Total Amount</span>

                <strong>

                    ₹${order.total}

                </strong>

            </div>

        </div>

        <div class="order-divider"></div>

        <div class="order-footer">

            <small>

                📅 ${order.orderDate}

            </small>

            <div class="order-actions">

                <button
                    class="view-btn"
                    onclick="viewOrder(${index})">

                    👁 View

                </button>

                <button
                    class="deliver-btn"
                    onclick="deliverOrder(${index})">

                    ✔ Deliver

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteOrder(${index})">

                    🗑 Delete

                </button>

            </div>

        </div>

    </div>

</div>

`;
  });
}

// ==========================================
// VIEW ORDER
// ==========================================

function viewOrder(index) {
  const order = orders[index];

  alert(
    `Customer : ${order.customer.name}

Phone : ${order.customer.phone}

Product : ${order.product.name}

Quantity : ${order.quantity} ${order.product.unit}

Total : ₹${order.total}

Status : ${order.status}`,
  );
}

// ==========================================
// DELIVER ORDER
// ==========================================

function deliverOrder(index) {
  let confirmDelivery = confirm("Mark this order as delivered?");

  if (!confirmDelivery) return;

  let deliveredOrder = orders[index];

  // save delivered history

  let deliveredOrders =
    JSON.parse(localStorage.getItem("deliveredOrders")) || [];

  deliveredOrder.status = "Delivered";

  deliveredOrders.push(deliveredOrder);

  localStorage.setItem("deliveredOrders", JSON.stringify(deliveredOrders));

  // remove from pending orders

  orders.splice(index, 1);

  localStorage.setItem("orders", JSON.stringify(orders));

  // remove notification

  let notifications = JSON.parse(localStorage.getItem("notifications")) || [];

  notifications = notifications.filter(
    (n) => n.phone !== deliveredOrder.customer.phone,
  );

  localStorage.setItem("notifications", JSON.stringify(notifications));

  loadOrders();

  alert("🥛 Order Delivered Successfully");
}

// ==========================================
// DELETE ORDER
// ==========================================

function deleteOrder(index) {
  if (!confirm("Delete this order?")) return;

  orders.splice(index, 1);

  localStorage.setItem("orders", JSON.stringify(orders));

  loadSummary();

  loadOrders();
}

// ==========================================
// SEARCH ORDERS
// ==========================================

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function () {
  let value = searchInput.value.toLowerCase();

  let filteredOrders = orders.filter((order) => {
    return (
      order.product.name.toLowerCase().includes(value) ||
      order.customer.name.toLowerCase().includes(value) ||
      order.customer.phone.includes(value)
    );
  });

  loadOrders(filteredOrders);
});
