// Sticky Cart & Modals
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

function showOrderForm() {
    const cartModal = document.getElementById('cart-modal');
    const orderModal = document.getElementById('order-modal');
    const orderFormSection = document.querySelector('.form-section');

    if (!cartModal || !orderModal || !orderFormSection) return;

    const cartItems = document.querySelectorAll('.cart-item');
    if (cartItems.length === 0) {
        alert("Кошик порожній!");
        return;
    }

    // Створюємо список товарів для форми
    let productsList = "";
    let total = 0;
    cartItems.forEach(item => {
        productsList += `<p>${item.textContent}</p>`;
        const price = parseInt(item.textContent.split('-')[1]);
        total += price;
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

// Пошук по всіх сторінках
document.addEventListener('DOMContentLoaded', () => {
    const searchInputs = document.querySelectorAll('.search-input');
    searchInputs.forEach(input => {
        input.addEventListener('input', e => {
            const query = e.target.value.toLowerCase();
            console.log("Пошук:", query); 
            // Тут можна додати реальну фільтрацію карток
        });
    });

    // Обробка форми замовлення
    const orderForm = document.querySelector('.order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', e => {
            e.preventDefault();
            alert("Замовлення успішно оформлено! Ми зв'яжемося з вами.");
            cart = [];
            closeOrderForm();
            orderForm.reset();
            const cartItems = document.querySelector('.cart-items');
            const cartTotal = document.querySelector('.cart-total strong');
            if (cartItems) cartItems.innerHTML = "";
            if (cartTotal) cartTotal.textContent = "Загальна сума: 0 грн";
        });
    }
});
