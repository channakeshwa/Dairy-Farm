let customers = JSON.parse(localStorage.getItem("customers")) || [];

function addCustomer() {
  let name = document.getElementById("customerName").value;

  let phone = document.getElementById("customerPhone").value;

  if (name === "" || phone === "") {
    alert("Please fill all details");

    return;
  }

  let newCustomer = {
    name: name,

    phone: phone,
  };

  customers.push(newCustomer);

  localStorage.setItem("customers", JSON.stringify(customers));

  document.getElementById("customerName").value = "";

  document.getElementById("customerPhone").value = "";

  loadCustomers();
}
function loadCustomers() {
  let list = document.getElementById("customerList");

  list.innerHTML = "";

  if (customers.length === 0) {
    list.innerHTML = `
<div class="customer-card">
<h3>📦 No Customers Added</h3>
</div>
`;

    return;
  }

  customers.forEach((customer, index) => {
    list.innerHTML += `

<div class="customer-card">


<div class="customer-number">

${index + 1}

</div>


<div class="customer-details">

<h3>👤 ${customer.name}</h3>

<p>📞 ${customer.phone}</p>

</div>


<button 
class="delete-customer"
onclick="deleteCustomer(${index})">

🗑 Delete

</button>


</div>

`;
  });
}
function deleteCustomer(index) {
  let confirmDelete = confirm("Delete this customer?");

  if (!confirmDelete) return;

  customers.splice(index, 1);

  localStorage.setItem("customers", JSON.stringify(customers));

  loadCustomers();
}
