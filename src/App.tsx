import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowUpRight,
  CakeSlice,
  Coffee,
  Clock3,
  EggFried,
  ChefHat,
  Hamburger,
  IceCreamCone,
  MapPin,
  MapPinned,
  Pizza,
  Sandwich,
  Share2,
  ShoppingBag,
  Soup,
  Star,
  UtensilsCrossed,
  X,
  type LucideIcon,
} from 'lucide-react'
import './App.css'
import { businessInfo, type Category, type Product } from './data/menuData'
import { fallbackMenuCategories, loadRemoteMenuCategories } from './lib/menuApi'

const googleReviewUrl = 'https://g.page/r/CS4686nLJ5EbEBM/review'

const menuCategoryIcons: Record<string, LucideIcon> = {
  utensils: UtensilsCrossed,
  breakfast: EggFried,
  sandwich: Sandwich,
  burger: Hamburger,
  pizza: Pizza,
  dessert: CakeSlice,
  cake: ChefHat,
  cold_drink: Soup,
  ice_cream: IceCreamCone,
  hot_drink: Coffee,
  market: ShoppingBag,
}

const normalizeCategoryKey = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

const fallbackBannerById = new Map(
  fallbackMenuCategories.map((category) => [category.id, category.bannerImageUrl ?? null]),
)

const fallbackBannerByTitle = new Map(
  fallbackMenuCategories.map((category) => [
    normalizeCategoryKey(category.title),
    category.bannerImageUrl ?? null,
  ]),
)

const resolveCategoryBannerUrl = (category?: Category) => {
  if (!category) return null
  if (category.bannerImageUrl) return category.bannerImageUrl
  return (
    fallbackBannerById.get(category.id) ??
    fallbackBannerByTitle.get(normalizeCategoryKey(category.title)) ??
    null
  )
}

const productImageOverrides: Partial<
  Record<Product['id'], { cardSrc: string; detailSrc: string }>
> = {
  'desayunos-brunch-omelettes-omelette-criollo': {
    cardSrc: '/assets/producto.png',
    detailSrc: '/assets/productoampliado.png',
  },
  'sandwich-sandwich-bondiola': {
    cardSrc: '/assets/sandwich-bondiola.jpg',
    detailSrc: '/assets/sandwich-bondiola.jpg',
  },
  'sandwich-sandwich-de-pollo': {
    cardSrc: '/assets/sandwich-pollo.jpg',
    detailSrc: '/assets/sandwich-pollo.jpg',
  },
  'hamburguesa-hamburguesas-hamburguesa-gaucha': {
    cardSrc: '/assets/hamburguesa-gaucha.jpg',
    detailSrc: '/assets/hamburguesa-gaucha.jpg',
  },
  'hamburguesa-hamburguesas-hamburguesa-texana': {
    cardSrc: '/assets/hamburguesa-texana.jpg',
    detailSrc: '/assets/hamburguesa-texana.jpg',
  },
  'hamburguesa-hamburguesas-hamburguesa-mixta': {
    cardSrc: '/assets/hamburguesa-mixta.jpg',
    detailSrc: '/assets/hamburguesa-mixta.jpg',
  },
  'tortas-porcion-amapola': {
    cardSrc: '/assets/torta-amapola.png',
    detailSrc: '/assets/torta-amapola.png',
  },
  'tortas-porcion-astromelia': {
    cardSrc: '/assets/torta-astromelia.png',
    detailSrc: '/assets/torta-astromelia.png',
  },
  'tortas-porcion-cataleya': {
    cardSrc: '/assets/torta-cataleya.png',
    detailSrc: '/assets/torta-cataleya.png',
  },
  'tortas-porcion-chocolata': {
    cardSrc: '/assets/torta-chocolata.png',
    detailSrc: '/assets/torta-chocolata.png',
  },
  'tortas-porcion-hortensia': {
    cardSrc: '/assets/torta-hortencia.png',
    detailSrc: '/assets/torta-hortencia.png',
  },
  'tortas-porcion-lirio': {
    cardSrc: '/assets/torta-lirio.png',
    detailSrc: '/assets/torta-lirio.png',
  },
  'tortas-porcion-margarita': {
    cardSrc: '/assets/torta-margarita.png',
    detailSrc: '/assets/torta-margarita.png',
  },
  'tortas-porcion-camelia': {
    cardSrc: '/assets/torta-camelia.png',
    detailSrc: '/assets/torta-camelia.png',
  },
  'tortas-porcion-torta-de-pan-de-quinoa-completa': {
    cardSrc: '/assets/torta-pan-quinoa-completa.png',
    detailSrc: '/assets/torta-pan-quinoa-completa.png',
  },
  'tortas-porcion-torta-de-pan-de-quinoa-porcion': {
    cardSrc: '/assets/torta-pan-quinoa-porcion.png',
    detailSrc: '/assets/torta-pan-quinoa-porcion.png',
  },
  'helados-helado-con-galleta-de-almendra': {
    cardSrc: '/assets/helado-galleta-almendra.jpg',
    detailSrc: '/assets/helado-galleta-almendra.jpg',
  },
  'desayunos-brunch-arepas-maiz-carne-mechada-y-mix-de-quesos': {
    cardSrc: '/assets/arepa-maiz-carne-queso.jpg',
    detailSrc: '/assets/arepa-maiz-carne-queso.jpg',
  },
  'desayunos-brunch-arepas-maiz-pollo-cremoso': {
    cardSrc: '/assets/arepa-maiz-pollo-cremoso.jpg',
    detailSrc: '/assets/arepa-maiz-pollo-cremoso.jpg',
  },
  'desayunos-brunch-arepas-almendras-carne-mechada-y-mix-de-quesos': {
    cardSrc: '/assets/arepa-almendras-carne-queso.jpg',
    detailSrc: '/assets/arepa-almendras-carne-queso.jpg',
  },
  'desayunos-brunch-arepas-almendras-pollo-cremoso': {
    cardSrc: '/assets/arepa-almendras-pollo-cremoso.jpg',
    detailSrc: '/assets/arepa-almendras-pollo-cremoso.jpg',
  },
  'desayunos-brunch-waffles-waffle-de-queso': {
    cardSrc: '/assets/waffle-queso.jpg',
    detailSrc: '/assets/waffle-queso.jpg',
  },
  'desayunos-brunch-waffles-waffles-huevos-cremosos': {
    cardSrc: '/assets/waffle-huevos-cremosos.jpg',
    detailSrc: '/assets/waffle-huevos-cremosos.jpg',
  },
  'desayunos-brunch-waffles-waffles-con-frutas-y-helado': {
    cardSrc: '/assets/waffles-frutas-helado.jpg',
    detailSrc: '/assets/waffles-frutas-helado.jpg',
  },
  'desayunos-brunch-waffles-waffles-con-frutas-y-yogur-griego': {
    cardSrc: '/assets/waffles-frutas-yogur-griego.jpg',
    detailSrc: '/assets/waffles-frutas-yogur-griego.jpg',
  },
}

const getProductImages = (product: Product) => {
  const override = productImageOverrides[product.id]
  return {
    cardSrc: override?.cardSrc ?? product.imageSrc ?? null,
    detailSrc: override?.detailSrc ?? product.imageSrc ?? null,
  }
}

const normalizeWhatsAppPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) return `57${digits}`
  return digits
}

const createWhatsAppHref = (phone: string, message: string) =>
  `https://wa.me/${normalizeWhatsAppPhone(phone)}?text=${encodeURIComponent(
    message,
  )}`

const menuRoutePath = '/menú'
const menuRouteAlias = '/menu'
const productClicksStorageKey = 'sandeli-product-clicks-v1'

const normalizePathname = (pathname: string) => {
  try {
    return decodeURIComponent(pathname).toLowerCase().replace(/\/+$/, '') || '/'
  } catch {
    return pathname.toLowerCase().replace(/\/+$/, '') || '/'
  }
}

const isMenuRoute = (pathname: string) => {
  const normalized = normalizePathname(pathname)
  return normalized === menuRoutePath || normalized === menuRouteAlias
}

const startsInMenuRoute = () =>
  typeof window !== 'undefined' && isMenuRoute(window.location.pathname)

type WhatsAppLogoProps = {
  size?: number
  className?: string
}

function WhatsAppLogo({ size = 18, className }: WhatsAppLogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.14 6.44 2.14 11.9c0 1.74.45 3.44 1.31 4.95L2 22l5.29-1.39a9.86 9.86 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.44 9.9-9.9a9.85 9.85 0 0 0-2.9-7.01ZM12.05 20.2h-.01a8.28 8.28 0 0 1-4.21-1.15l-.3-.18-3.14.82.84-3.06-.2-.32a8.28 8.28 0 0 1-1.27-4.4c0-4.57 3.72-8.29 8.3-8.29 2.22 0 4.3.86 5.87 2.43a8.24 8.24 0 0 1 2.42 5.87c0 4.57-3.72 8.29-8.3 8.29Zm4.55-6.19c-.25-.13-1.48-.73-1.71-.81-.23-.08-.4-.13-.57.13-.17.25-.65.81-.8.97-.15.17-.3.19-.55.06-.25-.13-1.07-.39-2.03-1.25-.75-.67-1.25-1.5-1.4-1.75-.15-.25-.02-.38.11-.51.11-.11.25-.3.38-.45.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.57-1.37-.78-1.88-.21-.5-.43-.43-.57-.44h-.49c-.17 0-.45.06-.69.32-.23.25-.9.88-.9 2.14 0 1.25.92 2.47 1.05 2.64.13.17 1.8 2.75 4.35 3.85.61.26 1.08.42 1.45.54.61.19 1.17.16 1.61.1.49-.07 1.48-.6 1.69-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.29Z"
      />
    </svg>
  )
}

function App() {
  const [isEntryOpen, setIsEntryOpen] = useState(() => !startsInMenuRoute())
  const [isMenuPickerOpen, setIsMenuPickerOpen] = useState(() =>
    startsInMenuRoute(),
  )
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [menuCategories, setMenuCategories] = useState<Category[]>(fallbackMenuCategories)
  const [activeCategoryId, setActiveCategoryId] = useState(
    fallbackMenuCategories[0]?.id || '',
  )
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const [productClickCounts, setProductClickCounts] = useState<
    Record<string, number>
  >(() => {
    if (typeof window === 'undefined') return {}
    try {
      const stored = window.localStorage.getItem(productClicksStorageKey)
      if (!stored) return {}
      const parsed = JSON.parse(stored)
      if (!parsed || typeof parsed !== 'object') return {}

      return Object.entries(parsed).reduce<Record<string, number>>(
        (accumulator, [productId, count]) => {
          if (typeof count === 'number' && Number.isFinite(count) && count >= 0) {
            accumulator[productId] = count
          }
          return accumulator
        },
        {},
      )
    } catch {
      return {}
    }
  })
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const categoryLookup = useMemo(
    () => new Map(menuCategories.map((category) => [category.id, category])),
    [menuCategories],
  )
  const productLookup = useMemo(
    () =>
      new Map(
        menuCategories.flatMap((category) =>
          category.products.map((product) => [
            product.id,
            {
              category,
              product,
            },
          ]),
        ),
      ),
    [menuCategories],
  )

  const activeCategory = categoryLookup.get(activeCategoryId) ?? menuCategories[0]
  const selectedProductEntry = selectedProductId
    ? productLookup.get(selectedProductId) ?? null
    : null
  const selectedProductImages = selectedProductEntry
    ? getProductImages(selectedProductEntry.product)
    : null
  const rootProducts = activeCategory?.products.filter((product) => !product.sectionId) ?? []
  const activeCategorySections =
    activeCategory?.sections && activeCategory.sections.length > 0
      ? [
          ...(rootProducts.length > 0
            ? [
                {
                  id: `${activeCategory.id}-root`,
                  title: activeCategory.title,
                  products: rootProducts,
                },
              ]
            : []),
          ...activeCategory.sections,
        ]
      : activeCategory
        ? [
            {
              id: `${activeCategory.id}-default`,
              title: activeCategory.title,
              products: activeCategory.products,
            },
          ]
        : []
  const activeCategoryBannerUrl = resolveCategoryBannerUrl(activeCategory)
  const leadSectionTitle = activeCategorySections[0]?.title ?? activeCategory?.title ?? 'Menu'

  const featuredProduct = useMemo(() => {
    if (!activeCategory) return null
    const [firstProduct] = activeCategory.products
    if (!firstProduct) return null

    let winner = firstProduct
    let winnerClicks = productClickCounts[firstProduct.id] ?? 0

    for (const product of activeCategory.products.slice(1)) {
      const clicks = productClickCounts[product.id] ?? 0
      if (clicks > winnerClicks) {
        winner = product
        winnerClicks = clicks
      }
    }

    return {
      product: winner,
      clicks: winnerClicks,
    }
  }, [activeCategory, productClickCounts])
  const featuredProductImages = featuredProduct
    ? getProductImages(featuredProduct.product)
    : null

  const focusCategory = (categoryId: string) => {
    const nextCategory = categoryLookup.get(categoryId) ?? menuCategories[0]
    setActiveCategoryId(nextCategory.id)
  }

  const openMenu = (categoryId = activeCategory.id) => {
    focusCategory(categoryId)
    setSelectedProductId(null)
    setIsMenuPickerOpen(false)
    setIsMenuOpen(true)
  }

  const backToMenuPicker = () => {
    setSelectedProductId(null)
    setIsMenuOpen(false)
    setIsMenuPickerOpen(true)
  }
  const openMenuPicker = () => {
    setIsEntryOpen(false)
    setIsMenuOpen(false)
    setIsMenuPickerOpen(true)
  }
  const closeMenuPicker = () => {
    setSelectedProductId(null)
    setIsMenuPickerOpen(false)
    setIsEntryOpen(true)
  }

  const pushMenuRoute = () => {
    if (typeof window === 'undefined') return
    if (isMenuRoute(window.location.pathname)) return
    window.history.pushState(null, '', menuRoutePath)
  }

  const handleMenuAccess = () => {
    openMenuPicker()
    pushMenuRoute()
  }

  const handleMenuCategoryPick = (categoryId: string) => {
    openMenu(categoryId)
  }

  const handleFindUsAccess = () => {
    setIsEntryOpen(false)
  }

  const handleWhatsAppAccess = () => {
    if (typeof window === 'undefined') return
    window.location.assign(
      createWhatsAppHref(businessInfo.whatsappPhone, businessInfo.whatsappMessage),
    )
  }

  const handleReviewAccess = () => {
    if (typeof window === 'undefined') return
    window.location.assign(googleReviewUrl)
  }

  const openProductDetail = (productId: string) => {
    setSelectedProductId(productId)
    setProductClickCounts((current) => ({
      ...current,
      [productId]: (current[productId] ?? 0) + 1,
    }))
  }
  const closeProductDetail = () => setSelectedProductId(null)

  const shareProduct = async (category: Category, product: Product) => {
    const shareUrl = new URL(window.location.origin + window.location.pathname)
    shareUrl.hash = product.id

    const shareData = {
      title: `${product.name} | Sandeli`,
      text: `${product.name} en ${category.title} por ${product.price}.`,
      url: shareUrl.toString(),
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
        setToastMessage('Producto compartido con exito.')
        return
      }

      await navigator.clipboard.writeText(shareData.url)
      setToastMessage('Enlace copiado para compartir.')
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return

      try {
        await navigator.clipboard.writeText(shareData.url)
        setToastMessage('Enlace copiado para compartir.')
      } catch {
        setToastMessage('No fue posible compartir en este momento.')
      }
    }
  }

  useEffect(() => {
    let cancelled = false

    loadRemoteMenuCategories().then((remoteCategories) => {
      if (cancelled || !remoteCategories?.length) return
      setMenuCategories(remoteCategories)
      setActiveCategoryId((current) =>
        remoteCategories.some((category) => category.id === current)
          ? current
          : remoteCategories[0].id,
      )
    })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!toastMessage) return undefined
    const timeoutId = window.setTimeout(() => setToastMessage(null), 2300)
    return () => window.clearTimeout(timeoutId)
  }, [toastMessage])

  useEffect(() => {
    try {
      window.localStorage.setItem(
        productClicksStorageKey,
        JSON.stringify(productClickCounts),
      )
    } catch {
      // Ignore storage write failures in private mode or restricted contexts.
    }
  }, [productClickCounts])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    if (isMenuOpen || isMenuPickerOpen || Boolean(selectedProductEntry)) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isMenuOpen, isMenuPickerOpen, selectedProductEntry])

  useEffect(() => {
    if (!isMenuOpen && !isMenuPickerOpen && !selectedProductEntry) return undefined

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      if (selectedProductEntry) {
        closeProductDetail()
        return
      }
      if (isMenuOpen) backToMenuPicker()
      if (isMenuPickerOpen) closeMenuPicker()
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isMenuOpen, isMenuPickerOpen, selectedProductEntry])

  useEffect(() => {
    const hash = window.location.hash.replace('#', '').trim()
    if (!hash) return

    const productMatch = productLookup.get(hash)
    if (productMatch) {
      setActiveCategoryId(productMatch.category.id)
      setIsMenuOpen(true)
      setIsMenuPickerOpen(false)
      setSelectedProductId(productMatch.product.id)
    }
  }, [productLookup])

  useEffect(() => {
    const handlePopState = () => {
      if (isMenuRoute(window.location.pathname)) {
        setIsEntryOpen(false)
        setSelectedProductId(null)
        setIsMenuOpen(false)
        setIsMenuPickerOpen(true)
        return
      }

      setSelectedProductId(null)
      setIsMenuOpen(false)
      setIsMenuPickerOpen(false)
      setIsEntryOpen(true)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  return (
    <>
      <div className={`app-bg ${isEntryOpen ? 'is-entry' : ''}`} />
      <div className={`phone-shell ${isEntryOpen ? 'is-entry' : ''}`}>
        {isEntryOpen ? (
          <section className="entry-screen">
            <div className="entry-core">
              <img src="/assets/logo.png" alt="Logo principal de Sandeli" />
              <div className="entry-grid" aria-label="Accesos iniciales">
                <button
                  type="button"
                  className="entry-tile"
                  onClick={handleMenuAccess}
                >
                  <span className="entry-tile-inner">
                    <UtensilsCrossed size={18} />
                    Menú
                  </span>
                </button>
                <button
                  type="button"
                  className="entry-tile"
                  onClick={handleWhatsAppAccess}
                >
                  <span className="entry-tile-inner">
                    <WhatsAppLogo size={18} />
                    WhatsApp
                  </span>
                </button>
                <button
                  type="button"
                  className="entry-tile"
                  onClick={handleFindUsAccess}
                >
                  <span className="entry-tile-inner">
                    <MapPin size={18} />
                    Encuéntranos
                  </span>
                </button>
                <button
                  type="button"
                  className="entry-tile"
                  onClick={handleReviewAccess}
                >
                  <span className="entry-tile-inner">
                    <Star size={18} />
                    Danos tu opinión
                  </span>
                </button>
              </div>
            </div>
            <p className="entry-privacy">Preferencias cookies y privacidad de datos</p>
          </section>
        ) : (
          <section className="section-shell">
            <header className="section-top no-logo">
              <button
                type="button"
                className="section-back"
                onClick={() => setIsEntryOpen(true)}
              >
                <ArrowLeft size={16} />
                Inicio
              </button>
            </header>

            <main className="screen screen-section">
              <section className="view-panel">
                <header className="panel-head">
                  <span className="panel-kicker">Encuentranos</span>
                  <h2>Visitanos en Cucuta</h2>
                </header>

                <article className="map-frame map-frame-large">
                  <iframe
                    title="Ubicacion de Sandeli en Google Maps"
                    src={businessInfo.mapEmbedUrl}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <a
                    className="text-link map-card-link"
                    href={businessInfo.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Ver ficha del local
                    <ArrowUpRight size={15} />
                  </a>
                </article>

                <article className="info-card">
                  <div className="info-head">
                    <MapPinned size={16} />
                    Direccion
                  </div>
                  <p>{businessInfo.address}</p>
                  <a
                    className="text-link"
                    href={businessInfo.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Abrir en Google Maps
                    <ArrowUpRight size={15} />
                  </a>
                </article>

                <article className="info-card">
                  <div className="info-head">
                    <WhatsAppLogo size={16} />
                    WhatsApp
                  </div>
                  <a
                    className="cta-soft find-us-whatsapp"
                    href={createWhatsAppHref(
                      businessInfo.whatsappPhone,
                      businessInfo.whatsappMessage,
                    )}
                  >
                    <WhatsAppLogo size={17} className="wa-pill-icon" />
                    Ir a WhatsApp
                    <ArrowUpRight size={16} />
                  </a>
                </article>

                <article className="info-card">
                  <div className="info-head">
                    <Clock3 size={16} />
                    Horarios
                  </div>
                  <ul className="hours-list">
                    {businessInfo.hours.map((entry) => (
                      <li key={entry.day}>
                        <span>{entry.day}</span>
                        <strong>{entry.time}</strong>
                      </li>
                    ))}
                  </ul>
                </article>
              </section>
            </main>
          </section>
        )}
      </div>

      {isMenuPickerOpen ? (
        <div className="menu-choice-backdrop" onClick={closeMenuPicker}>
          <section
            className="menu-choice-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="menu-choice-close"
              onClick={closeMenuPicker}
              aria-label="Cerrar selector de categorias"
            >
              <X size={20} />
            </button>

            <img
              className="menu-choice-logo"
              src="/assets/logo.png"
              alt="Logo principal de Sandeli"
            />

            <div className="menu-choice-list">
              {menuCategories.map((category) => {
                const CategoryIcon =
                  menuCategoryIcons[category.iconKey || 'utensils'] || UtensilsCrossed
                return (
                  <button
                    key={category.id}
                    type="button"
                    className="menu-choice-pill"
                    onClick={() => handleMenuCategoryPick(category.id)}
                  >
                    <span className="menu-choice-pill-icon" aria-hidden="true">
                      <CategoryIcon size={20} />
                    </span>
                    <span className="menu-choice-pill-label">{category.title}</span>
                  </button>
                )
              })}
            </div>
          </section>
        </div>
      ) : null}

      {isMenuOpen ? (
        <div className="menu-backdrop" onClick={backToMenuPicker}>
          <section
            className="menu-sheet menu-sheet-catalog"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="catalog-head">
              <button
                type="button"
                className="catalog-back"
                onClick={backToMenuPicker}
                aria-label="Volver a categorias"
              >
                <ArrowLeft size={16} />
                Categorias
              </button>
            </header>

            <section className="catalog-hero">
              <div
                className={`catalog-banner-placeholder ${
                  activeCategoryBannerUrl ? 'has-image' : ''
                }`}
                role="img"
                aria-label={activeCategory ? `Banner de ${activeCategory.title}` : 'Banner de categoria'}
              >
                {activeCategoryBannerUrl ? (
                  <img src={activeCategoryBannerUrl} alt={`Banner de ${activeCategory.title}`} />
                ) : (
                  <>
                    <img src="/assets/logo.png" alt="" aria-hidden="true" />
                    <span>Banner de categoria</span>
                  </>
                )}
              </div>

              <div className="catalog-title-pill">{leadSectionTitle}</div>
            </section>

            {featuredProduct ? (
              <article className="catalog-featured">
                <span className="catalog-featured-tag">Producto destacado</span>
                <button
                  type="button"
                  className="catalog-featured-content"
                  onClick={() => openProductDetail(featuredProduct.product.id)}
                >
                  <div
                    className={`catalog-featured-media ${
                      featuredProductImages?.cardSrc ? 'has-image' : ''
                    }`}
                  >
                    {featuredProductImages?.cardSrc ? (
                      <img
                        src={featuredProductImages.cardSrc}
                        alt={`Imagen de ${featuredProduct.product.name}`}
                        loading="lazy"
                      />
                    ) : (
                      <span>Imagen destacada</span>
                    )}
                  </div>
                  <div className="catalog-featured-copy">
                    <h3>{featuredProduct.product.name}</h3>
                    <p>{featuredProduct.product.description}</p>
                    <div className="catalog-featured-meta">
                      <strong>{featuredProduct.product.price}</strong>
                    </div>
                  </div>
                </button>
              </article>
            ) : null}

            {activeCategorySections.map((section, sectionIndex) => (
              <section
                key={section.id}
                className={`catalog-section ${
                  sectionIndex === 0 ? 'is-first' : 'has-divider'
                }`}
              >
                {sectionIndex === 0 ? null : (
                  <div className="catalog-title-pill catalog-subtitle-pill">
                    {section.title}
                  </div>
                )}

                <div className="catalog-grid">
                  {section.products.map((product) => {
                    const productImages = getProductImages(product)

                    return (
                      <article key={product.id} className="catalog-product-card">
                        <button
                          type="button"
                          className="catalog-product-toggle"
                          onClick={() => openProductDetail(product.id)}
                        >
                          <div
                            className={`catalog-product-media ${
                              productImages.cardSrc ? 'has-image' : ''
                            }`}
                          >
                            {productImages.cardSrc ? (
                              <img
                                src={productImages.cardSrc}
                                alt={`Imagen de ${product.name}`}
                                loading="lazy"
                              />
                            ) : (
                              <span>Imagen del producto</span>
                            )}
                          </div>

                          <div className="catalog-product-body">
                            <h4>{product.name}</h4>
                            <p>{product.description}</p>

                            <div className="catalog-product-price-row">
                              <strong>{product.price}</strong>
                              <span>Ver detalle</span>
                            </div>
                          </div>
                        </button>

                        <button
                          type="button"
                          className="share-btn catalog-share-btn"
                          onClick={() => shareProduct(activeCategory, product)}
                        >
                          <Share2 size={15} />
                          Compartir
                        </button>
                      </article>
                    )
                  })}
                </div>
              </section>
            ))}
          </section>
        </div>
      ) : null}

      {selectedProductEntry ? (
        <div className="product-view-backdrop" onClick={closeProductDetail}>
          <section
            className="product-view-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="product-view-close"
              onClick={closeProductDetail}
              aria-label="Cerrar detalle del producto"
            >
              <X size={20} />
            </button>

            <div
              className={`product-view-media ${
                selectedProductImages?.detailSrc ? 'has-image' : ''
              }`}
            >
              {selectedProductImages?.detailSrc ? (
                <img
                  src={selectedProductImages.detailSrc}
                  alt={`Imagen ampliada de ${selectedProductEntry.product.name}`}
                />
              ) : (
                <>
                  <img src="/assets/logo.png" alt="" />
                  <span>Imagen ampliada del producto</span>
                </>
              )}
            </div>

            <div className="product-view-content">
              <span className="product-view-category">
                {selectedProductEntry.category.title}
              </span>
              <h3>{selectedProductEntry.product.name}</h3>
              <p>{selectedProductEntry.product.description}</p>

              {selectedProductEntry.product.details.length > 0 ? (
                <ul>
                  {selectedProductEntry.product.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              ) : null}

              <div className="product-view-footer">
                <strong>{selectedProductEntry.product.price}</strong>
                <button
                  type="button"
                  className="share-btn"
                  onClick={() =>
                    shareProduct(
                      selectedProductEntry.category,
                      selectedProductEntry.product,
                    )
                  }
                >
                  <Share2 size={15} />
                  Compartir
                </button>
              </div>
            </div>
          </section>
        </div>
      ) : null}

      {toastMessage ? (
        <div className="toast" role="status" aria-live="polite">
          {toastMessage}
        </div>
      ) : null}
    </>
  )
}

export default App
