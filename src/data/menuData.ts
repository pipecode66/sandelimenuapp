export type Product = {
  id: string
  name: string
  description: string
  details: string[]
  price: string
  imageSrc: string
  imageAlt: string
}

export type Category = {
  id: string
  title: string
  blurb: string
  products: Product[]
}

export type FeedbackOption = {
  id: string
  label: string
  note: string
}

const defaultProductImage = '/assets/brand-board.jpeg'

export const menuCategories: Category[] = [
  {
    id: 'desayunos',
    title: 'Desayunos',
    blurb: 'Opciones saludables para arrancar el dia con energia.',
    products: [
      {
        id: 'desayuno-bowl-amapola',
        name: 'Bowl amanecer de amapola',
        description: 'Yogur griego, granola y frutas frescas.',
        details: [
          'Yogur griego natural con granola artesanal.',
          'Frutas de temporada, chia y miel suave.',
          'Semillas mixtas y coulis de frutos rojos.',
        ],
        price: '$18.900',
        imageSrc: defaultProductImage,
        imageAlt: 'Bowl de desayuno saludable con frutas.',
      },
      {
        id: 'desayuno-tostadas-campesinas',
        name: 'Tostadas campesinas saludables',
        description: 'Pan integral, huevos cremosos y brotes frescos.',
        details: [
          'Pan integral tostado con hummus de garbanzo.',
          'Huevos revueltos cremosos y tomate confitado.',
          'Brotes frescos y aceite de oliva especiado.',
        ],
        price: '$16.500',
        imageSrc: defaultProductImage,
        imageAlt: 'Tostadas saludables con huevo y vegetales.',
      },
    ],
  },
  {
    id: 'brunch',
    title: 'Brunch',
    blurb: 'Platos de media manana con perfil balanceado.',
    products: [
      {
        id: 'brunch-waffle-proteico',
        name: 'Waffle proteico de frutos rojos',
        description: 'Waffle de avena con crema de yogur y berries.',
        details: [
          'Waffle de avena y vainilla.',
          'Crema ligera de yogur, fresas y arandanos.',
          'Mantequilla de mani y semillas crocantes.',
        ],
        price: '$22.900',
        imageSrc: defaultProductImage,
        imageAlt: 'Waffle con topping de frutos rojos.',
      },
      {
        id: 'brunch-croissant-caprese',
        name: 'Croissant caprese brunch',
        description: 'Croissant tibio con pesto, mozzarella y tomate.',
        details: [
          'Croissant horneado con pesto de albahaca.',
          'Mozzarella fresca, tomate asado y hojas verdes.',
          'Acompanado de ensalada citrica.',
        ],
        price: '$24.500',
        imageSrc: defaultProductImage,
        imageAlt: 'Croissant estilo caprese.',
      },
    ],
  },
  {
    id: 'helados',
    title: 'Helados',
    blurb: 'Alternativas frias y ligeras para refrescar.',
    products: [
      {
        id: 'helado-yogur-morado',
        name: 'Helado de yogur morado',
        description: 'Base de yogur, mora y toque de cacao.',
        details: [
          'Base cremosa de yogur natural.',
          'Compota de mora y arandanos.',
          'Topping de nibs de cacao.',
        ],
        price: '$9.500',
        imageSrc: defaultProductImage,
        imageAlt: 'Helado de yogur en copa.',
      },
      {
        id: 'helado-mango-avena',
        name: 'Helado tropical de mango y avena',
        description: 'Mango maduro con coco tostado.',
        details: [
          'Mango batido con avena hidratada.',
          'Leche vegetal y toque de canela.',
          'Coco tostado en la parte superior.',
        ],
        price: '$10.500',
        imageSrc: defaultProductImage,
        imageAlt: 'Helado tropical de mango.',
      },
    ],
  },
  {
    id: 'postres',
    title: 'Postres',
    blurb: 'Dulces de la casa con ingredientes nobles.',
    products: [
      {
        id: 'postre-cheesecake-berries',
        name: 'Cheesecake ligero de berries',
        description: 'Base crocante con topping de frutos rojos.',
        details: [
          'Base crocante de avena y frutos secos.',
          'Relleno de queso suave y yogur.',
          'Terminacion de frutos rojos frescos.',
        ],
        price: '$14.900',
        imageSrc: defaultProductImage,
        imageAlt: 'Porcion de cheesecake con berries.',
      },
      {
        id: 'postre-brownie-cacao',
        name: 'Brownie de cacao y nuez',
        description: 'Cacao intenso con interior humedo.',
        details: [
          'Cacao intenso con harina de almendra.',
          'Nueces troceadas y centro humedo.',
          'Toque final de sal marina.',
        ],
        price: '$11.900',
        imageSrc: defaultProductImage,
        imageAlt: 'Brownie de cacao con nuez.',
      },
    ],
  },
  {
    id: 'tortas-porcion',
    title: 'Tortas por porción',
    blurb: 'Porciones individuales para acompanar tu cafe.',
    products: [
      {
        id: 'torta-zanahoria-especiada',
        name: 'Carrot cake especiada',
        description: 'Miga humeda con nuez y crema suave.',
        details: [
          'Bizcocho de zanahoria con especias suaves.',
          'Relleno ligero de queso crema.',
          'Nueces caramelizadas y ralladura de naranja.',
        ],
        price: '$12.900',
        imageSrc: defaultProductImage,
        imageAlt: 'Porcion de carrot cake.',
      },
      {
        id: 'torta-limon-amapola',
        name: 'Torta de limon y amapola',
        description: 'Notas citricas y glaseado ligero.',
        details: [
          'Miga aireada con limon natural.',
          'Semillas de amapola y glaseado ligero.',
          'Decoracion fresca de temporada.',
        ],
        price: '$12.500',
        imageSrc: defaultProductImage,
        imageAlt: 'Porcion de torta de limon.',
      },
    ],
  },
  {
    id: 'bebidas',
    title: 'Bebidas',
    blurb: 'Calientes y frias para cada momento.',
    products: [
      {
        id: 'bebida-latte-coco',
        name: 'Latte de coco y canela',
        description: 'Espresso suave con leche de coco espumada.',
        details: [
          'Cafe espresso y leche de coco espumada.',
          'Canela suave y toque de miel.',
          'Servido caliente con aroma especiado.',
        ],
        price: '$8.900',
        imageSrc: defaultProductImage,
        imageAlt: 'Latte de coco con espuma.',
      },
      {
        id: 'bebida-limonada-lavanda',
        name: 'Limonada de lavanda',
        description: 'Refrescante, floral y citrica.',
        details: [
          'Limon fresco y jarabe floral casero.',
          'Agua con gas y hielo cristalino.',
          'Terminacion con hojas de menta.',
        ],
        price: '$9.500',
        imageSrc: defaultProductImage,
        imageAlt: 'Limonada con menta y hielo.',
      },
    ],
  },
  {
    id: 'recomendados',
    title: 'Recomendados de la Casa',
    blurb: 'Favoritos Sandeli para ir a la fija.',
    products: [
      {
        id: 'recomendado-bowl-sandeli',
        name: 'Bowl signature Sandeli',
        description: 'Quinoa, vegetales y proteina grillada.',
        details: [
          'Base de quinoa y vegetales rostizados.',
          'Pollo grillado, hummus y aderezo citrico.',
          'Aguacate, semillas y hojas verdes.',
        ],
        price: '$26.900',
        imageSrc: defaultProductImage,
        imageAlt: 'Bowl signature de la casa.',
      },
      {
        id: 'recomendado-sandwich-jardin',
        name: 'Sandwich jardin grillado',
        description: 'Vegetales asados en pan artesanal.',
        details: [
          'Pan artesanal con queso suave.',
          'Berenjena asada, zucchini y tomates.',
          'Pesto ligero y ensalada fresca de acompanamiento.',
        ],
        price: '$23.500',
        imageSrc: defaultProductImage,
        imageAlt: 'Sandwich de vegetales grillados.',
      },
    ],
  },
  {
    id: 'temporada',
    title: 'Producto de Temporada',
    blurb: 'Sabores por tiempo limitado.',
    products: [
      {
        id: 'temporada-tarta-mango-maracuya',
        name: 'Tarta tropical de mango y maracuya',
        description: 'Fresca, frutal y de temporada.',
        details: [
          'Base suave tipo sable de almendra.',
          'Crema de mango y centro de maracuya.',
          'Decoracion fresca con fruta natural.',
        ],
        price: '$13.900',
        imageSrc: defaultProductImage,
        imageAlt: 'Tarta tropical de mango.',
      },
      {
        id: 'temporada-matcha-berry-frappe',
        name: 'Matcha berry frappe',
        description: 'Bebida fria energizante con frutos rojos.',
        details: [
          'Matcha ceremonial batido con hielo.',
          'Leche vegetal y swirl de frutos rojos.',
          'Textura fria y energizante.',
        ],
        price: '$12.900',
        imageSrc: defaultProductImage,
        imageAlt: 'Frappé de matcha y berries.',
      },
    ],
  },
]

export const feedbackOptions: FeedbackOption[] = [
  {
    id: 'excelente',
    label: 'Excelente',
    note: 'Todo estuvo espectacular.',
  },
  {
    id: 'muy-bien',
    label: 'Muy bien',
    note: 'Buena experiencia general.',
  },
  {
    id: 'bien',
    label: 'Bien',
    note: 'Correcto, con espacio para mejorar.',
  },
  {
    id: 'mejorable',
    label: 'Podemos mejorar',
    note: 'Hubo detalles por ajustar.',
  },
]

export const feedbackTags = [
  'Servicio',
  'Sabor',
  'Tiempo',
  'Presentacion',
  'Variedad',
]

export const businessInfo = {
  address: 'Cl. 3 #0E-21, Barrio La Ceiba, Cucuta, Norte de Santander',
  phoneDisplay: '324 2773556',
  phoneHref: 'tel:+573242773556',
  whatsappPhone: '',
  whatsappMessage:
    'Hola Sandeli, me gustaria conocer el menu y recibir mas informacion.',
  hours: [
    { day: 'viernes', time: '8 a.m. - 8 p.m.' },
    { day: 'sabado', time: '8 a.m. - 8 p.m.' },
    { day: 'domingo', time: '9 a.m. - 7 p.m.' },
    { day: 'lunes', time: '8 a.m. - 8 p.m.' },
    { day: 'martes', time: '8 a.m. - 8 p.m.' },
    { day: 'miercoles', time: '8 a.m. - 8 p.m.' },
    { day: 'jueves', time: '8 a.m. - 8 p.m.' },
  ],
  mapEmbedUrl:
    'https://www.google.com/maps?q=Cl.%203%20%230E-21%2C%20Barrio%20La%20Ceiba%2C%20Cucuta%2C%20Norte%20de%20Santander&output=embed',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Cl.%203%20%230E-21%2C%20Barrio%20La%20Ceiba%2C%20Cucuta%2C%20Norte%20de%20Santander',
}
