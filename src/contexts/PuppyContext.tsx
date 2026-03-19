'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

export interface PuppyData {
  name: string
  weightKg: number
  birthDate: string // ISO date string e.g. "2024-11-15"
  photoUrl?: string // base64 data URL
}

interface PuppyContextValue {
  puppy: PuppyData | null
  setPuppy: (data: PuppyData) => void
}

const PuppyContext = createContext<PuppyContextValue | null>(null)

export function PuppyProvider({ children }: { children: React.ReactNode }) {
  const [puppy, setPuppyState] = useState<PuppyData | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('puppyguide_puppy')
    if (stored) {
      try {
        setPuppyState(JSON.parse(stored) as PuppyData)
      } catch {
        // ignore malformed data
      }
    }
  }, [])

  const setPuppy = (data: PuppyData) => {
    setPuppyState(data)
    localStorage.setItem('puppyguide_puppy', JSON.stringify(data))
  }

  return (
    <PuppyContext.Provider value={{ puppy, setPuppy }}>
      {children}
    </PuppyContext.Provider>
  )
}

export function usePuppy(): PuppyContextValue {
  const ctx = useContext(PuppyContext)
  if (!ctx) {
    throw new Error('usePuppy must be used within a PuppyProvider')
  }
  return ctx
}
