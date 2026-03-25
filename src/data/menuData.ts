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

type ProductSeed = {
  name: string
  price: string
}

type CategorySeed = {
  id: string
  title: string
  blurb: string
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

const createProduct = (categoryId: string, seed: ProductSeed): Product => ({
  id: `${categoryId}-${slugify(seed.name)}`,
  name: seed.name,
  description: `Preparacion de ${seed.name} con estilo Sandeli.`,
  details: [
    `Seleccion especial de ${seed.name}.`,
    'Ingredientes y porciones sujetos a disponibilidad.',
    'Puedes pedir recomendaciones y personalizacion en tienda.',
  ],
  price: seed.price,
  imageSrc: defaultProductImage,
  imageAlt: `Imagen de ${seed.name}`,
})

const categorySeeds: CategorySeed[] = [
  {
    id: 'omelette',
    title: 'Omelette',
    blurb: 'Preparaciones de omelette con combinaciones de la casa.',
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
    blurb: 'Recetas de huevos y quesadillas para empezar el dia.',
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
    blurb: 'Selecciones completas y favoritas de Sandeli.',
    products: [
      { name: 'Desayuno de la Casa', price: '$26.000' },
      { name: 'Desayuno Andino', price: '$26.000' },
      { name: 'Desayuno Costeno', price: '$24.000' },
      { name: 'Desayuno Americano', price: '$23.000' },
      { name: 'Choripan', price: '$14.000' },
    ],
  },
  {
    id: 'waffles',
    title: 'Waffles',
    blurb: 'Versiones dulces y saladas para brunch o desayuno.',
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
    blurb: 'Opciones balanceadas entre pancakes y bowls.',
    products: [
      { name: 'Pancake Pistacho', price: '$26.000' },
      { name: 'Pancake Chocofruta', price: '$26.000' },
      { name: 'Bowl de Frutos Rojos', price: '$25.000' },
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
    id: 'pizzas-keto',
    title: 'Pizzas (Keto)',
    blurb: 'Pizzas keto con combinaciones premium de Sandeli.',
    products: [
      { name: 'Pizza Capresse', price: '$50.000' },
      { name: 'Pizza Sandeli', price: '$68.000' },
      { name: 'Pizza Gardenia', price: '$68.000' },
    ],
  },
  {
    id: 'hamburguesas',
    title: 'Hamburguesas',
    blurb: 'Linea de hamburguesas para todos los antojos.',
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
    id: 'postres',
    title: 'Postres',
    blurb: 'Postres y dulces para cerrar con broche de oro.',
    products: [
      { name: 'Parfite', price: '$22.000' },
      { name: 'Pie de Limon (porcion)', price: '$17.000' },
      { name: 'Pie de Limon (completo)', price: '$90.000' },
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
    ],
  },
]

export const menuCategories: Category[] = categorySeeds.map((category) => ({
  id: category.id,
  title: category.title,
  blurb: category.blurb,
  products: category.products.map((product) => createProduct(category.id, product)),
}))

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
