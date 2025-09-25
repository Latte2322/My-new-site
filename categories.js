const categories = [
    { name: "Ноутбуки", image: "images/laptop1.jpg", link: "products.html?cat=laptops", products:[
        {name: "Gaming Laptop", price: 25000, image: "images/laptop1.jpg"},
        {name: "Office Laptop", price: 15000, image: "images/laptop2.jpg"},
        {name: "Premium Laptop", price: 35000, image: "images/laptop3.jpg"}
    ]},
    { name: "Смартфони", image: "images/phone1.jpg", link: "products.html?cat=phones", products:[
        {name: "iPhone 14", price: 30000, image: "images/phone1.jpg"},
        {name: "Samsung Galaxy", price: 25000, image: "images/phone2.jpg"},
        {name: "Xiaomi Mi", price: 12000, image: "images/phone3.jpg"}
    ]},
    { name: "Аксесуари", image: "images/headphones.jpg", link: "products.html?cat=accessories", products:[
        {name: "Навушники", price: 2000, image: "images/headphones.jpg"},
        {name: "Мишка", price: 800, image: "images/mouse.jpg"},
        {name: "Клавіатура", price: 1500, image: "images/keyboard.jpg"}
    ]}
];

const container = document.querySelector('.categories-grid');
categories.forEach(cat => {
    const card = document.createElement('div');
    card.className = 'category-card';
    card.innerHTML = `
        <img src="${cat.image}" alt="${cat.name}" style="width:100%; border-radius:15px;">
        <h3>${cat.name}</h3>
        <div class="products-preview">
            ${cat.products.map(p => `<div class="product-card">
                <img src="${p.image}" alt="${p.name}">
                <p>${p.name}</p>
                <p>${p.price} грн</p>
            </div>`).join('')}
        </div>
        <a href="${cat.link}"><button class="entry-btn">Переглянути</button></a>
    `;
    // Додаємо відкривання прев’ю по кліку
    card.querySelector('h3').addEventListener('click', () => {
        card.classList.toggle('show-preview');
    });
    container.appendChild(card);
});
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function openCart() {
    const modal = document.getElementById('cart-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('show');
    }
}

function closeCart() {
    const modal = document.getElementById('cart-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('show');
    }
}

function addToCart(name, price) {
    cart.push({ name, price });
    saveCart();
    updateCart();
    alert(name + " додано в кошик!");
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCart();
}

function updateCart() {
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total strong');
    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            ${item.name} - ${item.price} грн
            <button onclick="removeFromCart(${index})" 
                style="float:right; background:#ff4444; color:white; border:none; padding:0.2rem 0.5rem; border-radius:3px;">×</button>
        `;
        cartItems.appendChild(div);
        total += item.price;
    });
    cartTotal.textContent = `Загальна сума: ${total} грн`;
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function showOrderForm() {
    const cartModal = document.getElementById('cart-modal');
    const orderModal = document.getElementById('order-modal');
    const orderFormSection = document.querySelector('.form-section');

    if (!cartModal || !orderModal || !orderFormSection) return;

    if (cart.length === 0) {
        alert("Кошик порожній!");
        return;
    }

    let productsList = "";
    let total = 0;
    cart.forEach(item => {
        productsList += `<p>${item.name} - ${item.price} грн</p>`;
        total += item.price;
    });

    orderFormSection.innerHTML = `
        <h3>Загальна сума: ${total} грн</h3>
        <h3>Список товарів:</h3>
        <div>${productsList}</div>
    `;

    closeCart();
    orderModal.classList.remove('hidden');
    orderModal.classList.add('show');
}

function closeOrderForm() {
    const modal = document.getElementById('order-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('show');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateCart();

    const orderForm = document.querySelector('.order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', e => {
            e.preventDefault();
            alert("Замовлення успішно оформлено! Ми зв'яжемося з вами.");
            cart = [];
            saveCart();
            closeOrderForm();
            orderForm.reset();
            updateCart();
        });
    }
});
