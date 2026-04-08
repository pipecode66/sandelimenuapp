export type Product = {
  id: string
  sectionId?: string | null
  name: string
  description: string
  details: string[]
  price: string
  priceAmount?: number
  imageSrc: string | null
  imageAlt: string
}

export type Category = {
  id: string
  title: string
  blurb: string
  iconKey?: string
  bannerImageUrl?: string | null
  products: Product[]
  sections?: CategorySection[]
}

export type CategorySection = {
  id: string
  title: string
  products: Product[]
}

export type FeedbackOption = {
  id: string
  label: string
  note: string
}

type ProductSeed = {
  name: string
  price: string
}

type CategorySeed = {
  id: string
  title: string
  blurb: string
  products?: ProductSeed[]
  sections?: SectionSeed[]
}

type SectionSeed = {
  id: string
  title: string
  products: ProductSeed[]
}

const defaultProductImage = '/assets/brand-board.jpeg'

const slugify = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' y ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const createProduct = (
  categoryId: string,
  seed: ProductSeed,
  sectionId?: string,
): Product => ({
  id: `${categoryId}-${sectionId ? `${sectionId}-` : ''}${slugify(seed.name)}`,
  sectionId: sectionId || null,
  name: seed.name,
  description: `Preparación de ${seed.name} con estilo Sandelí.`,
  details: [
    `Selección especial de ${seed.name}.`,
    'Ingredientes y porciones sujetos a disponibilidad.',
    'Puedes pedir recomendaciones y personalización en tienda.',
  ],
  price: seed.price,
  imageSrc: defaultProductImage,
  imageAlt: `Imagen de ${seed.name}`,
})

const categorySeeds: CategorySeed[] = [
  {
    id: 'desayunos-brunch',
    title: 'Desayunos y Brunch',
    blurb: 'Opciones de desayuno y brunch con combinaciones de la casa.',
    sections: [
      {
        id: 'omelettes',
        title: 'Omelettes',
        products: [
          { name: 'Omelette Criollo', price: '$24.000' },
          { name: 'Omelette de Carne Mechada', price: '$28.000' },
          { name: 'Omelette de Pollo Mechado', price: '$26.000' },
          { name: 'Omelette de Pollo Cremoso', price: '$29.000' },
          { name: 'Omelette de Llanero', price: '$27.000' },
        ],
      },
      {
        id: 'huevos-quesadillas',
        title: 'Huevos & Quesadillas',
        products: [
          { name: 'Huevos Benedictinos', price: '$28.000' },
          { name: 'Huevos Napolitanos', price: '$22.000' },
          { name: 'Huevos Turcos', price: '$22.000' },
          { name: 'Quesadilla de Pollo', price: '$27.000' },
        ],
      },
      {
        id: 'especiales',
        title: 'Especiales',
        products: [
          { name: 'Desayuno de la Casa', price: '$26.000' },
          { name: 'Desayuno Andino', price: '$26.000' },
          { name: 'Desayuno Costeño', price: '$24.000' },
          { name: 'Desayuno Americano', price: '$23.000' },
          { name: 'Choripán', price: '$14.000' },
        ],
      },
      {
        id: 'waffles',
        title: 'Waffles',
        products: [
          { name: 'Waffle de Queso', price: '$25.000' },
          { name: 'Waffles Huevos Cremosos', price: '$23.000' },
          { name: 'Waffles con frutas y Yogur Griego', price: '$24.000' },
          { name: 'Waffles con frutas y Helado', price: '$29.000' },
        ],
      },
      {
        id: 'pancake-bowl',
        title: 'Pancake & Bowl',
        products: [
          { name: 'Pancake Pistacho', price: '$26.000' },
          { name: 'Pancake Chocofruta', price: '$26.000' },
          { name: 'Bowl de Frutos Rojos', price: '$25.000' },
        ],
      },
      {
        id: 'arepas-maiz',
        title: 'Arepas de Maíz',
        products: [
          { name: 'Mix de Queso', price: '$9.500' },
          { name: 'Carne Mechada y Mix de Quesos', price: '$12.500' },
          { name: 'Pollo Mechado y Mix de Quesos', price: '$12.500' },
          { name: 'Solo Carne', price: '$16.000' },
          { name: 'Solo Pollo', price: '$15.000' },
          { name: 'Pollo Cremoso', price: '$16.000' },
          { name: 'Mixta (Carne y Pollo)', price: '$16.000' },
        ],
      },
      {
        id: 'arepas-almendras',
        title: 'Arepas de Almendras',
        products: [
          { name: 'Mix de Queso', price: '$13.000' },
          { name: 'Carne Mechada y Mix de Quesos', price: '$16.000' },
          { name: 'Pollo Mechado y Mix de Quesos', price: '$16.000' },
          { name: 'Solo Carne', price: '$17.000' },
          { name: 'Solo Pollo', price: '$17.000' },
          { name: 'Pollo Cremoso', price: '$17.000' },
          { name: 'Mixta (Carne y Pollo)', price: '$17.000' },
        ],
      },
    ],
  },
  {
    id: 'sandwich',
    title: 'Sandwich',
    blurb: 'Sandwiches artesanales con sello de la casa.',
    products: [
      { name: 'Sandwich Bondiola', price: '$28.000' },
      { name: 'Sandwich de Pollo', price: '$29.000' },
      { name: 'Sandwich Monserrat', price: '$28.000' },
      { name: 'Sandwichito Quesudito', price: '$11.000' },
    ],
  },
  {
    id: 'hamburguesa',
    title: 'Hamburguesas',
    blurb: 'Línea de hamburguesas para todos los antojos.',
    sections: [
      {
        id: 'hamburguesas',
        title: 'Hamburguesas',
        products: [
          { name: 'Hamburguesa de Carne', price: '$33.000' },
          { name: 'Hamburguesa con Nuggets', price: '$39.000' },
          { name: 'Hamburguesa de Pollo', price: '$30.000' },
          { name: 'Hamburguesa Mixta', price: '$38.000' },
          { name: 'Hamburguesa de Bondiola', price: '$31.000' },
          { name: 'Hamburguesa Gaucha', price: '$38.000' },
          { name: 'Hamburguesa Texana', price: '$39.000' },
          { name: 'Hamburguesa Doble Carne', price: '$39.000' },
        ],
      },
      {
        id: 'hamburguesas-sin-pan-keto',
        title: 'Hamburguesas sin pan (Keto)',
        products: [
          { name: 'Hamburguesa Mixta con tapas de Lechuga', price: '$37.000' },
          { name: 'Hamburguesa con tapas de Huevo', price: '$37.000' },
          {
            name: 'Hamburguesa con tapas de Queso Semiduro',
            price: '$39.000',
          },
        ],
      },
    ],
  },
  {
    id: 'pizzas',
    title: 'Pizzas (Keto)',
    blurb: 'Pizzas keto con combinaciones premium de Sandelí.',
    products: [
      { name: 'Pizza Capresse', price: '$50.000' },
      { name: 'Pizza Sandelí', price: '$68.000' },
      { name: 'Pizza Gardenia', price: '$68.000' },
    ],
  },
  {
    id: 'postres',
    title: 'Postres',
    blurb: 'Postres y dulces para cerrar con broche de oro.',
    products: [
      { name: 'Parfite', price: '$22.000' },
      { name: 'Pie de Limón (Porción)', price: '$17.000' },
      { name: 'Pie de Limón (Completo)', price: '$90.000' },
      { name: 'Brownie Arequipe y Almendras', price: '$9.000' },
      { name: 'Brownie full chocolate', price: '$12.000' },
      { name: 'Mini Alfajor', price: '$3.000' },
      { name: 'Alfajor', price: '$6.000' },
      { name: 'Muffins', price: '$8.000' },
      { name: 'Cuchareable Chocoarequipe', price: '$24.000' },
      { name: 'Cuchareable Victoria', price: '$24.000' },
      { name: 'Cuchareable Milky Way', price: '$24.000' },
      { name: 'Cuchareable Tres Leches', price: '$24.000' },
      { name: 'Tartaleta de Frutos Rojos', price: '$12.000' },
      { name: 'Pan de Harina de Avena', price: '$21.000' },
      { name: 'Mantecada con Arándanos', price: '$21.000' },
      { name: 'Mantecada de Almendra y Arroz', price: '$25.000' },
    ],
  },
  {
    id: 'tortas-porcion',
    title: 'Tortas por porción',
    blurb: 'Porciones de tortas artesanales de la casa.',
    products: [
      { name: 'Lirio', price: '$21.000' },
      { name: 'Chocolata', price: '$23.000' },
      { name: 'Margarita', price: '$17.000' },
      { name: 'Amapola', price: '$19.000' },
      { name: 'Hortensia', price: '$17.000' },
      { name: 'Astromelia', price: '$17.000' },
      { name: 'Cataleya', price: '$18.000' },
      { name: 'Camelia', price: '$18.000' },
      { name: 'Torta de Pan de Quinoa (Porción)', price: '$9.000' },
      { name: 'Torta de Pan de Quinoa (Completa)', price: '$49.000' },
    ],
  },
  {
    id: 'bebidas-frias',
    title: 'Bebidas Frías',
    blurb: 'Bebidas frías para refrescar y acompañar tus platos.',
    products: [
      { name: 'Soda de Frutos Verdes', price: '$12.000' },
      { name: 'Soda de Frutos Rojos', price: '$12.000' },
      { name: 'Soda de Frutos Amarillos', price: '$12.000' },
      { name: 'Limonada de Hierbabuena', price: '$10.000' },
      { name: 'Limonada de Jamaica', price: '$10.000' },
      { name: 'Limonada de Café', price: '$10.000' },
      { name: 'Limonada de Coco', price: '$14.000' },
      { name: 'Latte frío', price: '$10.000' },
      { name: 'Té Chai frío', price: '$11.000' },
      { name: 'Alegría', price: '$14.000' },
      { name: 'Brisa Tropical', price: '$14.000' },
      { name: 'Refrescante Equilibrio (Agua)', price: '$14.000' },
      { name: 'Refrescante Equilibrio (Soda)', price: '$15.000' },
      { name: 'Fresca Vida (Agua)', price: '$14.000' },
      { name: 'Fresca Vida (Soda)', price: '$15.000' },
      { name: 'Salud Brillante (Agua)', price: '$14.000' },
      { name: 'Salud Brillante (Soda)', price: '$15.000' },
      { name: 'Frappuccino', price: '$14.000' },
      { name: 'Choco Frappe', price: '$14.000' },
      { name: 'Frappe de Vainilla', price: '$14.000' },
      { name: 'Vaso de leche deslactosada', price: '$4.000' },
      { name: 'Malteada de Frutos Rojos', price: '$15.000' },
      { name: 'Adicional de leche de almendras', price: '$7.000' },
      { name: 'Agua Hatsu Manantial 600', price: '$5.000' },
      { name: 'Soda Bretaña', price: '$6.000' },
    ],
  },
  {
    id: 'helados',
    title: 'Helados',
    blurb: 'Helados y combinaciones dulces para antojarse.',
    products: [
      { name: 'Helado', price: '$17.000' },
      { name: 'Helado con Alfajor', price: '$15.000' },
      { name: 'Helado con Galleta de Almendra', price: '$25.000' },
      { name: 'Helado con Mini Brownie', price: '$17.000' },
      { name: 'Malteada', price: '$24.000' },
    ],
  },
  {
    id: 'bebidas-calientes',
    title: 'Bebidas Calientes',
    blurb: 'Bebidas calientes para iniciar o cerrar el día.',
    products: [
      { name: 'Café Expresso', price: '$6.000' },
      { name: 'Americano', price: '$6.000' },
      { name: 'Moccachino', price: '$10.000' },
      { name: 'Capuchino', price: '$9.000' },
      { name: 'Latte', price: '$9.000' },
      { name: 'Chocolate Caliente', price: '$9.000' },
      { name: 'Té digestivo', price: '$11.000' },
      { name: 'Leche Dorada', price: '$9.000' },
      { name: 'Té Chai Caliente', price: '$11.000' },
      { name: 'Té Matcha Caliente', price: '$11.000' },
      { name: 'Aromáticas', price: '$8.000' },
    ],
  },
  {
    id: 'minimarket',
    title: 'Minimarket',
    blurb: 'Productos para llevar y disfrutar en casa.',
    products: [
      { name: 'Pan Tajado de Arroz con Quinoa sin Gluten', price: '$16.000' },
      { name: 'Pan Mogolla de Arroz y Sagú', price: '$11.500' },
      { name: 'Pan Mogolla de Arroz con Semillas', price: '$15.000' },
      { name: 'Pan tipo Perro', price: '$15.000' },
      { name: 'Mantequilla Ghee 1000', price: '$85.000' },
      { name: 'Mantequilla Ghee 500', price: '$49.000' },
      { name: 'Mantequilla Ghee 250', price: '$29.000' },
      { name: 'Stevia Líquida 200', price: '$20.000' },
      { name: 'Stevia Líquida Concentrada 40', price: '$25.000' },
      { name: 'Monk Fruit Concentrado 30', price: '$25.000' },
      { name: 'Monk Fruit Granulado 350', price: '$37.000' },
      { name: 'Grasa de Cerdo 1000', price: '$41.000' },
      { name: 'Grasa de Cerdo 500', price: '$22.000' },
      { name: 'Arepas de Harina de Almendras', price: '$22.000' },
      { name: 'Arepas de Harina de Maíz y Chía', price: '$12.000' },
      { name: 'Arepa de Harina de Maíz con Queso', price: '$14.000' },
      { name: 'Chorizo Artesanal x5', price: '$22.000' },
      { name: 'Chorizo Artesanal 500', price: '$16.000' },
      { name: 'Chorizo Artesanal 250', price: '$30.000' },
      { name: 'Bondiola de Cerdo 250', price: '$20.000' },
      { name: 'Bondiola de Cerdo 500', price: '$40.000' },
      { name: 'Yogurt Griego 500', price: '$16.000' },
      { name: 'Yogurt Griego 1000', price: '$30.000' },
      { name: 'Kéfir 280', price: '$13.000' },
      { name: 'Kéfir 470', price: '$20.000' },
      { name: 'Kéfir 1000', price: '$31.000' },
    ],
  },
]

const categoryBannerById: Partial<Record<Category['id'], string>> = {
  'desayunos-brunch': '/assets/banners/banner-desayunos-brunch.png',
  sandwich: '/assets/banners/banner-sandwich.png',
  hamburguesa: '/assets/banners/banner-hamburguesas.png',
  pizzas: '/assets/banners/banner-pizzas.png',
  postres: '/assets/banners/banner-postres.png',
  'tortas-porcion': '/assets/banners/banner-tortas-porcion.png',
  'bebidas-frias': '/assets/banners/banner-bebidas-frias.png',
  helados: '/assets/banners/banner-helados.png',
  'bebidas-calientes': '/assets/banners/banner-bebidas-calientes.png',
}

export const menuCategories: Category[] = categorySeeds.map((category) => {
  const sections = category.sections?.map((section) => ({
    id: section.id,
    title: section.title,
    products: section.products.map((product) =>
      createProduct(category.id, product, section.id),
    ),
  }))

  const products = sections
    ? sections.flatMap((section) => section.products)
    : (category.products ?? []).map((product) => createProduct(category.id, product))

  return {
    id: category.id,
    title: category.title,
    blurb: category.blurb,
    bannerImageUrl: categoryBannerById[category.id] ?? null,
    products,
    sections,
  }
})

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
  'Presentación',
  'Variedad',
]

export const businessInfo = {
  address: 'Cl. 3 #0E-21, Barrio La Ceiba, Cúcuta, Norte de Santander',
  phoneDisplay: '324 2773556',
  phoneHref: 'tel:+573242773556',
  whatsappPhone: '3242773556',
  whatsappMessage:
    'Hola Sandelí, me gustaría conocer el menú y recibir más información.',
  hours: [
    { day: 'viernes', time: '8 a.m. - 8 p.m.' },
    { day: 'sábado', time: '8 a.m. - 8 p.m.' },
    { day: 'domingo', time: '9 a.m. - 7 p.m.' },
    { day: 'lunes', time: '8 a.m. - 8 p.m.' },
    { day: 'martes', time: '8 a.m. - 8 p.m.' },
    { day: 'miércoles', time: '8 a.m. - 8 p.m.' },
    { day: 'jueves', time: '8 a.m. - 8 p.m.' },
  ],
  mapEmbedUrl:
    'https://www.google.com/maps?q=Sandeli+Postres,+Brunch+y+Almuerzos+Saludables,+Cl.+3+%230E-21,+Barrio+La+Ceiba,+Cucuta,+Norte+de+Santander&ll=7.8951633,-72.4994668&z=18&output=embed',
  mapsUrl: 'https://maps.app.goo.gl/kmnhWkfQVfbvJMMR8?g_st=iwb',
}
