import { chatCompletionStream, type ChatMessage } from "@/lib/tokenrouter"

export const runtime = "nodejs"

export async function POST(request: Request) {
  const { messages, model }: { messages: ChatMessage[]; model?: string } =
    await request.json()

  if (!messages || !Array.isArray(messages)) {
    return Response.json(
      { error: "messages array is required" },
      { status: 400 }
    )
  }

  const stream = await chatCompletionStream(messages, model)

  const encoder = new TextEncoder()
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content
          if (content) {
            controller.enqueue(encoder.encode(content))
          }
        }
        controller.close()
      } catch (error) {
        controller.error(error)
      }
    },
  })

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  })
}
