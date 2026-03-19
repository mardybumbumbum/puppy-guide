'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { usePuppy } from '@/contexts/PuppyContext'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

function getAgeWeeks(birthDate: string): number {
  const birth = new Date(birthDate)
  const now = new Date()
  return Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24 * 7))
}

export default function TrainerPage() {
  const router = useRouter()
  const { t, lang } = useLanguage()
  const { puppy } = usePuppy()

  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: t('trainer.welcome') },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  if (!puppy) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-stone-800 mb-2">
            {lang === 'pl' ? 'Najpierw dodaj szczeniaka' : 'Add a puppy first'}
          </h2>
          <p className="text-stone-500 text-sm mb-6">
            {lang === 'pl'
              ? 'Aby korzystać z Trenera AI, musisz najpierw dodać swojego szczeniaka.'
              : 'To use the AI Trainer, you need to add your puppy first.'}
          </p>
          <button
            onClick={() => router.push('/onboarding')}
            className="bg-violet-500 hover:bg-violet-600 text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
          >
            {lang === 'pl' ? 'Dodaj szczeniaka' : 'Add puppy'}
          </button>
        </div>
      </div>
    )
  }

  const resolvedPuppy = puppy
  const puppyAgeWeeks = getAgeWeeks(resolvedPuppy.birthDate)

  async function sendMessage() {
    const trimmed = input.trim()
    if (!trimmed || loading) return

    const userMessage: Message = { role: 'user', content: trimmed }
    const nextMessages = [...messages, userMessage]

    setMessages(nextMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages,
          puppyName: resolvedPuppy.name,
          puppyAgeWeeks,
          lang,
        }),
      })

      if (!res.ok) throw new Error('Request failed')

      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'assistant', content: data.message }])
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: t('trainer.error') }])
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      {/* Header */}
      <div className="fixed top-16 left-0 right-0 bg-white border-b border-stone-200 z-40 h-14 flex items-center px-5 gap-3">
        <button
          onClick={() => router.push('/')}
          className="text-stone-600 hover:text-stone-900 transition-colors flex items-center justify-center w-8 h-8 -ml-1"
          aria-label="Back"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="w-8 h-8 rounded-full bg-violet-50 flex items-center justify-center p-1.5">
          <svg className="w-full h-full text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>

        <div className="flex flex-col leading-tight">
          <span className="font-bold text-stone-800 text-sm">{t('trainer.title')}</span>
          <span className="text-stone-500 text-xs">Golden Retriever AI</span>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto pt-[calc(4rem+3.5rem)] pb-24 px-4 flex flex-col gap-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={
                msg.role === 'user'
                  ? 'bg-amber-400 text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%] text-sm whitespace-pre-wrap'
                  : 'bg-white border border-stone-100 shadow-sm rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] text-sm text-stone-800 whitespace-pre-wrap'
              }
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-stone-100 shadow-sm rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5 items-center">
              <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-stone-200 px-4 py-3 flex gap-3">
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('trainer.placeholder')}
          className="resize-none rounded-2xl border border-stone-200 bg-stone-50 px-4 py-2.5 flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          aria-label={t('trainer.send')}
          className="bg-violet-500 hover:bg-violet-600 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  )
}
