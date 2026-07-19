if (localStorage.getItem("adminLogin") !== "true") {
  window.location.href = "login.html";
}
let products = JSON.parse(localStorage.getItem("products")) || [];

let total = products.length;

let inStock = 0;
let lowStock = 0;
let outStock = 0;

products.forEach((product) => {
  let stock = Number(product.stock);

  if (stock == 0) {
    outStock++;
  } else if (stock <= 5) {
    lowStock++;
  } else {
    inStock++;
  }
});

document.getElementById("totalProducts").innerText = total;

document.getElementById("inStock").innerText = inStock;

document.getElementById("lowStock").innerText = lowStock;

document.getElementById("outStock").innerText = outStock;

document.getElementById("dashboardProducts").innerText = total;
document.getElementById("dashboardInStock").innerText = inStock;
document.getElementById("dashboardLowStock").innerText = lowStock;

// ==========================
// Low Stock Alerts
// ==========================

let lowStockContainer = document.getElementById("lowStockContainer");

products.forEach((product) => {
  let stock = Number(product.stock);

  if (stock <= 5) {
    let status = "";

    if (stock == 0) {
      status = "🔴 Out of Stock";
    } else {
      status = `🟡 Only ${stock} ${product.unit} Left`;
    }

    lowStockContainer.innerHTML += `

        <div class="alert-card">

            <div>

                <div class="alert-product">

                    ${product.image ? `<img src="${product.image}" class="alert-image">` : ""}

                    ${product.name}

                </div>

                <small>${product.category}</small>

            </div>

            <div class="alert-stock">

                ${status}

            </div>

        </div>

        `;
  }
});

if (lowStockContainer.innerHTML === "") {
  lowStockContainer.innerHTML = `

        <div class="alert-card">

            <div class="alert-product">

                ✅ Great Job!

            </div>

            <div>

                No Low Stock Products

            </div>

        </div>

    `;
}
// ===========================
// Recent Products
// ===========================

let recentContainer = document.getElementById("recentProducts");

// Show latest 3 products

let latestProducts = [...products].reverse().slice(0, 3);

latestProducts.forEach((product) => {
  recentContainer.innerHTML += `

    <div class="recent-card">

        <div class="recent-left">

            <img src="${product.image}">

            <div>

                <div class="recent-name">

                    ${product.name}

                </div>

                <div class="recent-category">

                    ${product.category}

                </div>

            </div>

        </div>

        <div class="recent-price">

            ₹${product.price}

        </div>

    </div>

    `;
});
// ===========================
// Product Analytics
// ===========================

let milk = 0;
let butter = 0;
let curd = 0;
let ghee = 0;

products.forEach((product) => {
  let name = product.name.toLowerCase();

  if (name.includes("milk")) {
    milk++;
  } else if (name.includes("butter")) {
    butter++;
  } else if (name.includes("curd")) {
    curd++;
  } else if (name.includes("ghee")) {
    ghee++;
  }
});

document.getElementById("milkCount").innerText = milk;
document.getElementById("butterCount").innerText = butter;
document.getElementById("curdCount").innerText = curd;
document.getElementById("gheeCount").innerText = ghee;
// ==========================
// Greeting & Date
// ==========================

let now = new Date();

let hour = now.getHours();

let greeting = "";

if (hour < 12) {
  greeting = "🌅 Good Morning";
} else if (hour < 17) {
  greeting = "☀ Good Afternoon";
} else if (hour < 21) {
  greeting = "🌇 Good Evening";
} else {
  greeting = "🌙 Good Night";
}

document.getElementById("greeting").innerText = greeting;

let options = {
  weekday: "long",

  day: "numeric",

  month: "long",

  year: "numeric",
};

document.getElementById("todayDate").innerText = now.toLocaleDateString(
  "en-IN",
  options,
);
// ==========================
// Notification Badge
// ==========================

let alerts = 0;

products.forEach((product) => {
  if (Number(product.stock) <= 5) {
    alerts++;
  }
});

document.getElementById("notificationCount").innerText = alerts;
// ==========================
// Orders Analytics
// ==========================

let orders = JSON.parse(localStorage.getItem("deliveredOrders")) || [];
let revenue = 0;

let pendingOrders = 0;

let deliveredOrders = 0;

orders.forEach((order) => {
  if (order.status === "Delivered") {
    revenue += Number(order.total);

    deliveredOrders++;
  }

  if (order.status === "Pending") {
    pendingOrders++;
  }
});

// Revenue

document.getElementById("todayRevenue").innerText = "₹" + revenue;

// ==========================
// Dashboard Search
// ==========================

let searchBox = document.getElementById("dashboardSearch");

let searchArea = document.getElementById("searchResults");

searchBox.addEventListener("input", function () {
  let keyword = this.value.toLowerCase();

  searchArea.innerHTML = "";

  // empty search
  if (keyword.trim() === "") {
    return;
  }

  let searchProducts = JSON.parse(localStorage.getItem("products")) || [];

  let result = searchProducts.filter((item) => {
    return (
      item.name.toLowerCase().includes(keyword) ||
      item.category.toLowerCase().includes(keyword)
    );
  });

  if (result.length === 0) {
    searchArea.innerHTML = `

        <div class="search-result-card">

        ❌ No Product Found

        </div>

        `;

    return;
  }

  result.forEach((product) => {
    searchArea.innerHTML += `

<div class="search-result-card">

    <img src="${product.image}">


    <div class="search-product-info">

        <h3>
            ${product.name}
        </h3>


        <h4>
            ₹${product.price} / ${product.unit}
        </h4>


    </div>


</div>

`;
  });
});

function loadNotifications() {
  let notifications = JSON.parse(localStorage.getItem("notifications")) || [];

  let unread = notifications.filter((n) => n.seen === false);

  document.getElementById("notificationCount").innerText = unread.length;
}

loadNotifications();
function showNotifications() {
  let box = document.getElementById("notificationBox");

  let notifications = JSON.parse(localStorage.getItem("notifications")) || [];

  box.innerHTML = "";

  if (notifications.length === 0) {
    box.innerHTML = "<p>No Notifications</p>";
  }

  notifications.reverse().forEach((n) => {
    box.innerHTML += `

<div class="notification-item">


<h4>${n.message}</h4>


<p>🥛 ${n.product}</p>


<p>
📦 Qty : ${n.quantity} ${n.unit}
</p>


<p>
💰 ₹${n.amount}
</p>


<p>
👤 ${n.customer}
</p>


<p>
📞 ${n.phone}
</p>

<p>
🏠 Address :
${n.address}
</p>



<p>
📍 
${n.city} -
${n.pincode}
</p>




<small>
${n.time}
</small>


</div>

`;

    n.seen = true;
  });

  localStorage.setItem("notifications", JSON.stringify(notifications));

  document.getElementById("notificationCount").innerText = 0;

  box.style.display = box.style.display === "block" ? "none" : "block";
}
