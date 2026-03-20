# Sandeli Menu App

Aplicacion web mobile-first para Sandeli con enfoque de menu digital visual.

## Incluye

- Home con logo principal
- 4 cards principales: Menu, Danos tu opinion, Encuentranos, WhatsApp
- Modal de categorias + navegacion por tabs
- Productos con imagen, nombre, descripcion expandible, precio y compartir
- Feedback por seleccion: rating de estrellas + opciones rapidas
- Seccion de ubicacion con horarios y Google Maps embebido
- WhatsApp con variable editable para numero
- Manifest + service worker basico para experiencia instalable

## Desarrollo local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Donde editar contenido

- Menu, productos, precios, feedback y datos de negocio:
  `src/data/menuData.ts`
- Layout y comportamiento:
  `src/App.tsx`
- Estilos:
  `src/App.css` y `src/index.css`

## Assets de marca

Ubicados en `public/assets`:

- `logo.png`
- `logoIOS.png`
- `brand-board.jpeg`

## WhatsApp

Edita `businessInfo.whatsappPhone` en `src/data/menuData.ts`.

## Despliegue

Proyecto listo para Vercel sin `vercel.json`.
