'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { usePuppy } from '@/contexts/PuppyContext'

// --- Age helpers (inline, not imported from lib) ---
function calcAge(birthDate: string): string {
  const birth = new Date(birthDate)
  const now = new Date()
  const weeks = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24 * 7))
  const months = Math.floor(weeks / 4.33)
  const years = Math.floor(months / 12)
  if (years >= 1) return `${years}`
  if (months >= 4) return `${months}`
  return `${weeks}`
}

function calcAgeUnit(birthDate: string, t: (k: string) => string): string {
  const birth = new Date(birthDate)
  const now = new Date()
  const weeks = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24 * 7))
  const months = Math.floor(weeks / 4.33)
  const years = Math.floor(months / 12)
  if (years >= 1) return t('home.age.years')
  if (months >= 4) return t('home.age.months')
  return t('home.age.weeks')
}

// --- Chevron icon ---
function ChevronRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-stone-400 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )
}

export default function HomePage() {
  const router = useRouter()
  const { t } = useLanguage()
  const { puppy } = usePuppy()

  useEffect(() => {
    if (puppy === null) {
      router.push('/onboarding')
    }
  }, [puppy, router])

  if (!puppy) return null

  const ageNum = calcAge(puppy.birthDate)
  const ageUnit = calcAgeUnit(puppy.birthDate, t)

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="max-w-lg mx-auto">

        {/* Header */}
        <header className="bg-amber-400 px-5 pt-8 pb-16">
          <p className="text-sm text-amber-100">
            {t('home.greeting')}, {puppy.name}!
          </p>
          <h1 className="mt-1 text-3xl font-extrabold text-white tracking-tight">
            {puppy.name}
          </h1>
          <div className="mt-3 flex items-center gap-2">
            <span className="bg-amber-300 text-amber-700 rounded-full px-3 py-1 text-sm font-bold">
              {ageNum} {ageUnit}
            </span>
            <span className="bg-amber-300 text-amber-700 rounded-full px-3 py-1 text-sm font-bold">
              {puppy.weightKg} kg
            </span>
          </div>
        </header>

        {/* Profile card */}
        <div className="bg-white rounded-2xl shadow-md -mt-10 mx-5 p-5 z-10 relative flex items-center gap-4">
          {/* Avatar */}
          {puppy.photoUrl ? (
            <img
              src={puppy.photoUrl}
              alt={puppy.name}
              className="w-20 h-20 rounded-2xl object-cover shrink-0"
            />
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-amber-100 flex items-center justify-center text-4xl shrink-0">
              🐾
            </div>
          )}

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-xl font-bold text-stone-800 truncate">{puppy.name}</p>
            <p className="text-sm font-medium text-amber-600">Golden Retriever</p>
            <p className="mt-1 text-sm text-stone-500">
              {ageNum} {ageUnit} · {puppy.weightKg} kg
            </p>
          </div>
        </div>

        {/* Section cards */}
        <div className="mx-5 mt-5 flex flex-col gap-4 pb-12">

          {/* Health */}
          <button
            type="button"
            onClick={() => router.push('/health')}
            className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5 flex items-center gap-4 active:scale-95 transition-transform w-full text-left"
          >
            <div className="rounded-xl bg-red-50 p-3 shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-red-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-stone-800">{t('home.health')}</p>
              <p className="text-sm text-stone-500 mt-0.5">{t('home.health.sub')}</p>
            </div>
            <ChevronRight />
          </button>

          {/* Training */}
          <button
            type="button"
            onClick={() => router.push('/training')}
            className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5 flex items-center gap-4 active:scale-95 transition-transform w-full text-left"
          >
            <div className="rounded-xl bg-emerald-50 p-3 shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-emerald-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-stone-800">{t('home.training')}</p>
              <p className="text-sm text-stone-500 mt-0.5">{t('home.training.sub')}</p>
            </div>
            <ChevronRight />
          </button>

          {/* Trainer AI */}
          <button
            type="button"
            onClick={() => router.push('/trainer')}
            className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5 flex items-center gap-4 active:scale-95 transition-transform w-full text-left"
          >
            <div className="rounded-xl bg-violet-50 p-3 shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-violet-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-stone-800">{t('home.trainer')}</p>
              <p className="text-sm text-stone-500 mt-0.5">{t('home.trainer.sub')}</p>
            </div>
            <ChevronRight />
          </button>

        </div>
      </div>
    </div>
  )
}
