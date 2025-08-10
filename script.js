
// Image data file (imageData.js) should define `imageData = {key: 'data:image/...'};`
// Here we safely access it. If not present, handle gracefully.
const hasImageData = typeof imageData !== 'undefined';

// Menu data
const menuData = [
  {
    id: 'salads',
    icon: '🥗',
    name: { ru: 'Салаты', en: 'Salads', kz: 'Салаттар' },
    items: [
      {
        name: { ru: 'Тёплый салат с телятиной', en: 'Warm veal salad', kz: 'Тёплый салат с телятиной' },
        description: { ru: 'телятина, овощи', en: 'veal, vegetables', kz: 'телятина, овощи' },
        price: 5500,
        image: hasImageData && imageData.warm_veal ? imageData.warm_veal : '',
      },
      {
        name: { ru: 'Цезарь', en: 'Caesar salad', kz: 'Цезарь' },
        description: { ru: 'курица, салат романо, пармезан, соус цезарь', en: 'chicken, romaine, parmesan, caesar dressing', kz: 'тауық, ромэн салаты, пармезан, Цезарь соусы' },
        price: 4900,
        image: hasImageData && imageData.caesar ? imageData.caesar : '',
      },
      {
        name: { ru: 'Греческий салат', en: 'Greek salad', kz: 'Грек салаты' },
        description: { ru: 'овощи, фета, оливки', en: 'vegetables, feta, olives', kz: 'көкөністер, фета, зайтүн' },
        price: 4500,
        image: hasImageData && imageData.greek ? imageData.greek : '',
      },
      {
        name: { ru: 'Оливье', en: 'Olivier', kz: 'Оливье' },
        description: { ru: 'классический салат', en: 'classic salad', kz: 'классикалық салат' },
        price: 4200,
        image: hasImageData && imageData.olivier ? imageData.olivier : '',
      },
    ]
  },

  {
    id: 'hot-dishes',
    icon: '🍽️',
    name: { ru: 'Горячие блюда', en: 'Hot dishes', kz: 'Ыстық тағамдар' },
    items: [
      { name: { ru: 'Дорадо на гриле', en: 'Grilled dorado', kz: 'Дорадо-гриль' }, description: { ru: 'рыба на мангале', en: 'grilled fish', kz: 'гриль балық' }, price: 9500, image: hasImageData && imageData.dorado ? imageData.dorado : '' },
      { name: { ru: 'Бургер', en: 'Burger', kz: 'Бургер' }, description: { ru: 'котлета, сыр, соус', en: 'patty, cheese, sauce', kz: 'котлет, ірімшік, соус' }, price: 5900, image: hasImageData && imageData.burger ? imageData.burger : '' },
    ]
  },

  {
    id: 'soups',
    icon: '🥣',
    name: { ru: 'Супы', en: 'Soups', kz: 'Сорпалар' },
    items: [
      { name: { ru: 'Том ям', en: 'Tom Yum', kz: 'Том ям' }, description: { ru: 'острый тайский суп', en: 'spicy Thai soup', kz: 'ащы тай сорпасы' }, price: 4900, image: hasImageData && imageData.tom_yam ? imageData.tom_yam : '' },
      { name: { ru: 'Солянка', en: 'Solyanka', kz: 'Солянка' }, description: { ru: 'насыщенный суп', en: 'hearty soup', kz: 'қаныққан сорпа' }, price: 4500, image: hasImageData && imageData.solyanka ? imageData.solyanka : '' },
    ]
  },

  {
    id: 'pizza',
    icon: '🍕',
    name: { ru: 'Пицца', en: 'Pizza', kz: 'Пицца' },
    items: [
      { name: { ru: 'Пепперони', en: 'Pepperoni', kz: 'Пепперони' }, description: { ru: 'моцарелла, пепперони', en: 'mozzarella, pepperoni', kz: 'моццарелла, пепперони' }, price: 5900, image: hasImageData && imageData.pepperoni ? imageData.pepperoni : '' },
    ]
  },

  {
    id: 'beer',
    icon: '🍻',
    name: { ru: 'Пиво', en: 'Beer', kz: 'Сыра' },
    items: [
      { name: { ru: 'London Pride', en: 'London Pride', kz: 'London Pride' }, description: { ru: '', en: '', kz: '' }, price: 3800,
        story: {
          ru: 'Классический английский эль от Fuller’s: мягкая горчинка и карамельные ноты. Пейте при 8–10°C, хорошо сочетается с бургером и мясными закусками.',
          en: 'Classic English ale by Fuller’s with gentle bitterness and caramel notes. Best at 8–10°C; pairs with burgers and meat snacks.',
          kz: 'Fuller’s классикалық ағылшын элі: жұмсақ ащылық және карамель дәмі. 8–10°C-та ішкен дұрыс; бургер және ет тіскебасарлармен жарасады.'
        } },
      { name: { ru: 'Guinness Stout', en: 'Guinness Stout', kz: 'Guinness Stout' }, description: { ru: '', en: '', kz: '' }, price: 3800,
        story: {
          ru: 'Легендарный ирландский стаут с кремовой пеной и нотами кофе и какао. Подавайте при 7–9°C, отлично идёт с говядиной и копчёностями.',
          en: 'Legendary Irish stout with creamy head and notes of coffee and cocoa. Serve at 7–9°C; pairs well with beef and smoked dishes.',
          kz: 'Атақты ирланд стауты: кремді көбігі, кофе және какао дәмдері. 7–9°C-та ұсыныңыз; сиыр еті және қақталған тағамдармен үйлесімді.'
        } },
    ]
  },

  {
    id: 'wine',
    icon: '🍷',
    name: { ru: 'Вино', en: 'Wine', kz: 'Шарап' },
    items: [
      { name: { ru: 'Cabernet Sauvignon', en: 'Cabernet Sauvignon', kz: 'Cabernet Sauvignon' }, description: { ru: '', en: '', kz: '' }, price: 12000,
        story: {
          ru: 'Сорт с чёрной смородиной и пряностями. Температура подачи 16–18°C. Хорошо сочетать со стейками и твёрдыми сырами.',
          en: 'Notes of blackcurrant and spice. Serve at 16–18°C. Pairs with steaks and hard cheeses.',
          kz: 'Қарақат және дәмдеуіш ноталары. 16–18°C-та беріңіз. Стейк және қатты ірімшіктермен үйлеседі.'
        } },
      { name: { ru: 'Chardonnay', en: 'Chardonnay', kz: 'Chardonnay' }, description: { ru: '', en: '', kz: '' }, price: 11000,
        story: {
          ru: 'Яблоко, цитрус и лёгкий дуб. Подача 10–12°C. Идеально к рыбе и салатам.',
          en: 'Apple, citrus, light oak. Serve at 10–12°C. Great with fish and salads.',
          kz: 'Алма, цитрус және жеңіл емен. 10–12°C-та беріңіз. Балық және салаттармен жақсы үйлеседі.'
        } },
    ]
  },

  {
    id: 'vodka',
    icon: '🍸',
    name: { ru: 'Водка', en: 'Vodka', kz: 'Арақ' },
    items: [
      { name: { ru: 'Премиум водка', en: 'Premium Vodka', kz: 'Премиум арақ' }, description: { ru: '', en: '', kz: '' }, price: 3500,
        story: {
          ru: 'Классическая подача — охлаждённой до 4–6°C. Хорошо сочетается с солёными закусками и икрой.',
          en: 'Serve chilled to 4–6°C. Pairs with salty appetizers and caviar.',
          kz: '4–6°C-та салқындатып беріңіз. Тұзды тіскебасарлар және уылдырықпен үйлеседі.'
        } },
    ]
  },

  {
    id: 'cognac',
    icon: '🥃',
    name: { ru: 'Коньяк', en: 'Cognac', kz: 'Коньяк' },
    items: [
      { name: { ru: 'VSOP', en: 'VSOP', kz: 'VSOP' }, description: { ru: '', en: '', kz: '' }, price: 9000,
        story: {
          ru: 'Выдержка 4+ года: ваниль, сухофрукты, дуб. Пейте из снифтера при 18–20°C, хорош в паре с десертами и сигарами.',
          en: 'Aged 4+ years: vanilla, dried fruits, oak. Serve in a snifter at 18–20°C; pairs with desserts and cigars.',
          kz: '4+ жыл пісірілген: ваниль, кептірілген жемістер, емен. 18–20°C-та снифтерде ішіңіз; десерттер және сигарамен үйлеседі.'
        } },
    ]
  },
];

// State
let currentLang = 'ru';
let searchQuery = '';

// Utilities
function t(obj) {
  if (!obj) return '';
  return obj[currentLang] || obj.ru || obj.en || obj.kz || '';
}

// Render
function renderMenu() {
  const nav = document.getElementById('category-nav');
  const container = document.getElementById('menu-container');
  nav.innerHTML = '';
  container.innerHTML = '';

  menuData.forEach(category => {
    const langName = t(category.name);
    const icon = category.icon ? category.icon + ' ' : '';

    // Nav link
    const navLink = document.createElement('a');
    navLink.href = `#${category.id}`;
    navLink.textContent = icon + langName;
    nav.appendChild(navLink);

    // Section
    const section = document.createElement('section');
    section.className = 'section';
    section.id = category.id;
    const h2 = document.createElement('h2');
    h2.textContent = icon + langName;
    section.appendChild(h2);

    // Items
    const list = document.createElement('div');
    list.className = 'item-list';

    category.items
      .filter(item => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return t(item.name).toLowerCase().includes(q) || t(item.description).toLowerCase().includes(q);
      })
      .forEach(item => {
        const row = document.createElement('div');
        row.className = 'menu-item';

        if (item.image) {
          const imgEl = document.createElement('img');
          imgEl.className = 'item-image';
          imgEl.src = item.image;
          imgEl.alt = t(item.name);
          imgEl.addEventListener('click', (e) => {
            e.stopPropagation();
            openImageModal(item.image, t(item.name), t(item.story));
          });
          row.appendChild(imgEl);
        }

        const info = document.createElement('div');
        info.className = 'item-info';

        const title = document.createElement('h3');
        title.className = 'item-title';
        title.textContent = t(item.name);

        const meta = document.createElement('div');
        meta.style.display = 'flex'; meta.style.justifyContent = 'space-between'; meta.style.alignItems = 'center'; meta.style.gap = '8px';

        const price = document.createElement('div');
        price.className = 'item-price';
        price.textContent = `${item.price} ₸`;

        const actions = document.createElement('div');
        actions.className = 'item-actions';
        const btn = document.createElement('button');
        btn.className = 'add-to-cart';
        btn.textContent = currentLang === 'en' ? 'Add to cart' : (currentLang === 'kz' ? 'Себетке қосу' : 'В корзину');
        btn.dataset.name = t(item.name);
        btn.dataset.price = item.price;
        actions.appendChild(btn);

        meta.appendChild(price);
        meta.appendChild(actions);

        const desc = document.createElement('p');
        desc.className = 'item-desc';
        desc.textContent = t(item.description);

        info.appendChild(title);
        info.appendChild(desc);
        info.appendChild(meta);
        row.appendChild(info);

        // Open modal on row click if image or story exists
        row.addEventListener('click', (e) => {
          // Avoid duplicate when button is clicked
          if (e.target.closest('.add-to-cart')) return;
          if (item.image || item.story) openImageModal(item.image, t(item.name), t(item.story));
        });

        list.appendChild(row);
      });

    section.appendChild(list);
    container.appendChild(section);
  });

  // Attach cart buttons
  attachCartButtons();
}

// Modal
function openImageModal(src, alt, storyText) {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('image-modal-img');
  const modalDesc = document.getElementById('image-modal-description');
  if (src) {
    modalImg.style.display = 'block';
    modalImg.src = src;
    modalImg.alt = alt || '';
  } else {
    modalImg.style.display = 'none';
    modalImg.src = '';
    modalImg.alt = '';
  }
  if (storyText) {
    modalDesc.textContent = storyText;
    modalDesc.style.display = 'block';
  } else {
    modalDesc.textContent = '';
    modalDesc.style.display = 'none';
  }
  modal.classList.add('show');
}
function closeImageModal() {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('image-modal-img');
  const modalDesc = document.getElementById('image-modal-description');
  modal.classList.remove('show');
  modalImg.src = '';
  modalImg.alt = '';
  modalDesc.textContent = '';
}
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#language-switcher button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#language-switcher button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentLang = btn.dataset.lang;
      renderMenu();
    });
  });

  // Close modal interactions
  const modal = document.getElementById('image-modal');
  const closeIcon = document.querySelector('.image-modal-close');
  if (modal) {
    modal.addEventListener('click', (e) => { if (e.target.id === 'image-modal') closeImageModal(); });
  }
  if (closeIcon) closeIcon.addEventListener('click', closeImageModal);

  // Search
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderMenu();
    });
  }

  renderMenu();
  initCart();
});

// Cart
let cart = [];
function attachCartButtons() {
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name;
      const price = parseInt(btn.dataset.price, 10) || 0;
      addToCart(name, price);
    });
  });
}
function initCart() {
  const overlay = document.getElementById('cart-overlay');
  const toggle = document.getElementById('cart-toggle');
  const closeBtn = document.getElementById('close-cart');
  const clearBtn = document.getElementById('clear-cart');
  const placeBtn = document.getElementById('place-order');

  toggle.addEventListener('click', () => overlay.classList.add('show'));
  toggle.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') overlay.classList.add('show'); });
  closeBtn.addEventListener('click', () => overlay.classList.remove('show'));
  overlay.addEventListener('click', (e) => { if (e.target.id === 'cart-overlay') overlay.classList.remove('show'); });
  clearBtn.addEventListener('click', () => { cart = []; updateCartUI(); overlay.classList.remove('show'); });
  placeBtn.addEventListener('click', placeOrder);
  updateCartUI();
}
function addToCart(name, price) {
  const found = cart.find(i => i.name === name);
  if (found) found.quantity += 1;
  else cart.push({ name, price, quantity: 1 });
  updateCartUI();
}
function updateCartUI() {
  const list = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  const toggle = document.getElementById('cart-toggle');
  const countEl = document.getElementById('cart-count');

  list.innerHTML = '';
  let total = 0, count = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    count += item.quantity;
    const li = document.createElement('li');
    li.textContent = `${item.name} × ${item.quantity} — ${item.price * item.quantity} ₸`;
    list.appendChild(li);
  });
  if (cart.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'Корзина пуста.';
    list.appendChild(li);
  }
  totalEl.textContent = total;
  countEl.textContent = count;
  if (count > 0) toggle.classList.remove('hidden'); else toggle.classList.add('hidden');
}
function placeOrder() {
  if (cart.length === 0) return;
  const room = document.getElementById('steam-room').value;
  if (!room) { alert('Пожалуйста, выберите Steam Room.'); return; }
  const comment = document.getElementById('order-comment').value.trim();
  let msg = `Заказ из Pari Steam House:%0AПарная: ${room}%0AПозиции:%0A`;
  cart.forEach(i => { msg += `- ${i.name} × ${i.quantity} = ${i.price * i.quantity} ₸%0A`; });
  const total = document.getElementById('cart-total').textContent;
  msg += `Итого: ${total} ₸%0A`;
  if (comment) msg += `Комментарий: ${encodeURIComponent(comment)}%0A`;
  const url = `https://wa.me/77018000218?text=${msg}`;
  window.open(url, '_blank');
  // reset
  cart = [];
  updateCartUI();
  document.getElementById('cart-overlay').classList.remove('show');
  document.getElementById('steam-room').value = '';
  document.getElementById('order-comment').value = '';
}
