# Sandelí Menu App

Aplicación web móvil para Sandelí, pensada como menú visual con acceso rápido a:

- Menú por categorías
- Feedback por selección
- Ubicación, horarios y contacto
- Integración preparada para WhatsApp

## Stack

- React 19
- Vite 8
- TypeScript

## Correr localmente

```bash
npm install
npm run dev
```

## Build de producción

```bash
npm run build
```

## Dónde editar contenido

- Menú, productos, precios, feedback y datos del negocio:
  `src/data/menuData.ts`
- Metadatos, favicon y manifest:
  `index.html` y `public/site.webmanifest`
- Logo y recursos de marca:
  `public/`

## WhatsApp

El canal quedó listo para activarse. Solo falta completar `businessInfo.whatsappPhone` en `src/data/menuData.ts`.

## Despliegue

El proyecto queda listo para desplegar en Vercel como aplicación estática sin configuración adicional.
