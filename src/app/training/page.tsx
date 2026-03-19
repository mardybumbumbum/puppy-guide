'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { CHECKLIST, ChecklistItem } from '@/data/training/checklist'

type Category = ChecklistItem['category']
type FilterTab = Category | 'all'

const STORAGE_KEY = 'puppyguide_training'

const CATEGORY_DOT: Record<Category, string> = {
  socialization: 'bg-amber-400',
  commands: 'bg-emerald-400',
  environment: 'bg-blue-400',
  behavior: 'bg-violet-400',
}

const TABS: { value: FilterTab; labelPl: string; labelEn: string }[] = [
  { value: 'all', labelPl: 'Wszystkie', labelEn: 'All' },
  { value: 'socialization', labelPl: 'Socjalizacja', labelEn: 'Socialization' },
  { value: 'commands', labelPl: 'Komendy', labelEn: 'Commands' },
  { value: 'environment', labelPl: 'Środowisko', labelEn: 'Environment' },
  { value: 'behavior', labelPl: 'Zachowanie', labelEn: 'Behavior' },
]

function loadChecked(): Record<string, boolean> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as Record<string, boolean>
  } catch {
    return {}
  }
}

function saveChecked(checked: Record<string, boolean>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(checked))
}

export default function TrainingPage() {
  const { t, lang } = useLanguage()
  const router = useRouter()

  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [activeTab, setActiveTab] = useState<FilterTab>('all')

  useEffect(() => {
    setChecked(loadChecked())
  }, [])

  function toggle(id: string) {
    const updated = { ...checked, [id]: !checked[id] }
    setChecked(updated)
    saveChecked(updated)
  }

  const visibleItems =
    activeTab === 'all'
      ? CHECKLIST
      : CHECKLIST.filter((item) => item.category === activeTab)

  const completedCount = visibleItems.filter((item) => checked[item.id]).length
  const totalCount = visibleItems.length
  const progressPct = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="mx-auto max-w-lg px-5 pt-6 pb-12">

        {/* Top bar */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 transition-colors"
            aria-label="Go back"
          >
            <span className="text-lg leading-none">←</span>
          </button>
          <h1 className="font-bold text-xl text-stone-800">{t('training.title')}</h1>
        </div>

        {/* Progress bar */}
        <div className="bg-white rounded-2xl border border-stone-200 p-4 mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-stone-400">
              {t('training.progress')}
            </span>
            <span className="text-sm font-bold text-stone-700">
              {completedCount} / {totalCount}{' '}
              <span className="font-normal text-stone-400">{t('training.completed')}</span>
            </span>
          </div>
          <div className="w-full bg-stone-200 rounded-full h-2">
            <div
              className="bg-amber-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-5 scrollbar-none">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.value
            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`shrink-0 px-4 py-1.5 text-sm font-semibold rounded-full transition-colors ${
                  isActive
                    ? 'bg-amber-400 text-white'
                    : 'bg-white border border-stone-200 text-stone-500 hover:bg-stone-50'
                }`}
              >
                {lang === 'pl' ? tab.labelPl : tab.labelEn}
              </button>
            )
          })}
        </div>

        {/* Checklist items */}
        <div className="flex flex-col gap-3">
          {visibleItems.map((item) => {
            const isDone = !!checked[item.id]
            const title = lang === 'pl' ? item.titlePl : item.titleEn
            const description = lang === 'pl' ? item.descriptionPl : item.descriptionEn
            const weekLabel = lang === 'pl' ? 'tygodni' : 'weeks'

            return (
              <button
                key={item.id}
                onClick={() => toggle(item.id)}
                className="w-full text-left bg-white rounded-xl border border-stone-200 p-4 flex items-start gap-3 hover:bg-stone-50 transition-colors"
              >
                {/* Custom checkbox */}
                <span
                  className={`shrink-0 mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-colors ${
                    isDone
                      ? 'bg-amber-400 border-amber-400'
                      : 'bg-white border-stone-200'
                  }`}
                >
                  {isDone && (
                    <svg
                      className="w-3.5 h-3.5 text-white"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="2,6 5,9 10,3" />
                    </svg>
                  )}
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${CATEGORY_DOT[item.category]}`}
                    />
                    <span
                      className={`font-semibold text-sm ${
                        isDone ? 'line-through text-stone-400' : 'text-stone-800'
                      }`}
                    >
                      {title}
                    </span>
                  </div>
                  <p className="text-sm text-stone-500 mb-2">{description}</p>
                  <span className="inline-block text-xs text-stone-400 bg-stone-100 rounded-full px-2.5 py-0.5">
                    {item.minWeeks}–{item.maxWeeks} {weekLabel}
                  </span>
                </div>
              </button>
            )
          })}

          {visibleItems.length === 0 && (
            <p className="text-center text-sm text-stone-400 py-8">{t('health.empty')}</p>
          )}
        </div>
      </div>
    </div>
  )
}
