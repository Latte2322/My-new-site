const categories = [
    {
        name: "Ноутбуки",
        image: "images/laptop1.jpg",
        link: "products.html?cat=laptops",
        products: [
            {name: "Gaming Laptop", price: 25000, image: "images/laptop1.jpg"},
            {name: "Office Laptop", price: 15000, image: "images/laptop2.jpg"},
            {name: "Premium Laptop", price: 35000, image: "images/laptop3.jpg"}
        ]
    },
    {
        name: "Смартфони",
        image: "images/phone1.jpg",
        link: "products.html?cat=phones",
        products: [
            {name: "iPhone 14", price: 30000, image: "images/phone1.jpg"},
            {name: "Samsung Galaxy", price: 25000, image: "images/phone2.jpg"},
            {name: "Xiaomi Mi", price: 12000, image: "images/phone3.jpg"}
        ]
    },
    {
        name: "Аксесуари",
        image: "images/headphones.jpg",
        link: "products.html?cat=accessories",
        products: [
            {name: "Навушники", price: 2000, image: "images/headphones.jpg"},
            {name: "Мишка", price: 800, image: "images/mouse.jpg"},
            {name: "Клавіатура", price: 1500, image: "images/keyboard.jpg"}
        ]
    }
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
                <img src="${p.image}" alt="${p.name}" style="width:100px; height:100px; object-fit:cover;">
                <p>${p.name}</p>
                <p>${p.price} грн</p>
            </div>`).join('')}
        </div>
        <a href="${cat.link}"><button class="entry-btn">Переглянути</button></a>
    `;
    container.appendChild(card);
});
