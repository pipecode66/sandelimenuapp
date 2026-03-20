import { useEffect, useState, type CSSProperties } from 'react'
import {
  ArrowUpRight,
  ChevronDown,
  Clock3,
  MapPinned,
  MenuSquare,
  MessageCircleHeart,
  MessageCircleMore,
  Phone,
  Share2,
  Sparkles,
  Star,
  X,
} from 'lucide-react'
import './App.css'
import {
  businessInfo,
  feedbackOptions,
  menuCategories,
  type Category,
  type Product,
} from './data/menuData'

const categoryLookup = new Map(
  menuCategories.map((category) => [category.id, category]),
)

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

const totalProducts = menuCategories.reduce(
  (count, category) => count + category.products.length,
  0,
)

const createWhatsAppHref = (phone: string, message: string) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeCategoryId, setActiveCategoryId] = useState(menuCategories[0].id)
  const [expandedProductId, setExpandedProductId] = useState<string | null>(
    menuCategories[0].products[0]?.id ?? null,
  )
  const [selectedFeedbackId, setSelectedFeedbackId] = useState<string | null>(
    null,
  )
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const activeCategory = categoryLookup.get(activeCategoryId) ?? menuCategories[0]
  const selectedFeedback =
    feedbackOptions.find((option) => option.id === selectedFeedbackId) ?? null
  const whatsappReady = Boolean(businessInfo.whatsappPhone)

  const focusCategory = (categoryId: string, productId?: string | null) => {
    const nextCategory = categoryLookup.get(categoryId) ?? menuCategories[0]
    setActiveCategoryId(nextCategory.id)
    setExpandedProductId(productId ?? nextCategory.products[0]?.id ?? null)
  }

  const openMenu = (categoryId = activeCategory.id, productId?: string) => {
    focusCategory(categoryId, productId)
    setIsMenuOpen(true)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleCategorySelect = (categoryId: string) => {
    const currentMatch = expandedProductId
      ? productLookup.get(expandedProductId)
      : undefined
    const keepExpanded =
      currentMatch?.category.id === categoryId ? currentMatch.product.id : null

    focusCategory(categoryId, keepExpanded)
  }

  const handleProductToggle = (productId: string) => {
    setExpandedProductId((current) => (current === productId ? null : productId))
  }

  const scrollToSection = (sectionId: string) => {
    document
      .getElementById(sectionId)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleWhatsAppAccess = () => {
    if (whatsappReady) {
      window.open(
        createWhatsAppHref(
          businessInfo.whatsappPhone,
          businessInfo.whatsappMessage,
        ),
        '_blank',
        'noopener,noreferrer',
      )
      return
    }

    scrollToSection('whatsapp')
  }

  const shareProduct = async (category: Category, product: Product) => {
    const shareUrl = new URL(window.location.origin + window.location.pathname)
    shareUrl.hash = product.id

    const shareData = {
      title: `${product.name} | Sandelí`,
      text: `${product.name} en ${category.title} por ${product.price}.`,
      url: shareUrl.toString(),
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
        setToastMessage('Producto listo para compartir.')
        return
      }

      await navigator.clipboard.writeText(shareData.url)
      setToastMessage('Enlace copiado para compartir.')
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return
      }

      try {
        await navigator.clipboard.writeText(shareData.url)
        setToastMessage('Enlace copiado para compartir.')
      } catch {
        setToastMessage('No fue posible compartir en este momento.')
      }
    }
  }

  useEffect(() => {
    if (!toastMessage) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      setToastMessage(null)
    }, 2400)

    return () => window.clearTimeout(timeoutId)
  }, [toastMessage])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isMenuOpen])

  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.replace('#', '').trim()

      if (!hash) {
        return
      }

      const productMatch = productLookup.get(hash)
      if (productMatch) {
        focusCategory(productMatch.category.id, productMatch.product.id)
        setIsMenuOpen(true)
        return
      }

      if (categoryLookup.has(hash)) {
        focusCategory(hash)
        setIsMenuOpen(true)
      }
    }

    syncHash()
    window.addEventListener('hashchange', syncHash)

    return () => window.removeEventListener('hashchange', syncHash)
  }, [])

  return (
    <>
      <div className="app-shell">
        <div className="ambient-shape ambient-shape-top" aria-hidden="true" />
        <div className="ambient-shape ambient-shape-bottom" aria-hidden="true" />

        <main className="main-content">
          <header className="hero-panel">
            <div className="hero-copy">
              <span className="hero-kicker">
                <Star size={14} />
                Repostería & brunch saludable
              </span>

              <img
                className="hero-logo"
                src="/logo.png"
                alt="Logo de Sandelí, sano y delicioso"
              />

              <p className="hero-description">
                Una experiencia móvil pensada para abrir, antojarse y elegir con
                calma. Sandelí combina cocina saludable, postres delicados y un
                look editorial que se siente fresco desde el primer toque.
              </p>

              <div className="hero-highlights" aria-label="Categorias destacadas">
                {menuCategories.slice(0, 4).map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    className="hero-highlight-pill"
                    onClick={() => openMenu(category.id)}
                  >
                    {category.title}
                  </button>
                ))}
              </div>

              <div className="hero-actions">
                <button
                  type="button"
                  className="primary-action"
                  onClick={() => openMenu()}
                >
                  Ver menú
                  <ArrowUpRight size={18} />
                </button>

                <button
                  type="button"
                  className="secondary-action"
                  onClick={() => scrollToSection('find-us')}
                >
                  Encuéntranos
                </button>
              </div>
            </div>

            <aside className="hero-sidecard">
              <div className="hero-mini-logo-wrap">
                <img
                  className="hero-mini-logo"
                  src="/logo-ios.png"
                  alt=""
                  aria-hidden="true"
                />
              </div>

              <p className="sidecard-kicker">App web instalable</p>
              <h2>Menú rápido y visual para clientes móviles</h2>
              <p>
                Ocho categorías, {totalProducts} productos base, acceso directo
                a contacto y una integración de WhatsApp lista para activar
                cuando compartas el número.
              </p>
            </aside>
          </header>

          <section className="quick-grid" aria-label="Accesos principales">
            <button
              type="button"
              className="quick-card quick-card-primary"
              onClick={() => openMenu()}
            >
              <span className="quick-card-icon">
                <MenuSquare size={20} />
              </span>
              <h3>Menú</h3>
              <p>Explora categorías, productos, detalles y precios.</p>
              <span className="quick-card-link">Abrir categorías</span>
            </button>

            <button
              type="button"
              className="quick-card"
              onClick={() => scrollToSection('feedback')}
            >
              <span className="quick-card-icon">
                <MessageCircleHeart size={20} />
              </span>
              <h3>Danos tu opinión</h3>
              <p>Selección simple para conocer la satisfacción general.</p>
              <span className="quick-card-link">Calificar visita</span>
            </button>

            <button
              type="button"
              className="quick-card"
              onClick={() => scrollToSection('find-us')}
            >
              <span className="quick-card-icon">
                <MapPinned size={20} />
              </span>
              <h3>Encuéntranos</h3>
              <p>Dirección, teléfono, horarios y mapa embebido.</p>
              <span className="quick-card-link">Ir a ubicación</span>
            </button>

            <button
              type="button"
              className={`quick-card ${!whatsappReady ? 'quick-card-muted' : ''}`}
              onClick={handleWhatsAppAccess}
            >
              <span className="quick-card-icon">
                <MessageCircleMore size={20} />
              </span>
              <h3>WhatsApp</h3>
              <p>
                {whatsappReady
                  ? 'Abre la conversación directa con Sandelí.'
                  : 'Canal listo para activar apenas compartas el número.'}
              </p>
              <span className="quick-card-link">
                {whatsappReady ? 'Abrir chat' : 'Disponible pronto'}
              </span>
            </button>
          </section>

          <section id="feedback" className="content-panel">
            <div className="section-heading">
              <span className="section-kicker">Danos tu opinión</span>
              <h2>¿Cómo fue tu experiencia general?</h2>
              <p>
                Esta sección usa solo selección rápida, sin preguntas abiertas,
                para entender la satisfacción general del cliente.
              </p>
            </div>

            <div className="feedback-grid">
              {feedbackOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`feedback-option ${
                    selectedFeedbackId === option.id ? 'is-selected' : ''
                  }`}
                  onClick={() => setSelectedFeedbackId(option.id)}
                >
                  <span className="feedback-label">{option.label}</span>
                  <p>{option.note}</p>
                </button>
              ))}
            </div>

            {selectedFeedback ? (
              <div className="feedback-response" role="status" aria-live="polite">
                <Sparkles size={18} />
                <p>{selectedFeedback.response}</p>
              </div>
            ) : null}
          </section>

          <section id="find-us" className="content-panel">
            <div className="section-heading">
              <span className="section-kicker">Encuéntranos</span>
              <h2>Sandelí en Cúcuta</h2>
              <p>
                Toda la información de visita concentrada en un mismo bloque para
                que el cliente ubique la tienda en segundos.
              </p>
            </div>

            <div className="location-layout">
              <div className="info-stack">
                <article className="info-card">
                  <div className="info-card-top">
                    <MapPinned size={18} />
                    <span>Ubicación</span>
                  </div>
                  <p>{businessInfo.address}</p>
                  <a
                    className="text-link"
                    href={businessInfo.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Abrir en Google Maps
                    <ArrowUpRight size={16} />
                  </a>
                </article>

                <article className="info-card">
                  <div className="info-card-top">
                    <Phone size={18} />
                    <span>Teléfono</span>
                  </div>
                  <p>{businessInfo.phoneDisplay}</p>
                  <a className="text-link" href={businessInfo.phoneHref}>
                    Llamar ahora
                    <ArrowUpRight size={16} />
                  </a>
                </article>

                <article className="info-card">
                  <div className="info-card-top">
                    <Clock3 size={18} />
                    <span>Horarios</span>
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
              </div>

              <article className="map-card">
                <iframe
                  title="Ubicación de Sandelí en Google Maps"
                  src={businessInfo.mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </article>
            </div>
          </section>

          <section id="whatsapp" className="content-panel whatsapp-panel">
            <div className="section-heading">
              <span className="section-kicker">WhatsApp</span>
              <h2>Canal preparado para activarse</h2>
              <p>
                La estructura ya queda lista para redirigir al chat oficial en
                cuanto nos compartas el número.
              </p>
            </div>

            <article className="whatsapp-card">
              <span className="status-pill">
                {whatsappReady ? 'Activo' : 'Pendiente de número'}
              </span>
              <h3>Acceso directo al chat de Sandelí</h3>
              <p>
                {whatsappReady
                  ? 'La tarjeta abrirá el chat con un mensaje inicial listo para enviar.'
                  : 'Por ahora el acceso muestra este estado de disponibilidad para activarlo luego sin rehacer la app.'}
              </p>

              {whatsappReady ? (
                <a
                  className="primary-action"
                  href={createWhatsAppHref(
                    businessInfo.whatsappPhone,
                    businessInfo.whatsappMessage,
                  )}
                  target="_blank"
                  rel="noreferrer"
                >
                  Abrir WhatsApp
                  <ArrowUpRight size={18} />
                </a>
              ) : (
                <button type="button" className="secondary-action is-disabled">
                  Esperando número de WhatsApp
                </button>
              )}
            </article>
          </section>
        </main>

        <footer className="site-footer">
          <img src="/logo-ios.png" alt="" aria-hidden="true" />
          <p>Sandelí · sano y delicioso · experiencia web lista para Vercel.</p>
        </footer>
      </div>

      {isMenuOpen ? (
        <div className="menu-overlay" onClick={closeMenu}>
          <div
            className="menu-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="menu-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="menu-header">
              <div>
                <span className="section-kicker">Menú</span>
                <h2 id="menu-title">Explora por categorías</h2>
                <p>
                  Toca una categoría, abre un producto y despliega ingredientes
                  junto al precio. El botón compartir genera un enlace listo
                  para enviar.
                </p>
              </div>

              <button
                type="button"
                className="icon-button"
                onClick={closeMenu}
                aria-label="Cerrar menú"
              >
                <X size={22} />
              </button>
            </div>

            <div className="category-grid">
              {menuCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={`category-card ${
                    activeCategory.id === category.id ? 'is-active' : ''
                  }`}
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <span>{category.products.length} opciones</span>
                  <strong>{category.title}</strong>
                  <p>{category.blurb}</p>
                </button>
              ))}
            </div>

            <nav className="menu-navbar" aria-label="Navegación de categorías">
              {menuCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={`menu-tab ${
                    activeCategory.id === category.id ? 'is-active' : ''
                  }`}
                  onClick={() => handleCategorySelect(category.id)}
                >
                  {category.title}
                </button>
              ))}
            </nav>

            <section className="category-stage">
              <div className="category-stage-header">
                <div>
                  <span className="section-kicker">Categoría activa</span>
                  <h3>{activeCategory.title}</h3>
                  <p>{activeCategory.blurb}</p>
                </div>

                <span className="stage-note">Sin pedido en línea por ahora</span>
              </div>

              <div className="products-grid">
                {activeCategory.products.map((product) => {
                  const isExpanded = expandedProductId === product.id
                  const artStyle: CSSProperties = {
                    background: `linear-gradient(145deg, ${activeCategory.palette[0]}, ${product.accent})`,
                  }

                  return (
                    <article
                      key={product.id}
                      className={`product-card ${
                        isExpanded ? 'is-expanded' : ''
                      }`}
                    >
                      <div className="product-figure" style={artStyle}>
                        <span className="product-badge">{activeCategory.title}</span>
                        <img src="/logo-ios.png" alt="" aria-hidden="true" />
                        <p>{product.visualNote}</p>
                      </div>

                      <button
                        type="button"
                        className="product-toggle"
                        aria-expanded={isExpanded}
                        onClick={() => handleProductToggle(product.id)}
                      >
                        <div>
                          <h4>{product.name}</h4>
                          <span>Toca para ver ingredientes y precio</span>
                        </div>
                        <ChevronDown size={18} />
                      </button>

                      {isExpanded ? (
                        <div className="product-details">
                          <ul>
                            {product.details.map((detail) => (
                              <li key={detail}>{detail}</li>
                            ))}
                          </ul>

                          <div className="product-meta">
                            <strong>{product.price}</strong>
                            <button
                              type="button"
                              className="share-button"
                              onClick={() => shareProduct(activeCategory, product)}
                            >
                              <Share2 size={16} />
                              Compartir
                            </button>
                          </div>
                        </div>
                      ) : null}
                    </article>
                  )
                })}
              </div>
            </section>
          </div>
        </div>
      ) : null}

      {toastMessage ? (
        <div className="toast-message" role="status" aria-live="polite">
          {toastMessage}
        </div>
      ) : null}
    </>
  )
}

export default App
