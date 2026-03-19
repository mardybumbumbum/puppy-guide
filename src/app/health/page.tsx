'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'

interface CheckupRecord {
  id: string
  date: string
  vet: string
  notes: string
}

interface VaccinationRecord {
  id: string
  date: string
  vaccine: string
  nextDue?: string
}

interface DiagnosisRecord {
  id: string
  date: string
  diagnosis: string
  notes: string
}

interface HealthData {
  checkups: CheckupRecord[]
  vaccinations: VaccinationRecord[]
  diagnoses: DiagnosisRecord[]
}

const STORAGE_KEY = 'puppyguide_health'

const defaultData: HealthData = {
  checkups: [],
  vaccinations: [],
  diagnoses: [],
}

function loadData(): HealthData {
  if (typeof window === 'undefined') return defaultData
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultData
    return JSON.parse(raw) as HealthData
  } catch {
    return defaultData
  }
}

function saveData(data: HealthData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

type Section = 'checkups' | 'vaccinations' | 'diagnoses'

export default function HealthPage() {
  const { t } = useLanguage()
  const router = useRouter()

  const [data, setData] = useState<HealthData>(defaultData)
  const [open, setOpen] = useState<Record<Section, boolean>>({
    checkups: false,
    vaccinations: false,
    diagnoses: false,
  })
  const [showForm, setShowForm] = useState<Record<Section, boolean>>({
    checkups: false,
    vaccinations: false,
    diagnoses: false,
  })

  // Checkup form state
  const [checkupForm, setCheckupForm] = useState({ date: '', vet: '', notes: '' })
  // Vaccination form state
  const [vacForm, setVacForm] = useState({ date: '', vaccine: '', nextDue: '' })
  // Diagnosis form state
  const [diagForm, setDiagForm] = useState({ date: '', diagnosis: '', notes: '' })

  useEffect(() => {
    setData(loadData())
  }, [])

  function toggleSection(section: Section) {
    setOpen((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  function toggleForm(section: Section) {
    setShowForm((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  function submitCheckup(e: React.FormEvent) {
    e.preventDefault()
    const newRecord: CheckupRecord = {
      id: uid(),
      date: checkupForm.date,
      vet: checkupForm.vet,
      notes: checkupForm.notes,
    }
    const updated = { ...data, checkups: [newRecord, ...data.checkups] }
    setData(updated)
    saveData(updated)
    setCheckupForm({ date: '', vet: '', notes: '' })
    setShowForm((prev) => ({ ...prev, checkups: false }))
  }

  function submitVaccination(e: React.FormEvent) {
    e.preventDefault()
    const newRecord: VaccinationRecord = {
      id: uid(),
      date: vacForm.date,
      vaccine: vacForm.vaccine,
      nextDue: vacForm.nextDue || undefined,
    }
    const updated = { ...data, vaccinations: [newRecord, ...data.vaccinations] }
    setData(updated)
    saveData(updated)
    setVacForm({ date: '', vaccine: '', nextDue: '' })
    setShowForm((prev) => ({ ...prev, vaccinations: false }))
  }

  function submitDiagnosis(e: React.FormEvent) {
    e.preventDefault()
    const newRecord: DiagnosisRecord = {
      id: uid(),
      date: diagForm.date,
      diagnosis: diagForm.diagnosis,
      notes: diagForm.notes,
    }
    const updated = { ...data, diagnoses: [newRecord, ...data.diagnoses] }
    setData(updated)
    saveData(updated)
    setDiagForm({ date: '', diagnosis: '', notes: '' })
    setShowForm((prev) => ({ ...prev, diagnoses: false }))
  }

  const inputCls =
    'w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-300'

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
          <h1 className="font-bold text-xl text-stone-800">{t('health.title')}</h1>
        </div>

        <div className="flex flex-col gap-4">

          {/* Check-ups section */}
          <div className="rounded-2xl overflow-hidden border border-stone-200 bg-white">
            <button
              onClick={() => toggleSection('checkups')}
              className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-stone-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-red-500 shrink-0" />
                <span className="font-semibold text-stone-800">{t('health.checkups')}</span>
                <span className="text-xs text-stone-400 font-medium bg-stone-100 rounded-full px-2 py-0.5">
                  {data.checkups.length}
                </span>
              </div>
              <span className="text-stone-400 text-sm">{open.checkups ? '▲' : '▼'}</span>
            </button>

            {open.checkups && (
              <div className="px-4 pb-4 flex flex-col gap-3 border-t border-stone-100">
                <div className="pt-3">
                  {data.checkups.length === 0 && !showForm.checkups && (
                    <p className="text-sm text-stone-400 text-center py-2">{t('health.empty')}</p>
                  )}
                  {data.checkups.map((record) => (
                    <div key={record.id} className="bg-white rounded-xl border border-stone-100 p-4 flex flex-col gap-1 mb-3 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-red-500 uppercase tracking-wide">{t('health.date')}</span>
                        <span className="text-xs text-stone-500">{record.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-stone-400">{t('health.vet')}:</span>
                        <span className="text-sm font-semibold text-stone-800">{record.vet}</span>
                      </div>
                      {record.notes && (
                        <p className="text-sm text-stone-500 mt-1">{record.notes}</p>
                      )}
                    </div>
                  ))}
                </div>

                {showForm.checkups ? (
                  <form onSubmit={submitCheckup} className="flex flex-col gap-3 bg-stone-50 rounded-xl p-4 border border-stone-100">
                    <input
                      type="date"
                      required
                      value={checkupForm.date}
                      onChange={(e) => setCheckupForm((f) => ({ ...f, date: e.target.value }))}
                      className={inputCls}
                    />
                    <input
                      type="text"
                      required
                      placeholder={t('health.vet')}
                      value={checkupForm.vet}
                      onChange={(e) => setCheckupForm((f) => ({ ...f, vet: e.target.value }))}
                      className={inputCls}
                    />
                    <textarea
                      placeholder={t('health.notes')}
                      rows={2}
                      value={checkupForm.notes}
                      onChange={(e) => setCheckupForm((f) => ({ ...f, notes: e.target.value }))}
                      className={inputCls + ' resize-none'}
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="flex-1 bg-red-500 text-white text-sm font-semibold rounded-xl py-2 hover:bg-red-600 transition-colors"
                      >
                        {t('health.add_checkup')}
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleForm('checkups')}
                        className="px-4 text-sm text-stone-500 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={() => toggleForm('checkups')}
                    className="w-full text-sm font-semibold text-red-500 border border-dashed border-red-300 rounded-xl py-2.5 hover:bg-red-50 transition-colors"
                  >
                    + {t('health.add_checkup')}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Vaccinations section */}
          <div className="rounded-2xl overflow-hidden border border-stone-200 bg-white">
            <button
              onClick={() => toggleSection('vaccinations')}
              className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-stone-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
                <span className="font-semibold text-stone-800">{t('health.vaccinations')}</span>
                <span className="text-xs text-stone-400 font-medium bg-stone-100 rounded-full px-2 py-0.5">
                  {data.vaccinations.length}
                </span>
              </div>
              <span className="text-stone-400 text-sm">{open.vaccinations ? '▲' : '▼'}</span>
            </button>

            {open.vaccinations && (
              <div className="px-4 pb-4 flex flex-col gap-3 border-t border-stone-100">
                <div className="pt-3">
                  {data.vaccinations.length === 0 && !showForm.vaccinations && (
                    <p className="text-sm text-stone-400 text-center py-2">{t('health.empty')}</p>
                  )}
                  {data.vaccinations.map((record) => (
                    <div key={record.id} className="bg-white rounded-xl border border-stone-100 p-4 flex flex-col gap-1 mb-3 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-stone-800">{record.vaccine}</span>
                        <span className="text-xs text-stone-500">{record.date}</span>
                      </div>
                      {record.nextDue && (
                        <p className="text-xs text-amber-600 font-medium mt-1">
                          Next: {record.nextDue}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {showForm.vaccinations ? (
                  <form onSubmit={submitVaccination} className="flex flex-col gap-3 bg-stone-50 rounded-xl p-4 border border-stone-100">
                    <input
                      type="text"
                      required
                      placeholder="Vaccine name"
                      value={vacForm.vaccine}
                      onChange={(e) => setVacForm((f) => ({ ...f, vaccine: e.target.value }))}
                      className={inputCls}
                    />
                    <input
                      type="date"
                      required
                      value={vacForm.date}
                      onChange={(e) => setVacForm((f) => ({ ...f, date: e.target.value }))}
                      className={inputCls}
                    />
                    <input
                      type="date"
                      placeholder="Next due (optional)"
                      value={vacForm.nextDue}
                      onChange={(e) => setVacForm((f) => ({ ...f, nextDue: e.target.value }))}
                      className={inputCls}
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="flex-1 bg-amber-500 text-white text-sm font-semibold rounded-xl py-2 hover:bg-amber-600 transition-colors"
                      >
                        {t('health.add_vaccination')}
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleForm('vaccinations')}
                        className="px-4 text-sm text-stone-500 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={() => toggleForm('vaccinations')}
                    className="w-full text-sm font-semibold text-amber-500 border border-dashed border-amber-300 rounded-xl py-2.5 hover:bg-amber-50 transition-colors"
                  >
                    + {t('health.add_vaccination')}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Diagnoses section */}
          <div className="rounded-2xl overflow-hidden border border-stone-200 bg-white">
            <button
              onClick={() => toggleSection('diagnoses')}
              className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-stone-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-violet-500 shrink-0" />
                <span className="font-semibold text-stone-800">{t('health.diagnoses')}</span>
                <span className="text-xs text-stone-400 font-medium bg-stone-100 rounded-full px-2 py-0.5">
                  {data.diagnoses.length}
                </span>
              </div>
              <span className="text-stone-400 text-sm">{open.diagnoses ? '▲' : '▼'}</span>
            </button>

            {open.diagnoses && (
              <div className="px-4 pb-4 flex flex-col gap-3 border-t border-stone-100">
                <div className="pt-3">
                  {data.diagnoses.length === 0 && !showForm.diagnoses && (
                    <p className="text-sm text-stone-400 text-center py-2">{t('health.empty')}</p>
                  )}
                  {data.diagnoses.map((record) => (
                    <div key={record.id} className="bg-white rounded-xl border border-stone-100 p-4 flex flex-col gap-1 mb-3 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-stone-800">{record.diagnosis}</span>
                        <span className="text-xs text-stone-500">{record.date}</span>
                      </div>
                      {record.notes && (
                        <p className="text-sm text-stone-500 mt-1">{record.notes}</p>
                      )}
                    </div>
                  ))}
                </div>

                {showForm.diagnoses ? (
                  <form onSubmit={submitDiagnosis} className="flex flex-col gap-3 bg-stone-50 rounded-xl p-4 border border-stone-100">
                    <input
                      type="date"
                      required
                      value={diagForm.date}
                      onChange={(e) => setDiagForm((f) => ({ ...f, date: e.target.value }))}
                      className={inputCls}
                    />
                    <input
                      type="text"
                      required
                      placeholder="Diagnosis"
                      value={diagForm.diagnosis}
                      onChange={(e) => setDiagForm((f) => ({ ...f, diagnosis: e.target.value }))}
                      className={inputCls}
                    />
                    <textarea
                      placeholder={t('health.notes')}
                      rows={2}
                      value={diagForm.notes}
                      onChange={(e) => setDiagForm((f) => ({ ...f, notes: e.target.value }))}
                      className={inputCls + ' resize-none'}
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="flex-1 bg-violet-500 text-white text-sm font-semibold rounded-xl py-2 hover:bg-violet-600 transition-colors"
                      >
                        {t('health.add_diagnosis')}
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleForm('diagnoses')}
                        className="px-4 text-sm text-stone-500 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={() => toggleForm('diagnoses')}
                    className="w-full text-sm font-semibold text-violet-500 border border-dashed border-violet-300 rounded-xl py-2.5 hover:bg-violet-50 transition-colors"
                  >
                    + {t('health.add_diagnosis')}
                  </button>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
