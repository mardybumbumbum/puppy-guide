import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { messages, puppyName, puppyAgeWeeks, lang } = await req.json()

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  const systemPrompt = lang === 'pl'
    ? `Jesteś przyjaznym i empatycznym trenerem psów oraz weterynarzem dla aplikacji PuppyGuide. Pomagasz właścicielom szczeniąt Golden Retrievera. Szczeniak nazywa się ${puppyName} i ma ${puppyAgeWeeks} tygodni. Odpowiadaj po polsku, w sposób ciepły, przyjazny i pomocny. Dawaj praktyczne rady dotyczące treningu, socjalizacji i zdrowia szczeniąt. Jeśli pytanie dotyczy poważnego problemu zdrowotnego, zawsze zalecaj wizytę u weterynarza.`
    : `You are a friendly and empathetic dog trainer and veterinary advisor for the PuppyGuide app. You help Golden Retriever puppy owners. The puppy's name is ${puppyName} and is ${puppyAgeWeeks} weeks old. Respond warmly, friendly and helpfully. Give practical advice about puppy training, socialization and health. If the question concerns a serious health issue, always recommend visiting a vet.`

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    system: systemPrompt,
    messages: messages,
  })

  const text = response.content[0].type === 'text' ? response.content[0].text : ''
  return NextResponse.json({ message: text })
}
