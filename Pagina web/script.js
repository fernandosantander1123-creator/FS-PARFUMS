let cart = [];

function addToCart(name, price) {
  cart.push({ name, price });
  document.getElementById('cart-count').innerText = cart.length;
  alert(name + " agregado al carrito");
}

function toggleCart() {
  const cartDiv = document.getElementById('cart-items');
  cartDiv.style.display = cartDiv.style.display === 'block' ? 'none' : 'block';
  renderCart();
}

function renderCart() {
  const list = document.getElementById('cart-list');
  list.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${item.name} - Gs. ${item.price} 
      <button onclick="removeFromCart(${index})">❌</button>`;
    list.appendChild(li);
    total += item.price;
  });

  const totalLi = document.createElement('li');
  totalLi.textContent = "Total: Gs. " + total;
  totalLi.style.fontWeight = "bold";
  list.appendChild(totalLi);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  document.getElementById('cart-count').innerText = cart.length;
  renderCart();
}

function sendWhatsApp() {
  if (cart.length === 0) {
    alert("Tu carrito está vacío");
    return;
  }

  let message = "Hola! Quiero pedir:\n";
  cart.forEach(item => {
    message += `- ${item.name} (Gs. ${item.price})\n`;
  });

  const phone = "595986338654"; // Reemplaza con tu número real
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}
