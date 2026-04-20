"use client"

import { useState, useEffect, useCallback } from "react"

export interface FavoriteImage {
  id: string
  url: string
  thumbUrl: string
  altDescription: string
  photographer: string
  photographerUrl: string
  note: string
  addedAt: number
  width: number
  height: number
}

const FAVORITES_KEY = "pixelsearch_favorites"

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteImage[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY)
    if (stored) {
      try {
        setFavorites(JSON.parse(stored))
      } catch {
        setFavorites([])
      }
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
    }
  }, [favorites, isLoaded])

  const addFavorite = useCallback((image: Omit<FavoriteImage, "note" | "addedAt">, note = "") => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === image.id)) {
        return prev
      }
      return [...prev, { ...image, note, addedAt: Date.now() }]
    })
  }, [])

  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id))
  }, [])

  const updateNote = useCallback((id: string, note: string) => {
    setFavorites((prev) =>
      prev.map((fav) => (fav.id === id ? { ...fav, note } : fav))
    )
  }, [])

  const isFavorite = useCallback(
    (id: string) => favorites.some((fav) => fav.id === id),
    [favorites]
  )

  const getFavorite = useCallback(
    (id: string) => favorites.find((fav) => fav.id === id),
    [favorites]
  )

  return {
    favorites,
    isLoaded,
    addFavorite,
    removeFavorite,
    updateNote,
    isFavorite,
    getFavorite,
  }
}
