const products = [
    { 
        id: 1, 
        name: "Коврики в салон (4 шт)", 
        price: 350, 
        img: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=400" 
    },
    { 
        id: 2, 
        name: "Коврик в багажник", 
        price: 200, 
        img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400" 
    },
    { 
        id: 3, 
        name: "Комбо: Салон + Багажник", 
        price: 500, 
        img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400" 
    }
];

let cart = [];

function renderProducts() {
    const list = document.getElementById("products-list");
    if (!list) return;

    list.innerHTML = products.map(p => `
${p.name}${p.price} сомониВ корзину`).join("");
}function addToCart(id) {const item = products.find(p => p.id === id);cart.push(item);updateCart();}function updateCart() {document.getElementById("cart-count").innerText = cart.length;const itemsList = document.getElementById("cart-items");itemsList.innerHTML = cart.map(item => `• ${item.name} — ${item.price} сомони`).join("");const total = cart.reduce((sum, item) => sum + item.price, 0);
document.getElementById("cart-total").innerText = total;
}function toggleCart() {const modal = document.getElementById("cart-modal");modal.style.display = modal.style.display === "flex" ? "none" : "flex";}async function sendOrder() {const name = document.getElementById("user-name").value;const phone = document.getElementById("user-phone").value;const address = document.getElementById("user-address").value;if (!name || !phone || !address || cart.length === 0) {
    alert("Заполните все поля и добавьте хотя бы один товар!");
    return;
}

// Сюда вставьте ваши данные из Telegram
const BOT_TOKEN = "ВАШ_BOT_TOKEN";
const CHAT_ID = "ВАШ_CHAT_ID";

let message = `🚗 **ЗАКАЗ EVA KOVRIK**\n\n`;
message += `👤 **Имя:** ${name}\n`;
message += `📞 **Телефон:** ${phone}\n`;
message += `🚘 **Авто/Адрес:** ${address}\n\n`;
message += `📦 **Товары:**\n`;

cart.forEach((item, i) => {
    message += `\({i + 1}.\){item.name} — ${item.price} сомони\n`;
});

const total = cart.reduce((sum, item) => sum + item.price, 0);
message += `\n💰 **Итого:** ${total} сомони`;

const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

try {
    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text: message, parse_mode: "HTML" })
    });

    if (res.ok) {
        alert("Спасибо! Ваш заказ отправлен, мы скоро свяжемся с вами.");
        cart = [];
        updateCart();
        toggleCart();
    } else {
        alert("Ошибка при отправке заказа в Telegram.");
    }
} catch (e) {
    alert("Ошибка соединения.");
}
}renderProducts();
