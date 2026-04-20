"use client"

import { ImageCard } from "./image-card"
import type { FavoriteImage } from "@/hooks/use-favorites"
import { ImageOff } from "lucide-react"

interface UnsplashImage {
  id: string
  urls: {
    regular: string
    thumb: string
    full: string
  }
  alt_description: string | null
  user: {
    name: string
    links: {
      html: string
    }
  }
  width: number
  height: number
}

interface ImageGridProps {
  images: UnsplashImage[]
  favorites: FavoriteImage[]
  isFavorite: (id: string) => boolean
  onAddFavorite: (
    image: Omit<FavoriteImage, "note" | "addedAt">,
    note?: string
  ) => void
  onRemoveFavorite: (id: string) => void
  onUpdateNote: (id: string, note: string) => void
  showFavorites: boolean
  isLoading: boolean
  hasSearched: boolean
}

export function ImageGrid({
  images,
  favorites,
  isFavorite,
  onAddFavorite,
  onRemoveFavorite,
  onUpdateNote,
  showFavorites,
  isLoading,
  hasSearched,
}: ImageGridProps) {
  if (isLoading) {
    return (
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="break-inside-avoid mb-4">
            <div
              className="bg-muted rounded-xl animate-pulse"
              style={{ height: `${200 + Math.random() * 200}px` }}
            />
          </div>
        ))}
      </div>
    )
  }

  if (showFavorites) {
    if (favorites.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-rose/10 flex items-center justify-center mb-6">
            <ImageOff className="w-10 h-10 text-rose" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No favorites yet
          </h3>
          <p className="text-muted-foreground max-w-md">
            Search for images and click the heart icon to save them to your
            favorites collection.
          </p>
        </div>
      )
    }

    return (
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
        {favorites.map((fav) => (
          <ImageCard
            key={fav.id}
            image={fav}
            isFavorite={true}
            onToggleFavorite={onAddFavorite}
            onRemoveFavorite={onRemoveFavorite}
            onUpdateNote={onUpdateNote}
            showNote={true}
            currentNote={fav.note}
          />
        ))}
      </div>
    )
  }

  if (images.length === 0 && hasSearched) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
          <ImageOff className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No images found
        </h3>
        <p className="text-muted-foreground max-w-md">
          Try a different search term to discover more images.
        </p>
      </div>
    )
  }

  if (images.length === 0) {
    return null
  }

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
      {images.map((img) => (
        <ImageCard
          key={img.id}
          image={img}
          isFavorite={isFavorite(img.id)}
          onToggleFavorite={onAddFavorite}
          onRemoveFavorite={onRemoveFavorite}
        />
      ))}
    </div>
  )
}
