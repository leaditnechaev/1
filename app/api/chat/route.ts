import { NextResponse } from "next/server";

import { generateAssistantReply } from "@/lib/ai";
import { getNextStepId } from "@/lib/chat-flow";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { chatRequestSchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);

  if (!checkRateLimit(`chat:${ip}`, 30, 60_000)) {
    return NextResponse.json(
      { error: "Слишком много сообщений. Попробуйте чуть позже." },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = chatRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Некорректное сообщение." },
      { status: 400 }
    );
  }

  const { currentStep, message, answers } = parsed.data;
  const nextStep = getNextStepId(currentStep);
  const reply = await generateAssistantReply({
    currentStep,
    message,
    answers: answers ?? {}
  });

  return NextResponse.json({
    reply,
    nextStep
  });
}
