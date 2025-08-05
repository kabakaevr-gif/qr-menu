/*
 * script.js
 *
 * This file contains the menu definition and the logic for rendering it into
 * the page.  The menu is defined for two sections (kitchen and bar), each
 * supporting three languages: Russian (ru), English (en) and Kazakh (kz).
 *
 * Changing the selected language or section updates the displayed content
 * without reloading the page.  If translations are not provided for a given
 * language, the Russian text is used as a fallback.
 */

// Menu data structured by section then language.  Each language holds
// an array of categories; each category has a name and a list of items.  An
// item contains a name, an optional description and a price.  Prices are
// stored as strings to preserve formatting.
const menu = {
  kitchen: {
    ru: [
      {
        name: 'Салаты',
        items: [
          { name: 'Теплый салат с телятиной', description: 'телятина, овощи', price: '5 500' },
          { name: 'Хрустящие баклажаны', description: 'баклажан, сыр фета, томаты, кедровые орешки', price: '4 900' },
          { name: 'Цезарь с цыпленком', description: 'хрустящий салат, курица, соус цезарь', price: '4 800' },
          { name: 'Греческий', description: 'томаты, огурцы, маслины, сыр', price: '4 200' }
        ]
      },
      {
        name: 'Горячие блюда',
        items: [
          { name: 'Стейк из семги', description: 'нежная семга на гриле с микс салатом', price: '7 200' },
          { name: 'Дорадо на гриле', description: 'запеченная дорадо с лимоном и микс салатом', price: '7 800' },
          { name: 'Котлета по‑домашнему с пюре', description: 'сочная котлета с картофельным пюре', price: '4 600' },
          { name: 'Бургер', description: 'классический бургер с говядиной/курицей и картофелем фри', price: '5 500' },
          { name: 'Куриный стейк', description: 'куриный стейк с картофелем', price: '5 800' },
          { name: 'Манты с говядиной', description: 'нежные манты с сочной говядиной и сметаной', price: '4 800' },
          { name: 'Стейк Рибай', description: 'мраморная говядина с картофельными дольками', price: '12 000' },
          { name: 'Куырдак', description: 'жаркое из мяса', price: '5 200' }
        ]
      },
      {
        name: 'Шашлыки',
        items: [
          { name: 'Баранина', price: '6 900' },
          { name: 'Антрекот из баранины', price: '7 200' },
          { name: 'Куриный', price: '5 500' },
          { name: 'Люля кебаб', price: '5 800' }
        ]
      },
      {
        name: 'Супы',
        items: [
          { name: 'Рамен', description: 'японский суп‑лапша с курицей/говядиной', price: '4 800' },
          { name: 'Том‑ям с морепродуктами', description: 'острый суп с креветками', price: '6 800' },
          { name: 'Суп лапша куриный', description: 'домашний куриный суп с лапшой', price: '3 500' },
          { name: 'Шорпа по‑казахски', description: 'бульон из баранины', price: '4 800' },
          { name: 'Солянка', description: 'мясной суп с оливками и лимоном', price: '3 600' },
          { name: 'Пельмени', description: 'пельмени в насыщенном говяжьем бульоне со сметаной', price: '3 600' }
        ]
      },
      {
        name: 'Пицца',
        items: [
          { name: 'Пицца Маргарита', description: 'классическая пицца с томатами и моцареллой', price: '3 500' },
          { name: 'Пицца Пеперони', description: 'колбаса, томатный соус, сыр', price: '4 800' },
          { name: 'Пицца с цыпленком', description: 'пицца с курицей и сыром', price: '4 900' }
        ]
      },
      {
        name: 'Горячие закуски',
        items: [
          { name: 'Кесадилья с курицей', description: 'хрустящая пшеничная тортилья с сочной куриной грудкой', price: '4 500' },
          { name: 'Чебуреки', price: '4 000' },
          { name: 'Крылышки BBQ', price: '4 800' },
          { name: 'Наггетсы', price: '3 500' },
          { name: 'Самса ассорти', description: 'говядина/индейка', price: '4 000' },
          { name: 'Брускетты', description: 'семга и свежие овощи / томаты и яйцо пашот', price: '4 200' },
          { name: 'Мозговые косточки', price: '3 000' }
        ]
      },
      {
        name: 'Холодные закуски',
        items: [
          { name: 'Овощная тарелка', price: '4 900' },
          { name: 'Тарелка солений', description: 'ассорти из хрустящих огурцов, свежие томаты, квашеная капуста', price: '4 900' }
        ]
      },
      {
        name: 'Закуски к пиву',
        items: [
          { name: 'Бараньи семечки', description: 'жареные кусочки баранины с солью', price: '4 300' },
          { name: 'Жареные карасики', description: 'хрустящая маринованная рыба', price: '4 000' },
          { name: 'Пивные креветки', price: '5 000' },
          { name: 'Пивной сет 1', description: 'жареный чечил, фисташки, чипсы, гренки, сырные палочки', price: '12 200' },
          { name: 'Пивной сет 2', description: 'луковые кольца, пивные креветки, крылья BBQ, бараньи семечки', price: '15 800' }
        ]
      },
      {
        name: 'Блюда на компанию',
        items: [
          { name: 'Ассорти шашлыков', description: 'баранина, курица, говядина, люля кебаб', price: '35 000' },
          { name: 'Мясной микс', description: 'ассорти из мяса гриль', price: '45 000' },
          { name: 'Плов Чайханский', description: 'узбекский плов с рассыпчатым рисом (по предзаказу)', price: '35 000' },
          { name: 'Куырдак на компанию', description: 'нежное мясо с картофелем и луком (по предзаказу)', price: '45 000' }
        ]
      },
      {
        name: 'Гарниры',
        items: [
          { name: 'Рис', price: '1 200' },
          { name: 'Фри', price: '1 200' },
          { name: 'Картофельные дольки', price: '1 500' }
        ]
      },
      {
        name: 'Десерты',
        items: [
          { name: 'Яблочный штрудель', description: 'теплый штрудель с корицей', price: '4 800' },
          { name: 'Бельгийские вафли', description: 'вафли с мороженым и сиропом', price: '4 200' }
        ]
      },
      {
        name: 'Дополнительно',
        items: [
          { name: 'Дополнительный соус на выбор', description: 'сыноч, кетчуп, тар‑тар, сацебели, горчица, шашлычный', price: '500' },
          { name: 'Хлебная корзина', price: '2 500' }
        ]
      }
    ],
    en: [
      {
        name: 'Salads',
        items: [
          { name: 'Warm salad with veal', description: 'veal, vegetables', price: '5 500' },
          { name: 'Crispy eggplant', description: 'eggplant, feta cheese, tomatoes, pine nuts', price: '4 900' },
          { name: 'Caesar with chicken', description: 'crisp salad, chicken, Caesar sauce', price: '4 800' },
          { name: 'Greek salad', description: 'tomatoes, cucumbers, olives, cheese', price: '4 200' }
        ]
      },
      {
        name: 'Hot dishes',
        items: [
          { name: 'Salmon steak', description: 'tender grilled salmon with mixed salad', price: '7 200' },
          { name: 'Grilled dorado', description: 'baked dorado with lemon and mixed salad', price: '7 800' },
          { name: 'Homestyle cutlet with puree', description: 'juicy cutlet with mashed potatoes', price: '4 600' },
          { name: 'Burger', description: 'classic burger with beef/chicken and fries', price: '5 500' },
          { name: 'Chicken steak', description: 'chicken steak with potatoes', price: '5 800' },
          { name: 'Manty with beef', description: 'tender manty with juicy beef and sour cream', price: '4 800' },
          { name: 'Ribeye steak', description: 'marbled beef with potato wedges', price: '12 000' },
          { name: 'Kuyrdak', description: 'braised meat', price: '5 200' }
        ]
      },
      {
        name: 'Shashlik',
        items: [
          { name: 'Lamb', price: '6 900' },
          { name: 'Lamb entrecote', price: '7 200' },
          { name: 'Chicken', price: '5 500' },
          { name: 'Lyulya kebab', price: '5 800' }
        ]
      },
      {
        name: 'Soups',
        items: [
          { name: 'Ramen', description: 'Japanese noodle soup with chicken/beef', price: '4 800' },
          { name: 'Tom yum with seafood', description: 'spicy soup with shrimp', price: '6 800' },
          { name: 'Chicken noodle soup', description: 'homemade chicken soup with noodles', price: '3 500' },
          { name: 'Kazakh shorpa', description: 'broth with lamb', price: '4 800' },
          { name: 'Solyanka', description: 'meat soup with olives and lemon', price: '3 600' },
          { name: 'Pelmeni', description: 'dumplings in rich beef broth with sour cream', price: '3 600' }
        ]
      },
      {
        name: 'Pizza',
        items: [
          { name: 'Margherita pizza', description: 'classic pizza with tomatoes and mozzarella', price: '3 500' },
          { name: 'Pepperoni pizza', description: 'sausage, tomato sauce, cheese', price: '4 800' },
          { name: 'Chicken pizza', description: 'pizza with chicken and cheese', price: '4 900' }
        ]
      },
      {
        name: 'Hot snacks',
        items: [
          { name: 'Chicken quesadilla', description: 'crispy wheat tortilla with juicy chicken breast', price: '4 500' },
          { name: 'Chebureki', price: '4 000' },
          { name: 'BBQ wings', price: '4 800' },
          { name: 'Nuggets', price: '3 500' },
          { name: 'Assorted samsa', description: 'beef/turkey', price: '4 000' },
          { name: 'Bruschettas', description: 'salmon and fresh vegetables / tomatoes and poached egg', price: '4 200' },
          { name: 'Marrow bones', price: '3 000' }
        ]
      },
      {
        name: 'Cold snacks',
        items: [
          { name: 'Vegetable plate', price: '4 900' },
          { name: 'Pickles plate', description: 'assortment of crispy cucumbers, fresh tomatoes, sauerkraut', price: '4 900' }
        ]
      },
      {
        name: 'Beer snacks',
        items: [
          { name: 'Fried lamb pieces', description: 'roasted lamb pieces with salt', price: '4 300' },
          { name: 'Fried crucian fish', description: 'crispy marinated fish', price: '4 000' },
          { name: 'Beer shrimp', price: '5 000' },
          { name: 'Beer set 1', description: 'fried chechil, pistachios, chips, croutons, cheese sticks', price: '12 200' },
          { name: 'Beer set 2', description: 'onion rings, beer shrimp, BBQ wings, lamb pieces', price: '15 800' }
        ]
      },
      {
        name: 'For company',
        items: [
          { name: 'Assorted shashliks', description: 'lamb, chicken, beef, lyulya kebab', price: '35 000' },
          { name: 'Meat mix', description: 'assorted grilled meat', price: '45 000' },
          { name: 'Chaykhansky pilaf', description: 'Uzbek pilaf with fluffy rice (pre‑order)', price: '35 000' },
          { name: 'Kuyrdak for company', description: 'tender meat with potatoes and onion (pre‑order)', price: '45 000' }
        ]
      },
      {
        name: 'Side dishes',
        items: [
          { name: 'Rice', price: '1 200' },
          { name: 'Fries', price: '1 200' },
          { name: 'Potato wedges', price: '1 500' }
        ]
      },
      {
        name: 'Desserts',
        items: [
          { name: 'Apple strudel', description: 'warm strudel with cinnamon', price: '4 800' },
          { name: 'Belgian waffles', description: 'waffles with ice cream and syrup', price: '4 200' }
        ]
      },
      {
        name: 'Extras',
        items: [
          { name: 'Additional sauce', description: 'chechil, ketchup, tartar, adjika, mustard, BBQ', price: '500' },
          { name: 'Bread basket', price: '2 500' }
        ]
      }
    ],
    // For Kazakh we currently mirror the Russian text; translations can be added later.
    kz: []
  },
  bar: {
    ru: [
      {
        name: 'Лимонады',
        items: [
          { name: 'Цитрус', price: '4 500' },
          { name: 'Киви‑лайм', price: '4 500' },
          { name: 'Манго‑Маракуя', price: '4 500' },
          { name: 'Арбуз‑Дыня', price: '4 500' },
          { name: 'Клубника‑Малина', price: '4 500' },
          { name: 'Морс', price: '3 000' }
        ]
      },
      {
        name: 'Авторские чаи',
        items: [
          { name: 'Ташкентский чай', description: 'ароматный черный/зеленый чай, специи, фрукты', price: '3 500' },
          { name: 'Марокканский чай', description: 'зеленый чай, мята', price: '3 500' },
          { name: 'Ягодный чай', description: 'ароматный чай с лесными ягодами и фруктами', price: '3 500' },
          { name: 'Облепиха‑Апельсин', description: 'согревающий чай с облепихой и апельсином', price: '3 500' }
        ]
      },
      {
        name: 'Листовые чаи',
        items: [
          { name: 'Молочный Улун', description: 'чай с мягким сливочным вкусом и карамельными нотами', price: '3 000' },
          { name: 'Английский завтрак', description: 'крепкий черный чай', price: '3 000' },
          { name: 'Зеленая сенча', description: 'японский чай с травяным вкусом', price: '3 000' }
        ]
      },
      {
        name: 'Напитки',
        items: [
          { name: 'Coca‑cola', price: '1 500' },
          { name: 'Sprite', price: '1 500' },
          { name: 'Fanta', price: '1 500' },
          { name: 'Rich', price: '1 500' },
          { name: 'Tassay', price: '1 500' },
          { name: 'Red Bull', price: '2 800' },
          { name: 'San Pellegrino газ.', price: '3 000' },
          { name: 'San Pellegrino лим.', price: '2 800' }
        ]
      },
      {
        name: 'Пиво',
        items: [
          { name: 'London Pride', price: '3 800' },
          { name: 'Guinness Stout', price: '3 800' },
          { name: 'Paulaner Weissbier 0.0 %', price: '3 900' },
          { name: 'Paulaner Weissbier', price: '3 900' },
          { name: 'Corona Extra', price: '3 500' }
        ]
      },
      {
        name: 'Виски',
        items: [
          { name: 'Jameson Original', price: '3 500' },
          { name: 'Monkey Shoulder', price: '5 500' },
          { name: 'Macallan 12', price: '7 500' },
          { name: "The Glenlivet Founder's Reserve", price: '4 500' },
          { name: 'Chivas Regal 12', price: '4 500' },
          { name: 'The Balvenie 12 Doublewood', price: '8 500' }
        ]
      },
      {
        name: 'Водка',
        items: [
          { name: 'Qazaq Eli Nomad', price: '1 500' },
          { name: 'Grey Goose', price: '2 900' },
          { name: 'Belvedere', price: '4 200' }
        ]
      },
      {
        name: 'Снэки',
        items: [
          { name: 'Чипсы', price: '1 200' },
          { name: 'Фисташка', price: '1 200' },
          { name: 'Чечил', price: '1 200' }
        ]
      },
      {
        name: 'Коньяк',
        items: [
          { name: 'Courvoisier VS', price: '4 000' },
          { name: 'Hennessy VS', price: '4 500' },
          { name: 'Hennessy VSOP', price: '7 500' }
        ]
      },
      {
        name: 'Вино',
        items: [
          { name: 'Santa Cristina Casasole', description: 'полусладкое белое 12 %', price: '25 000' },
          { name: 'Villa Antinori Bianco Toscana IG', description: 'сухое белое 12 %', price: '25 000' },
          { name: 'Villa Antinori Bianco Toscana IGT', description: 'сухое красное 12 %', price: '45 000' },
          { name: 'Ruggeri Prosecco', price: '45 000' },
          { name: 'Martini Brut', price: '25 000' },
          { name: 'Asti Martini Rose', price: '25 000' }
        ]
      },
      {
        name: 'Кальян',
        items: [
          { name: 'Кальян Light', price: '12 000' },
          { name: 'Кальян Medium', price: '15 000' },
          { name: 'Кальян Hard', price: '18 000' }
        ]
      }
    ],
    en: [
      {
        name: 'Lemonades',
        items: [
          { name: 'Citrus', price: '4 500' },
          { name: 'Kiwi‑lime', price: '4 500' },
          { name: 'Mango‑Passion fruit', price: '4 500' },
          { name: 'Watermelon‑Melon', price: '4 500' },
          { name: 'Strawberry‑Raspberry', price: '4 500' },
          { name: 'Mors (fruit drink)', price: '3 000' }
        ]
      },
      {
        name: "Author's teas",
        items: [
          { name: 'Tashkent tea', description: 'aromatic black/green tea, spices, fruits', price: '3 500' },
          { name: 'Moroccan tea', description: 'green tea, mint', price: '3 500' },
          { name: 'Berry tea', description: 'aromatic tea with forest berries and fruits', price: '3 500' },
          { name: 'Sea buckthorn‑Orange', description: 'warming tea with sea buckthorn and orange', price: '3 500' }
        ]
      },
      {
        name: 'Leaf teas',
        items: [
          { name: 'Milk oolong', description: 'tea with soft creamy taste and caramel notes', price: '3 000' },
          { name: 'English breakfast', description: 'strong black tea', price: '3 000' },
          { name: 'Green sencha', description: 'Japanese tea with herbal taste', price: '3 000' }
        ]
      },
      {
        name: 'Soft drinks',
        items: [
          { name: 'Coca‑cola', price: '1 500' },
          { name: 'Sprite', price: '1 500' },
          { name: 'Fanta', price: '1 500' },
          { name: 'Rich', price: '1 500' },
          { name: 'Tassay', price: '1 500' },
          { name: 'Red Bull', price: '2 800' },
          { name: 'San Pellegrino sparkling', price: '3 000' },
          { name: 'San Pellegrino lemon', price: '2 800' }
        ]
      },
      {
        name: 'Beer',
        items: [
          { name: 'London Pride', price: '3 800' },
          { name: 'Guinness Stout', price: '3 800' },
          { name: 'Paulaner Weissbier 0.0 %', price: '3 900' },
          { name: 'Paulaner Weissbier', price: '3 900' },
          { name: 'Corona Extra', price: '3 500' }
        ]
      },
      {
        name: 'Whiskey',
        items: [
          { name: 'Jameson Original', price: '3 500' },
          { name: 'Monkey Shoulder', price: '5 500' },
          { name: 'Macallan 12', price: '7 500' },
          { name: "The Glenlivet Founder's Reserve", price: '4 500' },
          { name: 'Chivas Regal 12', price: '4 500' },
          { name: 'The Balvenie 12 Doublewood', price: '8 500' }
        ]
      },
      {
        name: 'Vodka',
        items: [
          { name: 'Qazaq Eli Nomad', price: '1 500' },
          { name: 'Grey Goose', price: '2 900' },
          { name: 'Belvedere', price: '4 200' }
        ]
      },
      {
        name: 'Snacks',
        items: [
          { name: 'Chips', price: '1 200' },
          { name: 'Pistachio', price: '1 200' },
          { name: 'Chechil', price: '1 200' }
        ]
      },
      {
        name: 'Cognac',
        items: [
          { name: 'Courvoisier VS', price: '4 000' },
          { name: 'Hennessy VS', price: '4 500' },
          { name: 'Hennessy VSOP', price: '7 500' }
        ]
      },
      {
        name: 'Wine',
        items: [
          { name: 'Santa Cristina Casasole', description: 'semi‑sweet white 12 %', price: '25 000' },
          { name: 'Villa Antinori Bianco Toscana IG', description: 'dry white 12 %', price: '25 000' },
          { name: 'Villa Antinori Bianco Toscana IGT', description: 'dry red 12 %', price: '45 000' },
          { name: 'Ruggeri Prosecco', price: '45 000' },
          { name: 'Martini Brut', price: '25 000' },
          { name: 'Asti Martini Rose', price: '25 000' }
        ]
      },
      {
        name: 'Hookah',
        items: [
          { name: 'Hookah Light', price: '12 000' },
          { name: 'Hookah Medium', price: '15 000' },
          { name: 'Hookah Hard', price: '18 000' }
        ]
      }
    ],
    // Mirror Russian for Kazakh for now
    kz: []
  }
};

// Fallback: copy Russian data into Kazakh where translations are missing
['kitchen', 'bar'].forEach(section => {
  ['kz'].forEach(lang => {
    if (menu[section][lang].length === 0) {
      // Deep copy the Russian array
      menu[section][lang] = menu[section]['ru'].map(category => ({
        name: category.name,
        items: category.items.map(item => ({...item}))
      }));
    }
  });
});

// Default state
let currentSection = 'kitchen';
let currentLanguage = 'ru';

// Elements
const mainEl = document.getElementById('menu-content');
const languageButtons = document.querySelectorAll('.language-selector button');
const sectionButtons = document.querySelectorAll('.section-selector button');

function renderMenu() {
  // Clear previous content
  mainEl.innerHTML = '';
  const categories = menu[currentSection][currentLanguage];
  categories.forEach(category => {
    const catDiv = document.createElement('div');
    catDiv.classList.add('category');
    const h2 = document.createElement('h2');
    h2.textContent = category.name;
    catDiv.appendChild(h2);
    category.items.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('item');
      const textDiv = document.createElement('div');
      const nameEl = document.createElement('div');
      nameEl.classList.add('item-name');
      nameEl.textContent = item.name;
      textDiv.appendChild(nameEl);
      if (item.description) {
        const descEl = document.createElement('div');
        descEl.classList.add('item-description');
        descEl.textContent = item.description;
        textDiv.appendChild(descEl);
      }
      itemDiv.appendChild(textDiv);
      const priceEl = document.createElement('div');
      priceEl.classList.add('item-price');
      priceEl.textContent = item.price;
      itemDiv.appendChild(priceEl);
      catDiv.appendChild(itemDiv);
    });
    mainEl.appendChild(catDiv);
  });
}

// Event handlers
languageButtons.forEach(button => {
  button.addEventListener('click', () => {
    currentLanguage = button.dataset.lang;
    languageButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    renderMenu();
  });
});

sectionButtons.forEach(button => {
  button.addEventListener('click', () => {
    currentSection = button.dataset.section;
    sectionButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    renderMenu();
  });
});

// Initial render
renderMenu();