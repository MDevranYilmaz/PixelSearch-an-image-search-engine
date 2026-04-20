"use client"

import { useState } from "react"
import { Heart, Download, ExternalLink, X, Pencil, Check } from "lucide-react"
import type { FavoriteImage } from "@/hooks/use-favorites"

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

interface ImageCardProps {
  image: UnsplashImage | FavoriteImage
  isFavorite: boolean
  onToggleFavorite: (
    image: Omit<FavoriteImage, "note" | "addedAt">,
    note?: string
  ) => void
  onRemoveFavorite: (id: string) => void
  onUpdateNote?: (id: string, note: string) => void
  showNote?: boolean
  currentNote?: string
}

function isUnsplashImage(
  image: UnsplashImage | FavoriteImage
): image is UnsplashImage {
  return "urls" in image
}

export function ImageCard({
  image,
  isFavorite,
  onToggleFavorite,
  onRemoveFavorite,
  onUpdateNote,
  showNote = false,
  currentNote = "",
}: ImageCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [note, setNote] = useState(currentNote)
  const [showModal, setShowModal] = useState(false)

  const id = image.id
  const imageUrl = isUnsplashImage(image) ? image.urls.regular : image.url
  const thumbUrl = isUnsplashImage(image) ? image.urls.thumb : image.thumbUrl
  const fullUrl = isUnsplashImage(image) ? image.urls.full : image.url
  const altDescription = isUnsplashImage(image)
    ? image.alt_description || "Unsplash image"
    : image.altDescription
  const photographerName = isUnsplashImage(image)
    ? image.user.name
    : image.photographer
  const photographerUrl = isUnsplashImage(image)
    ? image.user.links.html
    : image.photographerUrl
  const aspectRatio = image.width / image.height

  const handleFavoriteClick = () => {
    if (isFavorite) {
      onRemoveFavorite(id)
    } else {
      onToggleFavorite({
        id,
        url: imageUrl,
        thumbUrl,
        altDescription,
        photographer: photographerName,
        photographerUrl,
        width: image.width,
        height: image.height,
      })
    }
  }

  const handleSaveNote = () => {
    if (onUpdateNote) {
      onUpdateNote(id, note)
    }
    setIsEditing(false)
  }

  const handleDownload = async () => {
    try {
      const response = await fetch(fullUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `pixelsearch-${id}.jpg`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Download failed:", error)
    }
  }

  return (
    <>
      <div
        className="break-inside-avoid mb-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
          <div
            className="relative cursor-pointer"
            style={{ paddingBottom: `${(1 / aspectRatio) * 100}%` }}
            onClick={() => setShowModal(true)}
          >
            <img
              src={imageUrl}
              alt={altDescription}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />

          <div
            className={`absolute top-3 right-3 flex gap-2 transition-all duration-300 ${
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2"
            }`}
          >
            <button
              onClick={handleFavoriteClick}
              className={`p-2.5 rounded-full backdrop-blur-md transition-all ${
                isFavorite
                  ? "bg-rose text-white"
                  : "bg-white/90 text-foreground hover:bg-rose hover:text-white"
              }`}
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart
                className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`}
              />
            </button>
            <button
              onClick={handleDownload}
              className="p-2.5 rounded-full bg-white/90 text-foreground hover:bg-teal hover:text-white backdrop-blur-md transition-all"
              title="Download"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>

          <div
            className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 ${
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            }`}
          >
            <a
              href={photographerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-white text-sm hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              <span>by {photographerName}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {showNote && (
          <div className="mt-2 p-3 bg-card rounded-lg border border-border">
            {isEditing ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add a note..."
                  className="flex-1 px-3 py-1.5 text-sm bg-muted rounded-md border-none focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground"
                  autoFocus
                  onKeyDown={(e) => e.key === "Enter" && handleSaveNote()}
                />
                <button
                  onClick={handleSaveNote}
                  className="p-1.5 rounded-md bg-teal text-white hover:bg-teal/90 transition-colors"
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                className="flex items-center gap-2 cursor-pointer group/note"
                onClick={() => setIsEditing(true)}
              >
                <p className="flex-1 text-sm text-muted-foreground">
                  {currentNote || "Add a note..."}
                </p>
                <Pencil className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover/note:opacity-100 transition-opacity" />
              </div>
            )}
          </div>
        )}
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setShowModal(false)}
        >
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={fullUrl}
            alt={altDescription}
            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
