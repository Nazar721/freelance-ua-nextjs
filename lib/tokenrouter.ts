import OpenAI from "openai"

export interface ChatMessage {
  role: "system" | "user" | "assistant"
  content: string
}

export interface ChatCompletionRequest {
  messages: ChatMessage[]
  model?: string
}

const DEFAULT_MODEL = "z-ai/glm-5.3-free"

export function createGoRouterClient() {
  return new OpenAI({
    baseURL: "https://api.tokenrouter.com/v1",
    apiKey: process.env.GOROUTER_API_KEY,
  })
}

// Alias for backward compatibility
export const createTokenRouterClient = createGoRouterClient

export async function chatCompletion(
  messages: ChatMessage[],
  model: string = DEFAULT_MODEL
) {
  const client = createGoRouterClient()
  const response = await client.chat.completions.create({
    model,
    messages,
  })
  return response.choices[0].message.content
}

export async function chatCompletionStream(
  messages: ChatMessage[],
  model: string = DEFAULT_MODEL
) {
  const client = createGoRouterClient()
  const stream = await client.chat.completions.create({
    model,
    messages,
    stream: true,
    stream_options: { include_usage: true },
  })
  return stream
}

// Available models on TokenRouter:
// - z-ai/glm-5.3-free (default)
