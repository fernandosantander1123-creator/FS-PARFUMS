let cart = [];

// Cargar carrito desde localStorage al iniciar
window.onload = function() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCart();
  }
}

// Agregar producto al carrito
function addToCart(product, price) {
  const productElement = document.querySelector(`.product[data-name="${product}"] img`);
  const img = productElement ? productElement.src : "";

  const existing = cart.find(item => item.product === product);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ product, price, img, quantity: 1 });
  }
  updateCart();

  // Mensaje breve
  const alertDiv = document.createElement("div");
  alertDiv.textContent = `${product} agregado al carrito!`;
  alertDiv.className = "cart-alert";
  document.body.appendChild(alertDiv);
  setTimeout(() => alertDiv.remove(), 1500);
}

// Actualizar carrito en pantalla y localStorage
function updateCart() {
  const cartList = document.getElementById("cart-list");
  const cartCount = document.getElementById("cart-count");
  cartList.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const li = document.createElement("li");
    li.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <img src="${item.img}" alt="${item.product}" style="width:50px;border-radius:5px;margin-right:10px;">
        <div style="flex:1;">
          <strong>${item.product}</strong><br>
          ${item.price} Gs x ${item.quantity}
        </div>
        <div>
          <button onclick="decreaseQuantity(${index})">-</button>
          <button onclick="increaseQuantity(${index})">+</button>
          <button onclick="removeFromCart(${index})">❌</button>
        </div>
      </div>
    `;
    cartList.appendChild(li);
  });

  const totalLi = document.createElement("li");
  totalLi.innerHTML = `<strong>Total: ${total} Gs</strong>`;
  cartList.appendChild(totalLi);

  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Guardar en localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Eliminar producto
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Aumentar cantidad
function increaseQuantity(index) {
  cart[index].quantity++;
  updateCart();
}

// Disminuir cantidad
function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    removeFromCart(index);
  }
  updateCart();
}

// Mostrar/Ocultar carrito
function toggleCart() {
  const cartDiv = document.getElementById("cart-items");
  cartDiv.style.display = cartDiv.style.display === "block" ? "none" : "block";
}

// Enviar pedido por WhatsApp
function sendWhatsApp(phone) {
  if (cart.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  let message = "Hola! Quiero pedir:\n";
  let total = 0;

  cart.forEach(item => {
    message += `- ${item.product} (${item.quantity}) - ${item.price * item.quantity} Gs\n`;
    total += item.price * item.quantity;
  });

  message += `\nTotal: ${total} Gs`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// 🔎 Buscador
function searchProducts() {
  let input = document.getElementById('search-bar').value.toLowerCase();
  let products = document.querySelectorAll('.product');
  products.forEach(product => {
    let name = product.getAttribute('data-name').toLowerCase();
    product.style.display = name.includes(input) ? 'block' : 'none';
  });
}


