// ============================
// LOAD DATA
// ============================

if (localStorage.getItem("adminLogin") !== "true") {
  window.location.href = "login.html";
}
let products = JSON.parse(localStorage.getItem("products")) || [];

let orders = JSON.parse(localStorage.getItem("deliveredOrders")) || [];

// ============================
// REPORT VALUES
// ============================

let totalOrders = orders.length;

let totalRevenue = 0;

let delivered = 0;

let pending = 0;

orders.forEach((order) => {
  if (order.status === "Delivered") {
    delivered++;

    totalRevenue += Number(order.total);
  }

  if (order.status === "Pending") {
    pending++;
  }
});

// ============================
// UPDATE CARDS
// ============================

document.getElementById("reportOrders").innerText = totalOrders;

document.getElementById("reportRevenue").innerText = "₹" + totalRevenue;

document.getElementById("reportDelivered").innerText = delivered;

document.getElementById("reportPending").innerText = pending;

// ============================
// PRODUCT REPORT
// ============================

let productBox = document.getElementById("productReport");

if (products.length === 0) {
  productBox.innerHTML = `

<div class="report-item">

No Products Added

</div>

`;
}

products.forEach((product) => {
  productBox.innerHTML += `


<div class="report-item">


<div class="report-left">


<img src="${product.image}">


<div>


<h3>
${product.name}
</h3>


<p>
Stock : ${product.stock} ${product.unit}
</p>


</div>


</div>



<h3>
₹${product.price}
</h3>


</div>


`;
});

// ============================
// SALES REPORT
// ============================

let salesBox = document.getElementById("salesReport");

if (orders.length === 0) {
  salesBox.innerHTML = `

<div class="report-item">

No Sales Yet

</div>

`;
}

orders
  .slice()
  .reverse()
  .slice(0, 5)
  .forEach((order) => {
    salesBox.innerHTML += `


<div class="report-item">


<div>


<h3>
${order.product.name}
</h3>


<p>
👤 ${order.customer.name}
</p>


<p>
${order.quantity} ${order.product.unit}
</p>


</div>



<div>


<h3>
₹${order.total}
</h3>


<p>
${order.status}
</p>


</div>



</div>


`;
  });
