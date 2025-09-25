
const products = [
    { 
        name: "Samsung Galaxy S23", 
        price: 29999, 
        image: "galaxy_s23.jpg", 
        shortDesc: "Флагманський смартфон з камерою 200 МП.", 
        fullDescPage: "phone2.html" 
    },
    { 
        name: "iPhone 14", 
        price: 39999, 
        image: "iphone_14.jpg", 
        shortDesc: "Новий iPhone з OLED дисплеєм та потужним процесором.", 
        fullDescPage: "phone1.html" 
    },
    { 
        name: "Xiaomi 13 Pro", 
        price: 25999, 
        image: "xiaomi_13_pro.jpg", 
        shortDesc: "Флагман Xiaomi з Leica камерою та швидкою зарядкою.", 
        fullDescPage: "phone3.html" 
    },
];


const productsGridContainer = document.querySelector('.products-grid');

products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'category-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" style="width:100%; border-radius:15px; margin-bottom:1rem;">
        <h3>${product.name}</h3>
        <p>${product.shortDesc}</p>
        <div style="display:flex; gap:10px; justify-content:center;">
            <button class="entry-btn" onclick="addToCart('${product.name}', ${product.price})">Замовити</button>
            <a href="${product.fullDescPage}" class="entry-btn" style="background:#555; color:white;">Детальніше</a>
        </div>
    `;
    productsGridContainer.appendChild(card);
});

function addToCart(name, price) {
    cart.push({name, price});
    updateCart();
    alert(name + " додано в кошик!");
}

function updateCart() {
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total strong');
    if(!cartItems || !cartTotal) return;
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach((item,index)=>{
        const div=document.createElement('div');
        div.className='cart-item';
        div.innerHTML=`${item.name} - ${item.price} грн <button onclick="removeFromCart(${index})" style="float:right;background:#ff4444;color:white;border:none;padding:0.2rem 0.5rem;border-radius:3px;">×</button>`;
        cartItems.appendChild(div);
        total+=item.price;
    });
    cartTotal.textContent=`Загальна сума: ${total} грн`;
}

function removeFromCart(index){cart.splice(index,1);updateCart();}
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

    const searchInputs = document.querySelectorAll('.search-input');
    searchInputs.forEach(input => {
        input.addEventListener('input', e => {
            const query = e.target.value.toLowerCase();
            console.log("Пошук:", query);
        });
    });

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
