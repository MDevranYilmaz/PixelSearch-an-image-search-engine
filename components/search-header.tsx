"use client"

import { Search, Heart, Sparkles } from "lucide-react"
import { useState, type FormEvent } from "react"

interface SearchHeaderProps {
  onSearch: (query: string) => void
  onShowFavorites: () => void
  showingFavorites: boolean
  favoritesCount: number
  isSearching: boolean
}

export function SearchHeader({
  onSearch,
  onShowFavorites,
  showingFavorites,
  favoritesCount,
  isSearching,
}: SearchHeaderProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => onSearch("")}
            className="flex items-center gap-2 shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-violet flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:block">
              PixelSearch
            </span>
          </button>

          <form onSubmit={handleSubmit} className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for images..."
                className="w-full pl-12 pr-4 py-3 bg-muted rounded-xl border border-transparent focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
              />
              {isSearching && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
          </form>

          <button
            onClick={onShowFavorites}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${
              showingFavorites
                ? "bg-rose text-white"
                : "bg-muted text-foreground hover:bg-rose/10 hover:text-rose"
            }`}
          >
            <Heart
              className={`w-5 h-5 ${showingFavorites ? "fill-current" : ""}`}
            />
            <span className="hidden sm:inline font-medium">Favorites</span>
            {favoritesCount > 0 && (
              <span
                className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                  showingFavorites
                    ? "bg-white/20 text-white"
                    : "bg-rose/10 text-rose"
                }`}
              >
                {favoritesCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
