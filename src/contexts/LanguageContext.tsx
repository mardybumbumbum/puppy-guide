'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { pl } from '../translations/pl'
import { en } from '../translations/en'

type Lang = 'pl' | 'en'

interface LanguageContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
}

const translations: Record<Lang, Record<string, string>> = { pl, en }

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('pl')

  useEffect(() => {
    const stored = localStorage.getItem('puppyguide_lang')
    if (stored === 'pl' || stored === 'en') {
      setLangState(stored)
    }
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('puppyguide_lang', l)
  }

  const t = (key: string): string => {
    return translations[lang][key] ?? key
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return ctx
}
