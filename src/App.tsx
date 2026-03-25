import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  CakeSlice,
  CalendarClock,
  Clock3,
  Croissant,
  CupSoda,
  Candy,
  IceCreamCone,
  MapPin,
  MapPinned,
  Phone,
  Share2,
  Sparkles,
  Star,
  Sunrise,
  UtensilsCrossed,
  X,
  type LucideIcon,
} from 'lucide-react'
import './App.css'
import {
  businessInfo,
  feedbackOptions,
  feedbackTags,
  menuCategories,
  type Category,
  type Product,
} from './data/menuData'

type AppView = 'feedback' | 'find-us' | 'whatsapp'
type EntryTarget = 'menu' | AppView

const categoryLookup = new Map(
  menuCategories.map((category) => [category.id, category]),
)

const menuCategoryIcons: Record<Category['id'], LucideIcon> = {
  desayunos: Sunrise,
  brunch: Croissant,
  helados: IceCreamCone,
  postres: Candy,
  'tortas-porcion': CakeSlice,
  bebidas: CupSoda,
  recomendados: BadgeCheck,
  temporada: CalendarClock,
}

const productLookup = new Map(
  menuCategories.flatMap((category) =>
    category.products.map((product) => [
      product.id,
      {
        category,
        product,
      },
    ]),
  ),
)

const createWhatsAppHref = (phone: string, message: string) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

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
  const [activeView, setActiveView] = useState<AppView>('feedback')
  const [isMenuPickerOpen, setIsMenuPickerOpen] = useState(() =>
    startsInMenuRoute(),
  )
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeCategoryId, setActiveCategoryId] = useState(menuCategories[0].id)
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
  const [selectedFeedbackId, setSelectedFeedbackId] = useState<string | null>(
    null,
  )
  const [selectedRating, setSelectedRating] = useState(0)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const activeCategory = categoryLookup.get(activeCategoryId) ?? menuCategories[0]
  const selectedProductEntry = selectedProductId
    ? productLookup.get(selectedProductId) ?? null
    : null
  const selectedFeedback =
    feedbackOptions.find((option) => option.id === selectedFeedbackId) ?? null
  const whatsappReady = Boolean(businessInfo.whatsappPhone)

  const featuredProduct = useMemo(() => {
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

  const ratingLabel = useMemo(() => {
    if (selectedRating <= 1) return 'Basico'
    if (selectedRating === 2) return 'Aceptable'
    if (selectedRating === 3) return 'Bueno'
    if (selectedRating === 4) return 'Muy bueno'
    if (selectedRating === 5) return 'Excelente'
    return 'Sin calificacion'
  }, [selectedRating])

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

  const openProductDetail = (productId: string) => {
    setSelectedProductId(productId)
    setProductClickCounts((current) => ({
      ...current,
      [productId]: (current[productId] ?? 0) + 1,
    }))
  }
  const closeProductDetail = () => setSelectedProductId(null)

  const handleEntrySelect = (target: EntryTarget) => {
    if (target === 'menu') {
      handleMenuAccess()
      return
    }

    setIsEntryOpen(false)
    setActiveView(target)
  }

  const toggleFeedbackTag = (tag: string) => {
    setSelectedTags((current) =>
      current.includes(tag)
        ? current.filter((item) => item !== tag)
        : [...current, tag],
    )
  }

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
      focusCategory(productMatch.category.id)
      setIsMenuOpen(true)
      setIsMenuPickerOpen(false)
      setSelectedProductId(productMatch.product.id)
    }
  }, [])

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
                  onClick={() => handleEntrySelect('menu')}
                >
                  <span className="entry-tile-inner">
                    <UtensilsCrossed size={18} />
                    Menú
                  </span>
                </button>
                <button
                  type="button"
                  className="entry-tile"
                  onClick={() => handleEntrySelect('whatsapp')}
                >
                  <span className="entry-tile-inner">
                    <WhatsAppLogo size={18} />
                    WhatsApp
                  </span>
                </button>
                <button
                  type="button"
                  className="entry-tile"
                  onClick={() => handleEntrySelect('find-us')}
                >
                  <span className="entry-tile-inner">
                    <MapPin size={18} />
                    Encuéntranos
                  </span>
                </button>
                <button
                  type="button"
                  className="entry-tile"
                  onClick={() => handleEntrySelect('feedback')}
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
            <header className="section-top">
              <button
                type="button"
                className="section-back"
                onClick={() => setIsEntryOpen(true)}
              >
                <ArrowLeft size={16} />
                Inicio
              </button>

              <img
                className="section-logo"
                src="/assets/logoIOS.png"
                alt=""
                aria-hidden="true"
              />
            </header>

            <main className="screen screen-section">
              {activeView === 'feedback' ? (
                <section className="view-panel">
                  <header className="panel-head">
                    <span className="panel-kicker">Danos tu opinion</span>
                    <h2>Como te fue hoy?</h2>
                    <p>Solo seleccion, sin texto libre.</p>
                  </header>

                  <div className="rating-row">
                    {[1, 2, 3, 4, 5].map((score) => (
                      <button
                        key={score}
                        type="button"
                        className={`star-btn ${
                          selectedRating >= score ? 'is-on' : ''
                        }`}
                        onClick={() => setSelectedRating(score)}
                        aria-label={`${score} estrellas`}
                      >
                        <Star
                          size={20}
                          strokeWidth={1.7}
                          fill={selectedRating >= score ? 'currentColor' : 'none'}
                        />
                      </button>
                    ))}
                    <span className="rating-tag">{ratingLabel}</span>
                  </div>

                  <div className="tag-grid">
                    {feedbackTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        className={`choice-chip ${
                          selectedTags.includes(tag) ? 'is-selected' : ''
                        }`}
                        onClick={() => toggleFeedbackTag(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>

                  <div className="feedback-options">
                    {feedbackOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        className={`feedback-tile ${
                          selectedFeedbackId === option.id ? 'is-selected' : ''
                        }`}
                        onClick={() => setSelectedFeedbackId(option.id)}
                      >
                        <strong>{option.label}</strong>
                        <p>{option.note}</p>
                      </button>
                    ))}
                  </div>

                  <div className="status-note">
                    <Sparkles size={16} />
                    <p>
                      {selectedFeedback
                        ? `Registro: ${selectedFeedback.label}.`
                        : 'Selecciona una opcion para registrar la satisfaccion.'}
                    </p>
                  </div>
                </section>
              ) : null}

              {activeView === 'find-us' ? (
                <section className="view-panel">
                  <header className="panel-head">
                    <span className="panel-kicker">Encuentranos</span>
                    <h2>Visitanos en Cucuta</h2>
                  </header>

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
                      <Phone size={16} />
                      Telefono
                    </div>
                    <p>{businessInfo.phoneDisplay}</p>
                    <a className="text-link" href={businessInfo.phoneHref}>
                      Llamar ahora
                      <ArrowUpRight size={15} />
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

                  <article className="map-frame">
                    <iframe
                      title="Ubicacion de Sandeli en Google Maps"
                      src={businessInfo.mapEmbedUrl}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </article>
                </section>
              ) : null}

              {activeView === 'whatsapp' ? (
                <section className="view-panel">
                  <header className="panel-head">
                    <span className="panel-kicker">WhatsApp</span>
                    <h2>Canal de atencion</h2>
                    <p>Variable lista para activar numero oficial.</p>
                  </header>

                  <article className="wa-card">
                    <span className="wa-state">
                      {whatsappReady ? 'Activo' : 'Pendiente de numero'}
                    </span>
                    <h3>Habla directo con Sandeli</h3>
                    <p>
                      {whatsappReady
                        ? 'Abre el chat con mensaje inicial listo para enviar.'
                        : 'Comparte el numero y se activa de inmediato.'}
                    </p>

                    {whatsappReady ? (
                      <a
                        className="cta-main"
                        href={createWhatsAppHref(
                          businessInfo.whatsappPhone,
                          businessInfo.whatsappMessage,
                        )}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Abrir WhatsApp
                        <ArrowUpRight size={16} />
                      </a>
                    ) : (
                      <button type="button" className="cta-soft is-disabled">
                        Esperando numero de WhatsApp
                      </button>
                    )}
                  </article>
                </section>
              ) : null}
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
                const CategoryIcon = menuCategoryIcons[category.id]

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
                className="catalog-banner-placeholder"
                role="img"
                aria-label={`Placeholder de banner para ${activeCategory.title}`}
              >
                <img src="/assets/logo.png" alt="" aria-hidden="true" />
                <span>Placeholder banner de categoria</span>
              </div>

              <div className="catalog-title-pill">{activeCategory.title}</div>
            </section>

            {featuredProduct ? (
              <article className="catalog-featured">
                <span className="catalog-featured-tag">Producto destacado</span>
                <button
                  type="button"
                  className="catalog-featured-content"
                  onClick={() => openProductDetail(featuredProduct.product.id)}
                >
                  <div className="catalog-featured-media" aria-hidden="true">
                    <span>Imagen destacada</span>
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

            <div className="catalog-grid">
              {activeCategory.products.map((product) => (
                <article key={product.id} className="catalog-product-card">
                  <button
                    type="button"
                    className="catalog-product-toggle"
                    onClick={() => openProductDetail(product.id)}
                  >
                    <div className="catalog-product-media" aria-hidden="true">
                      <span>Imagen del producto</span>
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
              ))}
            </div>
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

            <div className="product-view-media" aria-hidden="true">
              <img src="/assets/logo.png" alt="" />
              <span>Imagen ampliada del producto</span>
            </div>

            <div className="product-view-content">
              <span className="product-view-category">
                {selectedProductEntry.category.title}
              </span>
              <h3>{selectedProductEntry.product.name}</h3>
              <p>{selectedProductEntry.product.description}</p>

              <ul>
                {selectedProductEntry.product.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>

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
