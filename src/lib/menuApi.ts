import { menuCategories, type Category } from '../data/menuData'

const adminApiBaseUrl = (import.meta.env.VITE_ADMIN_API_BASE_URL || '')
  .trim()
  .replace(/\/$/, '')

type MenuApiResponse = {
  categories?: Category[]
}

export const fallbackMenuCategories = menuCategories

export async function loadRemoteMenuCategories() {
  if (!adminApiBaseUrl) return null

  try {
    const response = await fetch(`${adminApiBaseUrl}/api/public/menu`, {
      headers: { Accept: 'application/json' },
    })

    const data = (await response.json()) as MenuApiResponse & { error?: string }
    if (!response.ok) return null
    if (!Array.isArray(data.categories) || data.categories.length === 0) return null

    return data.categories
  } catch {
    return null
  }
}
