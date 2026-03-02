'use client'

import { Search, X } from 'lucide-react'
import { useState, useEffect } from 'react'

interface ProductSearchProps {
  onSearchChange: (query: string) => void
  placeholder?: string
}

export function ProductSearch({ onSearchChange, placeholder = 'Search by product name, category, or keyword...' }: ProductSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    onSearchChange(searchQuery)
  }, [searchQuery, onSearchChange])

  const handleClear = () => {
    setSearchQuery('')
  }

  return (
    <div className="w-full">
      <div
        className={`relative flex items-center gap-3 px-4 py-3 md:py-4 border-2 rounded-lg bg-background transition-smooth ${
          isFocused
            ? 'border-primary bg-primary/5 shadow-lg ring-2 ring-primary/20'
            : 'border-border/50 hover:border-border/80'
        }`}
      >
        {/* Search Icon */}
        <Search
          size={20}
          className={`flex-shrink-0 transition-smooth ${
            isFocused ? 'text-primary' : 'text-foreground/50'
          }`}
        />

        {/* Input Field */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent border-0 outline-none text-foreground placeholder:text-foreground/50 text-sm md:text-base"
        />

        {/* Clear Button */}
        {searchQuery && (
          <button
            onClick={handleClear}
            className="flex-shrink-0 p-1 text-foreground/50 hover:text-foreground hover:bg-foreground/10 rounded-md transition-smooth"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Search Results Counter */}
      {searchQuery && (
        <div className="mt-2 text-xs md:text-sm text-foreground/60 px-2">
          Searching for: <span className="font-semibold text-foreground/80">"{searchQuery}"</span>
        </div>
      )}
    </div>
  )
}
