"use client"

import { useState, useCallback } from "react"
import { SearchHeader } from "@/components/search-header"
import { ImageGrid } from "@/components/image-grid"
import { HeroSection } from "@/components/hero-section"
import { useFavorites } from "@/hooks/use-favorites"

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

const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY

export default function HomePage() {
  const [images, setImages] = useState<UnsplashImage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showFavorites, setShowFavorites] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [currentQuery, setCurrentQuery] = useState("")

  const {
    favorites,
    addFavorite,
    removeFavorite,
    updateNote,
    isFavorite,
  } = useFavorites()

  const searchImages = useCallback(async (query: string) => {
    if (!query) {
      setImages([])
      setHasSearched(false)
      setCurrentQuery("")
      setShowFavorites(false)
      return
    }

    if (!UNSPLASH_ACCESS_KEY) {
      console.error("Unsplash API key not configured")
      return
    }

    setIsLoading(true)
    setShowFavorites(false)
    setCurrentQuery(query)

    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
          query
        )}&per_page=30&orientation=squarish`,
        {
          headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error("Failed to fetch images")
      }

      const data = await response.json()
      setImages(data.results || [])
      setHasSearched(true)
    } catch (error) {
      console.error("Search error:", error)
      setImages([])
      setHasSearched(true)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleShowFavorites = () => {
    setShowFavorites(!showFavorites)
  }

  const showHero = !hasSearched && !showFavorites && images.length === 0

  return (
    <div className="min-h-screen bg-background">
      <SearchHeader
        onSearch={searchImages}
        onShowFavorites={handleShowFavorites}
        showingFavorites={showFavorites}
        favoritesCount={favorites.length}
        isSearching={isLoading}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {showHero && <HeroSection onSuggestionClick={searchImages} />}

        {!showHero && !showFavorites && currentQuery && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">
              Results for{" "}
              <span className="text-primary">&quot;{currentQuery}&quot;</span>
            </h2>
            <p className="text-muted-foreground mt-1">
              {images.length} images found
            </p>
          </div>
        )}

        {showFavorites && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">
              Your Favorites
            </h2>
            <p className="text-muted-foreground mt-1">
              {favorites.length} saved images
            </p>
          </div>
        )}

        {!UNSPLASH_ACCESS_KEY && !showFavorites && hasSearched && (
          <div className="bg-amber/10 border border-amber/30 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-foreground mb-2">
              API Key Required
            </h3>
            <p className="text-muted-foreground text-sm">
              To search images, add your Unsplash API key as{" "}
              <code className="bg-muted px-2 py-1 rounded text-xs">
                NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
              </code>{" "}
              in the environment variables. Get a free key at{" "}
              <a
                href="https://unsplash.com/developers"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                unsplash.com/developers
              </a>
            </p>
          </div>
        )}

        <ImageGrid
          images={images}
          favorites={favorites}
          isFavorite={isFavorite}
          onAddFavorite={addFavorite}
          onRemoveFavorite={removeFavorite}
          onUpdateNote={updateNote}
          showFavorites={showFavorites}
          isLoading={isLoading}
          hasSearched={hasSearched}
        />
      </main>

      <footer className="border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p className="text-sm text-muted-foreground">
            Powered by{" "}
            <a
              href="https://unsplash.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Unsplash
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
