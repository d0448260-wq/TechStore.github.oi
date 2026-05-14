const initialProducts = [
    { id: 1, name: "Ноутбук MacBookAir", price: 95000, img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500" },
    { id: 2, name: "Смартфон Iphone 15 Pro", price: 72000, img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500" },
    { id: 3, name: "Наушники Noise", price: 18000, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" }
];

const extraProducts = [
    { id: 4, name: "Игровая приставка", price: 45000, img: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=500" },
    { id: 5, name: "Смартфон Apple", price: 40000, img: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=500" }
];

let cart = [];

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
}

function changeQuantity(id, delta) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== id);
        }
    }
    updateCartUI();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const totalPriceElement = document.getElementById('total-price');
    
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let count = 0;

    cart.forEach(item => {
        count += item.quantity;
        total += item.price * item.quantity;

        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <div>
                <p style="font-weight:bold">${item.name}</p>
                <small>${item.price.toLocaleString()} ₽</small>
            </div>
            <div class="cart-controls">
                <button class="btn-small" onclick="changeQuantity(${item.id}, -1)">-</button>
                <span class="cart-quantity">${item.quantity}</span>
                <button class="btn-small" onclick="changeQuantity(${item.id}, 1)">+</button>
                <button class="btn-small btn-remove" onclick="removeFromCart(${item.id})">🗑</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemEl);
    });

    cartCount.innerText = count;
    totalPriceElement.innerText = total.toLocaleString();
}

function createCard(item) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.price.toLocaleString()} ₽</p>
        <button class="buy-btn cta-button" style="margin-top:10px;">В корзину</button>
    `;

    card.querySelector('.buy-btn').onclick = () => addToCart(item);
    return card;
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('product-container');
    const loadMoreBtn = document.getElementById('load-more');

    initialProducts.forEach(p => container.appendChild(createCard(p)));

    loadMoreBtn.onclick = () => {
        extraProducts.forEach(p => container.appendChild(createCard(p)));
        loadMoreBtn.style.display = 'none';
    };

    const cartModal = document.getElementById('cart-modal');
    document.getElementById('cart-btn').onclick = () => cartModal.style.display = 'block';
    document.querySelector('.close').onclick = () => cartModal.style.display = 'none';
    
    const themeBtn = document.getElementById('theme-toggle');
    if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark-theme');
    themeBtn.onclick = () => {
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    };

    document.querySelector('.logo').onclick = (e) => {
        e.preventDefault();
        window.location.reload();
    };
});