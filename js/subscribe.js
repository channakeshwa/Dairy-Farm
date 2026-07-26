// ===============================
// Open Subscription Page
// ===============================

function openSubscription(plan) {
  // Save selected plan
  localStorage.setItem("selectedPlan", plan);

  // Redirect
  window.location.href = "subscribe.html";
}

// ===============================
// Auto Fill Selected Plan
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const plan = localStorage.getItem("selectedPlan");

  const planDropdown = document.getElementById("selectedPlan");

  if (plan && planDropdown) {
    planDropdown.value = plan;
  }
});
function openQR() {
  document.getElementById("qrPopup").style.display = "flex";
}

function closeQR() {
  document.getElementById("qrPopup").style.display = "none";
}

// Close popup when clicking outside

window.onclick = function (event) {
  let popup = document.getElementById("qrPopup");

  if (event.target == popup) {
    popup.style.display = "none";
  }
};
