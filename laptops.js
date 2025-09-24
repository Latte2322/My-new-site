let cart = [];

const products = [
    { name:"Ноутбук Gaming", price:25000, image:"images/laptop1.jpg", shortDesc:"Потужний ігровий ноутбук для геймерів.", fullDescPage:"laptop1.html" },
    { name:"Ноутбук Office", price:15000, image:"images/laptop2.jpg", shortDesc:"Надійний ноутбук для роботи та навчання.", fullDescPage:"laptop2.html" },
    { name:"Ноутбук Premium", price:35000, image:"images/laptop3.jpg", shortDesc:"Преміум ноутбук з високою продуктивністю.", fullDescPage:"laptop3.html" }
];

const container = document.querySelector('.products-grid');

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
    container.appendChild(card);
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
