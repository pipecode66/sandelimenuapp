export type Product = {
  id: string
  name: string
  details: string[]
  price: string
  visualNote: string
  accent: string
}

export type Category = {
  id: string
  title: string
  blurb: string
  palette: [string, string]
  products: Product[]
}

export type FeedbackOption = {
  id: string
  label: string
  note: string
  response: string
}

export const menuCategories: Category[] = [
  {
    id: 'desayunos',
    title: 'Desayunos',
    blurb: 'Opciones balanceadas para comenzar el día con energía y sabor.',
    palette: ['#9f1fee', '#9f93e7'],
    products: [
      {
        id: 'desayuno-bowl-amapola',
        name: 'Bowl amanecer de amapola',
        details: [
          'Yogur griego natural con granola artesanal.',
          'Frutas frescas de temporada, chía y miel suave.',
          'Toque de semillas y coulis de frutos rojos.',
        ],
        price: '$18.900',
        visualNote: 'Granola, frutos rojos y frescura cremosa.',
        accent: '#a41c82',
      },
      {
        id: 'desayuno-tostadas-campesinas',
        name: 'Tostadas campesinas saludables',
        details: [
          'Pan integral tostado con hummus de garbanzo.',
          'Huevos revueltos cremosos y tomate confitado.',
          'Brotes frescos y aceite de oliva especiado.',
        ],
        price: '$16.500',
        visualNote: 'Tostadas tibias con huevos y brotes.',
        accent: '#dcd7d4',
      },
    ],
  },
  {
    id: 'brunch',
    title: 'Brunch',
    blurb: 'Platos pensados para compartir la mañana o extender la tarde.',
    palette: ['#a41c82', '#9f93e7'],
    products: [
      {
        id: 'brunch-waffle-proteico',
        name: 'Waffle proteico de frutos rojos',
        details: [
          'Waffle suave de avena y vainilla.',
          'Crema ligera de yogur, fresas y arándanos.',
          'Mantequilla de mani y semillas crocantes.',
        ],
        price: '$22.900',
        visualNote: 'Brunch dulce con textura crocante.',
        accent: '#9f1fee',
      },
      {
        id: 'brunch-croissant-caprese',
        name: 'Croissant caprese brunch',
        details: [
          'Croissant horneado con pesto de albahaca.',
          'Mozzarella fresca, tomate asado y hojas verdes.',
          'Acompañado de ensalada cítrica.',
        ],
        price: '$24.500',
        visualNote: 'Capas suaves, verdes y aroma a albahaca.',
        accent: '#dcd7d4',
      },
    ],
  },
  {
    id: 'helados',
    title: 'Helados',
    blurb: 'Postres fríos con perfil ligero y combinaciones afrutadas.',
    palette: ['#9f93e7', '#dcd7d4'],
    products: [
      {
        id: 'helado-yogur-morado',
        name: 'Helado de yogur morado',
        details: [
          'Base cremosa de yogur natural.',
          'Compota de mora, blueberries y vainilla.',
          'Topping de nibs de cacao.',
        ],
        price: '$9.500',
        visualNote: 'Frio cremoso con matices de mora.',
        accent: '#a41c82',
      },
      {
        id: 'helado-mango-avena',
        name: 'Helado tropical de mango y avena',
        details: [
          'Mango maduro batido con avena hidratada.',
          'Leche vegetal y toque de canela.',
          'Coco tostado en la parte superior.',
        ],
        price: '$10.500',
        visualNote: 'Mango brillante con coco tostado.',
        accent: '#898989',
      },
    ],
  },
  {
    id: 'postres',
    title: 'Postres',
    blurb: 'Dulces de autor con ingredientes nobles y presentación delicada.',
    palette: ['#dcd7d4', '#a41c82'],
    products: [
      {
        id: 'postre-cheesecake-berries',
        name: 'Cheesecake ligero de berries',
        details: [
          'Base crocante de avena y frutos secos.',
          'Relleno cremoso de queso suave y yogur.',
          'Terminación de frutos rojos frescos.',
        ],
        price: '$14.900',
        visualNote: 'Capas suaves con brillo de berries.',
        accent: '#9f1fee',
      },
      {
        id: 'postre-brownie-cacao',
        name: 'Brownie de cacao y nuez',
        details: [
          'Cacao intenso con harina de almendra.',
          'Nueces troceadas y centro humedo.',
          'Toque final de sal marina.',
        ],
        price: '$11.900',
        visualNote: 'Cacao profundo y nuez crocante.',
        accent: '#1a1b1d',
      },
    ],
  },
  {
    id: 'tortas-porcion',
    title: 'Tortas por porción',
    blurb: 'Porciones para antojos especiales, mesas de amigas o café largo.',
    palette: ['#a41c82', '#dcd7d4'],
    products: [
      {
        id: 'torta-zanahoria-especiada',
        name: 'Carrot cake especiada',
        details: [
          'Bizcocho de zanahoria con especias suaves.',
          'Relleno ligero de queso crema.',
          'Nueces caramelizadas y ralladura de naranja.',
        ],
        price: '$12.900',
        visualNote: 'Textura casera con notas calidas.',
        accent: '#9f93e7',
      },
      {
        id: 'torta-limon-amapola',
        name: 'Torta de limon y amapola',
        details: [
          'Miga aireada con limon natural.',
          'Semillas de amapola y glaseado ligero.',
          'Decoración fresca y delicada.',
        ],
        price: '$12.500',
        visualNote: 'Limon brillante con acabado suave.',
        accent: '#898989',
      },
    ],
  },
  {
    id: 'bebidas',
    title: 'Bebidas',
    blurb: 'Bebidas calientes y frías para acompañar el momento.',
    palette: ['#898989', '#9f1fee'],
    products: [
      {
        id: 'bebida-latte-coco',
        name: 'Latte de coco y canela',
        details: [
          'Café espresso y leche de coco espumada.',
          'Canela suave y toque de miel.',
          'Servido caliente con aroma especiado.',
        ],
        price: '$8.900',
        visualNote: 'Cafe sedoso con espuma especiada.',
        accent: '#dcd7d4',
      },
      {
        id: 'bebida-limonada-lavanda',
        name: 'Limonada de lavanda',
        details: [
          'Limón fresco y jarabe floral casero.',
          'Agua con gas y hielo cristalino.',
          'Terminación con hojas de menta.',
        ],
        price: '$9.500',
        visualNote: 'Citrico floral y muy refrescante.',
        accent: '#9f93e7',
      },
    ],
  },
  {
    id: 'recomendados',
    title: 'Recomendados de la Casa',
    blurb: 'Los favoritos Sandelí para quien quiere ir a la fija.',
    palette: ['#1a1b1d', '#9f1fee'],
    products: [
      {
        id: 'recomendado-bowl-sandeli',
        name: 'Bowl signature Sandelí',
        details: [
          'Base de quinoa y vegetales rostizados.',
          'Pollo grillado, hummus y aderezo cítrico.',
          'Aguacate, semillas y hojas verdes.',
        ],
        price: '$26.900',
        visualNote: 'El balance estrella de la casa.',
        accent: '#a41c82',
      },
      {
        id: 'recomendado-sandwich-jardin',
        name: 'Sandwich jardin grillado',
        details: [
          'Pan artesanal con queso suave.',
          'Berenjena asada, zucchini y tomates.',
          'Pesto ligero y ensalada fresca de acompañamiento.',
        ],
        price: '$23.500',
        visualNote: 'Vegetales asados y pan dorado.',
        accent: '#dcd7d4',
      },
    ],
  },
  {
    id: 'temporada',
    title: 'Producto de Temporada',
    blurb: 'Sabores limitados que cambian con la inspiración del mes.',
    palette: ['#9f1fee', '#dcd7d4'],
    products: [
      {
        id: 'temporada-tarta-mango-maracuya',
        name: 'Tarta tropical de mango y maracuya',
        details: [
          'Base suave tipo sable de almendra.',
          'Crema de mango y centro de maracuya.',
          'Decoracion fresca con fruta natural.',
        ],
        price: '$13.900',
        visualNote: 'Tropical, brillante y muy fresca.',
        accent: '#a41c82',
      },
      {
        id: 'temporada-matcha-berry-frappe',
        name: 'Matcha berry frappe',
        details: [
          'Matcha ceremonial batido con hielo.',
          'Leche vegetal y swirl de frutos rojos.',
          'Textura fría y energizante.',
        ],
        price: '$12.900',
        visualNote: 'Verde vibrante con remolino berry.',
        accent: '#898989',
      },
    ],
  },
]

export const feedbackOptions: FeedbackOption[] = [
  {
    id: 'fascinado',
    label: 'Me encantó',
    note: 'Sabor, experiencia y ambiente superaron lo esperado.',
    response: 'Gracias por elegirnos. Nos alegra saber que Sandelí te encantó.',
  },
  {
    id: 'feliz',
    label: 'Muy bien',
    note: 'La experiencia fue muy satisfactoria y volverías pronto.',
    response:
      'Gracias por tu valoración. Seguimos cuidando cada detalle para recibirte otra vez.',
  },
  {
    id: 'bien',
    label: 'Bien',
    note: 'Tu visita fue agradable y todavía podemos sorprenderte más.',
    response:
      'Gracias por contarnos. Vamos a seguir afinando la experiencia para que la próxima sea aún mejor.',
  },
  {
    id: 'mejorable',
    label: 'Podemos mejorar',
    note: 'Hay algo puntual que no se sintió del todo bien.',
    response:
      'Gracias por darnos visibilidad. Este tipo de señales nos ayuda a crecer con más cuidado.',
  },
  {
    id: 'urgente',
    label: 'Necesito ayuda',
    note: 'Prefieres que Sandelí haga seguimiento a tu experiencia.',
    response:
      'Recibido. Podemos continuar la atención por llamada o por WhatsApp apenas el canal quede activo.',
  },
]

export const businessInfo = {
  address: 'Cl. 3 #0E-21, Barrio La Ceiba, Cúcuta, Norte de Santander',
  phoneDisplay: '324 2773556',
  phoneHref: 'tel:+573242773556',
  whatsappPhone: '',
  whatsappMessage:
    'Hola Sandelí, me gustaría conocer el menú y recibir más información.',
  hours: [
    { day: 'Viernes', time: '8 a.m. - 8 p.m.' },
    { day: 'Sábado', time: '8 a.m. - 8 p.m.' },
    { day: 'Domingo', time: '9 a.m. - 7 p.m.' },
    { day: 'Lunes', time: '8 a.m. - 8 p.m.' },
    { day: 'Martes', time: '8 a.m. - 8 p.m.' },
    { day: 'Miércoles', time: '8 a.m. - 8 p.m.' },
    { day: 'Jueves', time: '8 a.m. - 8 p.m.' },
  ],
  mapEmbedUrl:
    'https://www.google.com/maps?q=Cl.%203%20%230E-21%2C%20Barrio%20La%20ceiba%2C%20C%C3%BAcuta%2C%20Norte%20de%20Santander&output=embed',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Cl.%203%20%230E-21%2C%20Barrio%20La%20ceiba%2C%20C%C3%BAcuta%2C%20Norte%20de%20Santander',
}
