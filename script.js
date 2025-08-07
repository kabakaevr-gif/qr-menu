/*
 * This script builds the menu interface dynamically based on the data
 * defined below. It supports switching between Russian (ru), English (en)
 * and Kazakh (kz). If a translation for a particular language is not
 * provided, the Russian text will be displayed by default.
 */

// Dataset for all menu categories and items. Each string is provided in
// Russian and English. For Kazakh we reuse the Russian text so that the
// client can update translations later.
const menuData = [
  {
    id: 'salads',
    name: { ru: 'Салаты', en: 'Salads', kz: 'Салаттар' },
    items: [
      {
        name: {
          ru: 'Тёплый салат с телятиной',
          en: 'Warm veal salad',
          kz: 'Тёплый салат с телятиной',
        },
        description: {
          ru: 'телятина, овощи',
          en: 'veal, vegetables',
          kz: 'телятина, овощи',
        },
        price: 5500,
        // Используем название и путь, соответствующие файлам в репозитории (папка «изображения»)
        // Use embedded base64 image for warm veal salad
        image: imageData.warm_veal,
      },
      {
        name: {
          ru: 'Хрустящие баклажаны',
          en: 'Crispy eggplants',
          kz: 'Хрустящие баклажаны',
        },
        description: {
          ru: 'баклажан, сыр фета, томаты, кедровые орешки',
          en: 'eggplant, feta cheese, tomatoes, pine nuts',
          kz: 'баклажан, сыр фета, томаты, кедровые орешки',
        },
        price: 4900,
      },
      {
        name: {
          ru: 'Цезарь с цыплёнком',
          en: 'Caesar with chicken',
          kz: 'Цезарь с цыплёнком',
        },
        description: {
          ru: 'хрустящий салат, курица, соус цезарь',
          en: 'crispy salad, chicken, Caesar dressing',
          kz: 'хрустящий салат, курица, соус цезарь',
        },
        price: 4800,
        // Embedded base64 image for Caesar salad
        image: imageData.caesar,
      },
      {
        name: {
          ru: 'Греческий',
          en: 'Greek',
          kz: 'Греческий',
        },
        description: {
          ru: 'томаты, огурцы, маслины, сыр',
          en: 'tomatoes, cucumbers, olives, cheese',
          kz: 'томаты, огурцы, маслины, сыр',
        },
        price: 4200,
        // Embedded base64 image for Greek salad
        image: imageData.greek,
      },
      // Added Olivier salad
      {
        name: {
          ru: 'Оливье',
          en: 'Olivier',
          kz: 'Оливье',
        },
        description: {
          ru: 'картофель, морковь, огурцы, колбаса, яйца, зелёный горошек',
          en: 'potatoes, carrots, cucumbers, sausage, eggs, green peas',
          kz: 'картоп, сәбіз, қияр, шұжық, жұмыртқа, жасыл бұршақ',
        },
        price: 4500,
        // Embedded base64 image for Olivier salad
        image: imageData.olivier,
      },
    ],
  },
  {
    id: 'hot-dishes',
    name: { ru: 'Горячие блюда', en: 'Hot dishes', kz: 'Ыстық тағамдар' },
    items: [
      {
        name: { ru: 'Стейк из семги', en: 'Salmon steak', kz: 'Стейк из семги' },
        description: {
          ru: 'нежная семга на гриле с микс салатом',
          en: 'tender grilled salmon with mixed salad',
          kz: 'нежная семга на гриле с микс салатом',
        },
        price: 7200,
      },
      {
        name: { ru: 'Дорадо на гриле', en: 'Grilled dorado', kz: 'Дорадо на гриле' },
        description: {
          ru: 'запечённая дорадо с лимоном и микс салатом',
          en: 'baked dorado with lemon and mixed salad',
          kz: 'запечённая дорадо с лимоном и микс салатом',
        },
        price: 7800,
        // Embedded base64 image for Grilled dorado
        image: imageData.dorado,
      },
      {
        name: {
          ru: 'Котлета по‑домашнему с пюре',
          en: 'Homemade cutlet with puree',
          kz: 'Котлета по‑домашнему с пюре',
        },
        description: {
          ru: 'сочная котлета с картофельным пюре',
          en: 'juicy cutlet with mashed potatoes',
          kz: 'сочная котлета с картофельным пюре',
        },
        price: 4600,
      },
      {
        name: { ru: 'Бургер', en: 'Burger', kz: 'Бургер' },
        description: {
          ru: 'классический бургер с говядиной/курицей и картофелем фри',
          en: 'classic burger with beef/chicken and fries',
          kz: 'классический бургер с говядиной/курицей и картофелем фри',
        },
        price: 5500,
        // Embedded base64 image for Burger
        image: imageData.burger,
      },
      {
        name: { ru: 'Куриный стейк', en: 'Chicken steak', kz: 'Куриный стейк' },
        description: {
          ru: 'картофель с говядиной',
          en: 'potatoes with beef',
          kz: 'картофель с говядиной',
        },
        price: 5800,
      },
      {
        name: { ru: 'Манты с говядиной', en: 'Manty with beef', kz: 'Манты с говядиной' },
        description: {
          ru: 'нежные манты с сочной говядиной и со сметаной',
          en: 'tender dumplings with juicy beef and sour cream',
          kz: 'нежные манты с сочной говядиной и со сметаной',
        },
        price: 4800,
      },
      {
        name: { ru: 'Стейк Рибай', en: 'Ribeye steak', kz: 'Стейк Рибай' },
        description: {
          ru: 'мраморная говядина с картофельными дольками',
          en: 'marbled beef with potato wedges',
          kz: 'мраморная говядина с картофельными дольками',
        },
        price: 12000,
      },
      {
        name: { ru: 'Куырдак', en: 'Kuyrdak', kz: 'Қуырдақ' },
        description: {
          ru: 'жаркое из мяса',
          en: 'meat stew',
          kz: 'жаркое из мяса',
        },
        price: 5200,
      },
    ],
  },
  {
    id: 'shashlyk',
    name: { ru: 'Шашлыки', en: 'Shashlik', kz: 'Шашлық' },
    items: [
      { name: { ru: 'Баранина', en: 'Lamb', kz: 'Қой еті' }, description: { ru: '', en: '', kz: '' }, price: 6900 },
      { name: { ru: 'Антрекот из баранины', en: 'Lamb entrecote', kz: 'Қойдың антрекоты' }, description: { ru: '', en: '', kz: '' }, price: 7200 },
      { name: { ru: 'Куриный', en: 'Chicken', kz: 'Тауық' }, description: { ru: '', en: '', kz: '' }, price: 5500 },
      { name: { ru: 'Люля кебаб', en: 'Lyulya kebab', kz: 'Люля кебаб' }, description: { ru: '', en: '', kz: '' }, price: 5800 },
    ],
  },
  {
    id: 'sauces',
    name: { ru: 'Дополнительно', en: 'Extras', kz: 'Қосымша' },
    items: [
      {
        name: {
          ru: 'Дополнительный соус на выбор',
          en: 'Extra sauce of your choice',
          kz: 'Қосымша тұздық',
        },
        description: {
          ru: 'сырный, кетчуп, тар-тар, сацебели, горчичный, шашлычный',
          en: 'cheese, ketchup, tartar, satsabeli, mustard, shashlik sauces',
          kz: 'сырный, кетчуп, тар-тар, сацебели, горчичный, шашлычный',
        },
        price: 500,
      },
      {
        name: { ru: 'Хлебная корзина', en: 'Bread basket', kz: 'Нан себеті' },
        description: { ru: '', en: '', kz: '' },
        price: 2500,
      },
    ],
  },
  {
    id: 'soups',
    name: { ru: 'Супы', en: 'Soups', kz: 'Сорпалар' },
    items: [
      {
        name: { ru: 'Рамен', en: 'Ramen', kz: 'Рамен' },
        description: {
          ru: 'японский суп‑лапша с курицей/говядиной',
          en: 'Japanese noodle soup with chicken/beef',
          kz: 'жапон кеспе сорпасы, тауық/сиыр еті',
        },
        price: 4800,
      },
      {
        name: { ru: 'Том-ям с морепродуктами', en: 'Tom Yum with seafood', kz: 'Том-ям теңіз тағамдарымен' },
        description: {
          ru: 'острый суп с креветками',
          en: 'spicy soup with prawns',
          kz: 'аскүй креветкалары бар ащы сорпа',
        },
        price: 6800,
        // Embedded base64 image for Tom yum soup
        image: imageData.tom_yam,
      },
      {
        name: { ru: 'Суп лапша куриный', en: 'Chicken noodle soup', kz: 'Тауық кеспе сорпасы' },
        description: {
          ru: 'домашний куриный суп с лапшой',
          en: 'homestyle chicken soup with noodles',
          kz: 'үй тауық сорпасы кеспемен',
        },
        price: 3500,
      },
      {
        name: { ru: 'Шорпа по‑казахски', en: 'Kazakh shorpa', kz: 'Қазақша шорпа' },
        description: {
          ru: 'бульон из баранины',
          en: 'mutton broth',
          kz: 'қой етінің сорпасы',
        },
        price: 4800,
      },
      {
        name: { ru: 'Солянка', en: 'Solyanka', kz: 'Солянка' },
        description: {
          ru: 'мясной суп с оливками и лимоном',
          en: 'meat soup with olives and lemon',
          kz: 'ет сорпасы, зәйтүн және лимонмен',
        },
        price: 3600,
        // Embedded base64 image for Solyanka soup
        image: imageData.solyanka,
      },
      {
        name: { ru: 'Пельмени', en: 'Pelmeni', kz: 'Пельмени' },
        description: {
          ru: 'пельмени в насыщенном говяжьем бульоне со сметаной',
          en: 'dumplings in rich beef broth with sour cream',
          kz: 'қанық сиыр сорпасында пельмени, қаймақпен',
        },
        price: 3600,
      },
    ],
  },
  {
    id: 'pizza',
    name: { ru: 'Пицца', en: 'Pizza', kz: 'Пицца' },
    items: [
      {
        name: { ru: 'Пицца Маргарита', en: 'Pizza Margherita', kz: 'Пицца Маргарита' },
        description: {
          ru: 'классическая пицца с томатами и моцареллой',
          en: 'classic pizza with tomatoes and mozzarella',
          kz: 'томат пен моцарелла қосылған классикалық пицца',
        },
        price: 3500,
      },
      {
        name: { ru: 'Пицца Пеперони', en: 'Pizza Pepperoni', kz: 'Пицца Пеперони' },
        description: {
          ru: 'колбаса, томатный соус, сыр',
          en: 'sausage, tomato sauce, cheese',
          kz: 'шұжық, томат тұздығы, сыр',
        },
        price: 4800,
        // Embedded base64 image for Pepperoni pizza
        image: imageData.pepperoni,
      },
      {
        name: { ru: 'Пицца с цыплёнком', en: 'Pizza with chicken', kz: 'Тауық еті қосылған пицца' },
        description: {
          ru: 'пицца с курицей и сыром',
          en: 'pizza with chicken and cheese',
          kz: 'тауық пен сыр қосылған пицца',
        },
        price: 4900,
      },
    ],
  },
  {
    id: 'hot-appetizers',
    name: { ru: 'Горячие закуски', en: 'Hot appetizers', kz: 'Ыстық тіскебасарлар' },
    items: [
      {
        name: { ru: 'Кесадилья с курицей', en: 'Chicken quesadilla', kz: 'Тауық қосылған кесадилья' },
        description: {
          ru: 'хрустящая пшеничная тортилья с сочной куриной грудкой',
          en: 'crisp wheat tortilla with juicy chicken breast',
          kz: 'шытырлақ бидай тортильясы және шырынды тауық еті',
        },
        price: 4500,
      },
      {
        name: { ru: 'Чебуреки', en: 'Chebureki', kz: 'Чебуреки' },
        description: { ru: '', en: '', kz: '' },
        price: 4000,
      },
      {
        name: { ru: 'Крылышки BBQ', en: 'BBQ wings', kz: 'BBQ қанаттары' },
        description: { ru: '', en: '', kz: '' },
        price: 4800,
      },
      {
        name: { ru: 'Нагетсы', en: 'Nuggets', kz: 'Нагетстер' },
        description: { ru: '', en: '', kz: '' },
        price: 3500,
      },
      {
        name: { ru: 'Самса ассорти', en: 'Samsa assortment', kz: 'Самса ассорти' },
        description: {
          ru: 'говядина/индейка',
          en: 'beef/turkey',
          kz: 'сиыр еті/үрей еті',
        },
        price: 4000,
      },
      {
        name: { ru: 'Брускетты', en: 'Bruschetta', kz: 'Брускетти' },
        description: {
          ru: 'семга и свежие овощи/томаты и яйцо пашот',
          en: 'salmon and fresh vegetables/tomatoes and poached egg',
          kz: 'албырт және жаңа көкөністер/томат және пашот жұмыртқасы',
        },
        price: 4200,
      },
      {
        name: { ru: 'Мозговые косточки', en: 'Marrow bones', kz: 'Ми сүйектері' },
        description: { ru: '', en: '', kz: '' },
        price: 3000,
      },
    ],
  },
  {
    id: 'cold-appetizers',
    name: { ru: 'Холодные закуски', en: 'Cold appetizers', kz: 'Суық тіскебасарлар' },
    items: [
      {
        name: { ru: 'Овощная тарелка', en: 'Vegetable platter', kz: 'Көкөніс табақшасы' },
        description: { ru: '', en: '', kz: '' },
        price: 4900,
      },
      {
        name: { ru: 'Тарелка солений', en: 'Pickles platter', kz: 'Маринадталған көкөністер' },
        description: {
          ru: 'ассорти из хрустящих огурцов, свеклы томлёной, квашеной капусты',
          en: 'assortment of crunchy cucumbers, stewed beet, and sauerkraut',
          kz: 'қытырлақ қияр, бұқтырылған қызылша, қырыққабат ассорти',
        },
        price: 4900,
      },
    ],
  },
  {
    id: 'beer-snacks',
    name: { ru: 'Закуски к пиву', en: 'Beer snacks', kz: 'Сыраға арналған тіскебасарлар' },
    items: [
      {
        name: { ru: 'Бараньи семечки', en: 'Lamb seeds', kz: 'Қой тұқымдары' },
        description: {
          ru: 'жареные кусочки баранины с солью',
          en: 'fried pieces of lamb with salt',
          kz: 'тұзбен қуырылған қой еті',
        },
        price: 4300,
      },
      {
        name: { ru: 'Жареные карасики', en: 'Fried crucians', kz: 'Қуыырылған қарасу балықтары' },
        description: {
          ru: 'хрустящая маринованная рыба',
          en: 'crispy marinated fish',
          kz: 'дәмді маринадталған балық',
        },
        price: 4000,
      },
      {
        name: { ru: 'Пивные креветки', en: 'Beer shrimp', kz: 'Сыралы асшаяндар' },
        description: { ru: '', en: '', kz: '' },
        price: 5000,
      },
      {
        name: { ru: 'Пивной сет 1', en: 'Beer set 1', kz: 'Сыралық жинақ 1' },
        description: {
          ru: 'жареный чечил, фисташки, чипсы, гренки, сырные палочки',
          en: 'fried chechil, pistachios, chips, croutons, cheese sticks',
          kz: 'қуыырылған чечил, фисташка, чипсы, крекер, сыр таяқшалары',
        },
        price: 12200,
      },
      {
        name: { ru: 'Пивной сет 2', en: 'Beer set 2', kz: 'Сыралық жинақ 2' },
        description: {
          ru: 'луковые кольца, пивные креветки, крылья BBQ, бараньи семечки',
          en: 'onion rings, beer shrimp, BBQ wings, lamb seeds',
          kz: 'пияз сақиналары, сыралы асшаяндар, BBQ қанаттары, қой тұқымдары',
        },
        price: 15800,
      },
    ],
  },
  {
    id: 'company-dishes',
    name: { ru: 'Блюда на компанию', en: 'Dishes for company', kz: 'Компанияға арналған тағамдар' },
    items: [
      {
        name: { ru: 'Ассорти шашлыков', en: 'Assorted shashlik', kz: 'Шашлық ассорти' },
        description: {
          ru: 'баранина, курица, говядина, люля кебаб',
          en: 'lamb, chicken, beef, lyulya kebab',
          kz: 'қой еті, тауық, сиыр еті, люля кебаб',
        },
        price: 35000,
      },
      {
        name: { ru: 'Мясной микс', en: 'Meat mix', kz: 'Ет миксі' },
        description: {
          ru: 'ассорти из мяса гриль',
          en: 'assorted grilled meats',
          kz: 'гриль ет ассорти',
        },
        price: 45000,
      },
      {
        name: { ru: 'Плов Чайханский', en: 'Chaykhana pilaf', kz: 'Чайхана палауы' },
        description: {
          ru: 'узбекский плов с рассыпчатым рисом (по предзаказу)',
          en: 'Uzbek pilaf with fluffy rice (pre-order)',
          kz: 'өзбек палауы, ұнтақталған күрішпен (алдын-ала тапсырыс)',
        },
        price: 35000,
      },
      {
        name: { ru: 'Куырдак (на компанию)', en: 'Kuyrdak (for company)', kz: 'Қуырдақ (компанияға)' },
        description: {
          ru: 'нежное мясо с картофелем и луком (по предзаказу)',
          en: 'tender meat with potatoes and onions (pre-order)',
          kz: 'картоп пен пияз қосылған жұмсақ ет (алдын-ала тапсырыс)',
        },
        price: 45000,
      },
    ],
  },
  {
    id: 'side-dishes',
    name: { ru: 'Гарниры', en: 'Side dishes', kz: 'Гарнирлер' },
    items: [
      { name: { ru: 'Рис', en: 'Rice', kz: 'Күріш' }, description: { ru: '', en: '', kz: '' }, price: 1200 },
      { name: { ru: 'Фри', en: 'Fries', kz: 'Фри' }, description: { ru: '', en: '', kz: '' }, price: 1200 },
      { name: { ru: 'Картофельные дольки', en: 'Potato wedges', kz: 'Картоп тілімдері' }, description: { ru: '', en: '', kz: '' }, price: 1500 },
    ],
  },
  {
    id: 'desserts',
    name: { ru: 'Десерты', en: 'Desserts', kz: 'Десерттер' },
    items: [
      {
        name: { ru: 'Яблочный штрудель', en: 'Apple strudel', kz: 'Алма штруделі' },
        description: {
          ru: 'тёплый штрудель с корицей',
          en: 'warm strudel with cinnamon',
          kz: 'даршын қосылған жылы штрудель',
        },
        price: 4800,
      },
      {
        name: { ru: 'Бельгийские вафли', en: 'Belgian waffles', kz: 'Бельгиялық вафли' },
        description: {
          ru: 'вафли с мороженым и сиропом',
          en: 'waffles with ice cream and syrup',
          kz: 'балмұздақ және шәрбатпен вафли',
        },
        price: 4200,
        // Embedded base64 image for Belgian waffles
        image: imageData.waffles,
      },
    ],
  },
  {
    id: 'lemonades',
    name: { ru: 'Лимонады', en: 'Lemonades', kz: 'Лимонадтар' },
    items: [
      { name: { ru: 'Цитрус', en: 'Citrus', kz: 'Цитрус' }, description: { ru: '', en: '', kz: '' }, price: 4500 },
      { name: { ru: 'Киви‑лайм', en: 'Kiwi‑lime', kz: 'Киви‑лайм' }, description: { ru: '', en: '', kz: '' }, price: 4500 },
      { name: { ru: 'Манго‑Маракуя', en: 'Mango‑Passionfruit', kz: 'Манго‑Маракуя' }, description: { ru: '', en: '', kz: '' }, price: 4500 },
      { name: { ru: 'Арбуз‑Дыня', en: 'Watermelon‑Melon', kz: 'Қарбыз‑Қауын' }, description: { ru: '', en: '', kz: '' }, price: 4500 },
      { name: { ru: 'Клубника‑Малина', en: 'Strawberry‑Raspberry', kz: 'Құлпынай‑Тағола' }, description: { ru: '', en: '', kz: '' }, price: 4500 },
      { name: { ru: 'Морс', en: 'Berry drink', kz: 'Морс' }, description: { ru: '', en: '', kz: '' }, price: 3000 },
    ],
  },
  {
    id: 'signature-tea',
    name: { ru: 'Авторские чаи', en: 'Signature teas', kz: 'Авторлық шайлар' },
    items: [
      {
        name: { ru: 'Ташкентский чай', en: 'Tashkent tea', kz: 'Ташкент шайы' },
        description: {
          ru: 'ароматный чёрный/зелёный чай, специи, фрукты',
          en: 'aromatic black/green tea with spices and fruits',
          kz: 'хош иісті қара/жасыл шай, дәмдеуіштер, жемістер',
        },
        price: 3500,
      },
      {
        name: { ru: 'Марокканский чай', en: 'Moroccan tea', kz: 'Марокко шайы' },
        description: {
          ru: 'зелёный чай, мята',
          en: 'green tea, mint',
          kz: 'жасыл шай, жалбыз',
        },
        price: 3500,
      },
      {
        name: { ru: 'Ягодный чай', en: 'Berry tea', kz: 'Жидек шайы' },
        description: {
          ru: 'ароматный чай с лесными ягодами и фруктами',
          en: 'aromatic tea with forest berries and fruits',
          kz: 'орман жидектері мен жемістер қосылған хош иісті шай',
        },
        price: 3500,
      },
      {
        name: { ru: 'Облепиха‑Апельсин', en: 'Sea buckthorn‑Orange', kz: 'Қызыл мүкжидек‑Апельсин' },
        description: {
          ru: 'согревающий чай с облепихой и апельсином',
          en: 'warming tea with sea buckthorn and orange',
          kz: 'шиповник пен апельсин қосылған жылы шай',
        },
        price: 3500,
      },
    ],
  },
  {
    id: 'loose-tea',
    name: { ru: 'Листовые чаи', en: 'Loose teas', kz: 'Жапырақты шайлар' },
    items: [
      {
        name: { ru: 'Молочный Улун', en: 'Milk Oolong', kz: 'Сүтті улун' },
        description: {
          ru: 'чай с мягким сливочным вкусом и карамельными нотами',
          en: 'tea with soft creamy taste and caramel notes',
          kz: 'жұмсақ кілегей дәмі және карамель ноталары бар шай',
        },
        price: 3000,
      },
      {
        name: { ru: 'Английский завтрак', en: 'English breakfast', kz: 'Ағылшын таңғы шайы' },
        description: {
          ru: 'крепкий чёрный чай',
          en: 'strong black tea',
          kz: 'қою қара шай',
        },
        price: 3000,
      },
      {
        name: { ru: 'Зелёная сенча', en: 'Green Sencha', kz: 'Жасыл сенча' },
        description: {
          ru: 'японский чай с травяным вкусом',
          en: 'Japanese tea with herbal flavour',
          kz: 'шөпті дәмі бар жапон шайы',
        },
        price: 3000,
      },
    ],
  },
  {
    id: 'soft-drinks',
    name: { ru: 'Напитки', en: 'Soft drinks', kz: 'Сусындар' },
    items: [
      { name: { ru: 'Coca‑cola', en: 'Coca‑cola', kz: 'Coca‑cola' }, description: { ru: '', en: '', kz: '' }, price: 1500 },
      { name: { ru: 'Sprite', en: 'Sprite', kz: 'Sprite' }, description: { ru: '', en: '', kz: '' }, price: 1500 },
      { name: { ru: 'Fanta', en: 'Fanta', kz: 'Fanta' }, description: { ru: '', en: '', kz: '' }, price: 1500 },
      { name: { ru: 'Rich', en: 'Rich', kz: 'Rich' }, description: { ru: '', en: '', kz: '' }, price: 1500 },
      { name: { ru: 'Tassay', en: 'Tassay', kz: 'Tassay' }, description: { ru: '', en: '', kz: '' }, price: 1500 },
      { name: { ru: 'Red Bull', en: 'Red Bull', kz: 'Red Bull' }, description: { ru: '', en: '', kz: '' }, price: 2800 },
      { name: { ru: 'San Pellegrino газ.', en: 'San Pellegrino (sparkling)', kz: 'San Pellegrino (газ.)' }, description: { ru: '', en: '', kz: '' }, price: 3000 },
      { name: { ru: 'San Pellegrino лим.', en: 'San Pellegrino (lemon)', kz: 'San Pellegrino (лимон)' }, description: { ru: '', en: '', kz: '' }, price: 2800 },
    ],
  },
  {
    id: 'beer',
    name: { ru: 'Пиво', en: 'Beer', kz: 'Сыра' },
    items: [
      { name: { ru: 'London Pride', en: 'London Pride', kz: 'London Pride' }, description: { ru: '', en: '', kz: '' }, price: 3800 },
      { name: { ru: 'Guinness Stout', en: 'Guinness Stout', kz: 'Guinness Stout' }, description: { ru: '', en: '', kz: '' }, price: 3800 },
      { name: { ru: 'Paulaner Weissbier 0.0 %', en: 'Paulaner Weissbier 0.0 %', kz: 'Paulaner Weissbier 0.0 %' }, description: { ru: '', en: '', kz: '' }, price: 3900 },
      { name: { ru: 'Paulaner Weissbier', en: 'Paulaner Weissbier', kz: 'Paulaner Weissbier' }, description: { ru: '', en: '', kz: '' }, price: 3900 },
      { name: { ru: 'Corona Extra', en: 'Corona Extra', kz: 'Corona Extra' }, description: { ru: '', en: '', kz: '' }, price: 3500 },
    ],
  },
  {
    id: 'whiskey',
    name: { ru: 'Виски', en: 'Whisky', kz: 'Виски' },
    items: [
      { name: { ru: 'Jameson Original', en: 'Jameson Original', kz: 'Jameson Original' }, description: { ru: '', en: '', kz: '' }, price: 3500 },
      { name: { ru: 'Monkey Shoulder', en: 'Monkey Shoulder', kz: 'Monkey Shoulder' }, description: { ru: '', en: '', kz: '' }, price: 5500 },
      { name: { ru: 'Macallan 12', en: 'Macallan 12', kz: 'Macallan 12' }, description: { ru: '', en: '', kz: '' }, price: 7500 },
      { name: { ru: "The Glenlivet Founder's Reserve", en: "The Glenlivet Founder's Reserve", kz: "The Glenlivet Founder's Reserve" }, description: { ru: '', en: '', kz: '' }, price: 4500 },
      { name: { ru: 'Chivas Regal 12', en: 'Chivas Regal 12', kz: 'Chivas Regal 12' }, description: { ru: '', en: '', kz: '' }, price: 4500 },
      { name: { ru: 'The Balvenie 12 Doublewood', en: 'The Balvenie 12 Doublewood', kz: 'The Balvenie 12 Doublewood' }, description: { ru: '', en: '', kz: '' }, price: 8500 },
    ],
  },
  {
    id: 'vodka',
    name: { ru: 'Водка', en: 'Vodka', kz: 'Арақ' },
    items: [
      { name: { ru: 'Qazaq Eli Nomad', en: 'Qazaq Eli Nomad', kz: 'Qazaq Eli Nomad' }, description: { ru: '', en: '', kz: '' }, price: 1500 },
      { name: { ru: 'Grey Goose', en: 'Grey Goose', kz: 'Grey Goose' }, description: { ru: '', en: '', kz: '' }, price: 2900 },
      { name: { ru: 'Belvedere', en: 'Belvedere', kz: 'Belvedere' }, description: { ru: '', en: '', kz: '' }, price: 4200 },
    ],
  },
  {
    id: 'snacks',
    name: { ru: 'Снеки', en: 'Snacks', kz: 'Тіскебасарлар' },
    items: [
      { name: { ru: 'Чипсы', en: 'Chips', kz: 'Чипсы' }, description: { ru: '', en: '', kz: '' }, price: 1200 },
      { name: { ru: 'Фисташка', en: 'Pistachio', kz: 'Фисташка' }, description: { ru: '', en: '', kz: '' }, price: 1200 },
      { name: { ru: 'Чечил', en: 'Chechil', kz: 'Чечил' }, description: { ru: '', en: '', kz: '' }, price: 1200 },
    ],
  },
  {
    id: 'cognac',
    name: { ru: 'Коньяк', en: 'Cognac', kz: 'Коньяк' },
    items: [
      { name: { ru: 'Courvoisier VS', en: 'Courvoisier VS', kz: 'Courvoisier VS' }, description: { ru: '', en: '', kz: '' }, price: 4000 },
      { name: { ru: 'Hennessy VS', en: 'Hennessy VS', kz: 'Hennessy VS' }, description: { ru: '', en: '', kz: '' }, price: 4500 },
      { name: { ru: 'Hennessy VSOP', en: 'Hennessy VSOP', kz: 'Hennessy VSOP' }, description: { ru: '', en: '', kz: '' }, price: 7500 },
    ],
  },
  {
    id: 'wine',
    name: { ru: 'Вино', en: 'Wine', kz: 'Шарап' },
    items: [
      {
        name: { ru: 'Santa Cristina Casasole', en: 'Santa Cristina Casasole', kz: 'Santa Cristina Casasole' },
        description: {
          ru: 'полусладкое белое 12%',
          en: 'semi‑sweet white 12%',
          kz: 'жартылай тәтті ақ 12%',
        },
        price: 25000,
      },
      {
        name: { ru: 'Villa Antinori Bianco Toscana IG', en: 'Villa Antinori Bianco Toscana IG', kz: 'Villa Antinori Bianco Toscana IG' },
        description: {
          ru: 'сухое белое 12%',
          en: 'dry white 12%',
          kz: 'құрғақ ақ 12%',
        },
        price: 25000,
      },
      {
        name: { ru: 'Villa Antinori Bianco Toscana IGT', en: 'Villa Antinori Bianco Toscana IGT', kz: 'Villa Antinori Bianco Toscana IGT' },
        description: {
          ru: 'сухое красное 12%',
          en: 'dry red 12%',
          kz: 'құрғақ қызыл 12%',
        },
        price: 45000,
      },
      {
        name: { ru: 'Ruggeri Prosecco', en: 'Ruggeri Prosecco', kz: 'Ruggeri Prosecco' }, description: { ru: '', en: '', kz: '' }, price: 45000 },
      {
        name: { ru: 'Martini Brut', en: 'Martini Brut', kz: 'Martini Brut' }, description: { ru: '', en: '', kz: '' }, price: 25000 },
      {
        name: { ru: 'Asti Martini Rose', en: 'Asti Martini Rose', kz: 'Asti Martini Rose' }, description: { ru: '', en: '', kz: '' }, price: 25000 },
    ],
  },
  {
    id: 'hookah',
    name: { ru: 'Кальян', en: 'Hookah', kz: 'Кальян' },
    items: [
      { name: { ru: 'Кальян Light', en: 'Hookah Light', kz: 'Кальян Light' }, description: { ru: '', en: '', kz: '' }, price: 12000 },
      { name: { ru: 'Кальян Medium', en: 'Hookah Medium', kz: 'Кальян Medium' }, description: { ru: '', en: '', kz: '' }, price: 15000 },
      { name: { ru: 'Кальян Hard', en: 'Hookah Hard', kz: 'Кальян Hard' }, description: { ru: '', en: '', kz: '' }, price: 18000 },
    ],
  },
];

// Current language state
let currentLang = 'ru';

/**
 * Render the category navigation and menu sections based on current language.
 */
function renderMenu() {
  const nav = document.getElementById('category-nav');
  const container = document.getElementById('menu-container');
  // Clear existing content
  nav.innerHTML = '';
  container.innerHTML = '';
  // Build navigation links and sections
  menuData.forEach((category) => {
    const langName = category.name[currentLang] || category.name['ru'];
    // Create nav link
    const navLink = document.createElement('a');
    navLink.href = `#${category.id}`;
    navLink.textContent = langName;
    nav.appendChild(navLink);
    // Create section
    const section = document.createElement('section');
    section.className = 'menu-section';
    section.id = category.id;
    const heading = document.createElement('h2');
    heading.textContent = langName;
    section.appendChild(heading);
    // Create items
    category.items.forEach((item) => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'menu-item';
      const itemName = item.name[currentLang] || item.name['ru'];
      const itemDesc = item.description[currentLang] || item.description['ru'];

      // If an image is provided for the dish, create an <img> element and
      // append it before the text content. The alt text uses the current
      // language name for accessibility.
      if (item.image) {
        const imgEl = document.createElement('img');
        imgEl.src = item.image;
        imgEl.alt = itemName;
        imgEl.className = 'item-image';
        itemDiv.appendChild(imgEl);
      }

      // Build a container for the item name and description.
      const infoDiv = document.createElement('div');
      infoDiv.className = 'item-info';
      const nameEl = document.createElement('h3');
      nameEl.textContent = itemName;
      infoDiv.appendChild(nameEl);
      if (itemDesc) {
        const descEl = document.createElement('p');
        descEl.textContent = itemDesc;
        infoDiv.appendChild(descEl);
      }
      // Append the info container to the main item div
      itemDiv.appendChild(infoDiv);
      // Create and append the price element
      const priceEl = document.createElement('div');
      priceEl.className = 'item-price';
      priceEl.textContent = formatPrice(item.price);
      itemDiv.appendChild(priceEl);
      section.appendChild(itemDiv);
    });
    container.appendChild(section);
  });
}

/**
 * Format price as string with spaces as thousands separator and the currency symbol.
 * @param {number} price
 * @returns {string}
 */
function formatPrice(price) {
  if (typeof price !== 'number') return price;
  // Convert to string with space separators
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

/**
 * Set the current language and update the menu.
 * @param {string} lang
 */
function setLanguage(lang) {
  currentLang = lang;
  // Update active class on buttons
  document
    .querySelectorAll('#language-switcher button')
    .forEach((btn) => btn.classList.toggle('active', btn.dataset.lang === lang));
  renderMenu();
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  // Attach event listeners to language buttons
  document
    .querySelectorAll('#language-switcher button')
    .forEach((btn) => {
      btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });
  // Render initial menu
  renderMenu();
});