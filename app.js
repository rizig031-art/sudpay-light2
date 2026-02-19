let balance = 25000;

function login() {
  const phone = document.getElementById("phoneInput").value;

  if (phone.trim() === "") {
    alert("الرجاء إدخال رقم الهاتف");
    return;
  }

  document.getElementById("userPhone").innerText = phone;
  document.getElementById("loginScreen").classList.remove("active");
  document.getElementById("mainScreen").classList.add("active");
}

function makePayment(type) {

  let amount = Math.floor(Math.random() * 4000) + 500;

  if (balance < amount) {
    alert("رصيد غير كافي");
    return;
  }

  balance -= amount;
  updateBalance();
  addTransaction(type, amount);
}

function updateBalance() {
  document.getElementById("balance").innerText =
    balance.toLocaleString() + " SDG";
}

function addTransaction(type, amount) {

  const list = document.getElementById("transactionList");

  const li = document.createElement("li");
  li.innerHTML = `
    <strong>${type}</strong><br>
    - ${amount.toLocaleString()} SDG<br>
    <small>${new Date().toLocaleString()}</small>
  `;

  list.prepend(li);
}
