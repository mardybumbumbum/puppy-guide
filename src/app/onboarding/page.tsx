'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { usePuppy } from '@/contexts/PuppyContext'

export default function OnboardingPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const { setPuppy } = usePuppy()

  const [name, setName] = useState('')
  const [weightKg, setWeightKg] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined)
  const [photoPreview, setPhotoPreview] = useState<string | undefined>(undefined)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const today = new Date().toISOString().split('T')[0]

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const result = ev.target?.result as string
      setPhotoUrl(result)
      setPhotoPreview(result)
    }
    reader.readAsDataURL(file)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setPuppy({
      name,
      weightKg: parseFloat(weightKg),
      birthDate,
      photoUrl,
    })
    router.push('/')
  }

  const labelClass = 'block text-sm font-semibold text-stone-700 mb-1'
  const inputClass =
    'rounded-xl border border-stone-200 bg-white px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-amber-400 text-stone-800 text-base'

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col">
      <div className="max-w-sm mx-auto w-full px-6 py-12">
        {/* Top branding */}
        <div className="text-center mb-8">
          <span className="text-6xl" role="img" aria-label="paw">🐾</span>
          <h1 className="mt-4 text-2xl font-extrabold text-stone-800 tracking-tight">
            {t('onboarding.title')}
          </h1>
          <p className="mt-2 text-stone-500 text-sm">
            {t('onboarding.subtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Name */}
          <div>
            <label className={labelClass}>{t('onboarding.name.label')}</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Weight */}
          <div>
            <label className={labelClass}>{t('onboarding.weight.label')}</label>
            <input
              type="number"
              step="0.1"
              min="0.1"
              required
              value={weightKg}
              onChange={(e) => setWeightKg(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Birth date */}
          <div>
            <label className={labelClass}>{t('onboarding.birthdate.label')}</label>
            <input
              type="date"
              required
              max={today}
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Photo upload */}
          <div>
            <label className={labelClass}>{t('onboarding.photo.cta')}</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-xl border border-stone-200 bg-white w-full px-4 py-3 flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-amber-400 active:scale-95 transition-transform"
            >
              {photoPreview ? (
                <>
                  <img
                    src={photoPreview}
                    alt="preview"
                    className="w-12 h-12 rounded-xl object-cover shrink-0"
                  />
                  <span className="text-sm text-stone-600 font-medium truncate">
                    {t('onboarding.photo.cta')}
                  </span>
                </>
              ) : (
                <span className="text-stone-400 text-sm">{t('onboarding.photo.cta')}</span>
              )}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-2 w-full bg-amber-400 hover:bg-amber-500 text-white font-bold py-4 rounded-2xl text-lg transition-colors active:scale-95 transition-transform"
          >
            {t('onboarding.submit')}
          </button>
        </form>
      </div>
    </div>
  )
}
