"use client"

import { Camera, Mountain, Palette, Sparkles } from "lucide-react"

interface HeroSectionProps {
  onSuggestionClick: (query: string) => void
}

const suggestions = [
  { label: "Nature", icon: Mountain, color: "bg-teal" },
  { label: "Architecture", icon: Camera, color: "bg-violet" },
  { label: "Abstract", icon: Palette, color: "bg-rose" },
  { label: "Minimal", icon: Sparkles, color: "bg-amber" },
]

export function HeroSection({ onSuggestionClick }: HeroSectionProps) {
  return (
    <div className="text-center py-16 sm:py-24">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
        <span className="text-balance">Discover stunning</span>
        <br />
        <span className="bg-gradient-to-r from-violet via-rose to-teal bg-clip-text text-transparent">
          free images
        </span>
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 text-pretty">
        Search millions of high-resolution photos from Unsplash. Save your
        favorites with personal notes.
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        <span className="text-sm text-muted-foreground py-2">
          Popular searches:
        </span>
        {suggestions.map(({ label, icon: Icon, color }) => (
          <button
            key={label}
            onClick={() => onSuggestionClick(label.toLowerCase())}
            className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full hover:border-primary hover:shadow-md transition-all group"
          >
            <span
              className={`w-6 h-6 ${color} rounded-full flex items-center justify-center`}
            >
              <Icon className="w-3.5 h-3.5 text-white" />
            </span>
            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
