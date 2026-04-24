import type { LeadPayload } from "@/lib/types";

function line(label: string, value?: string): string {
  return `${label}: ${value?.trim() || "-"}`;
}

export function formatLeadForBitrixComments({
  answers,
  metadata
}: LeadPayload): string {
  return [
    'Новая заявка с чат-лендинга "Формула"',
    "",
    line("Имя", answers.name),
    line("Телефон", answers.phone),
    line("Планировка", answers.need),
    line("Способ покупки", answers.purchaseMethod),
    line("Бюджет", answers.budget),
    line("Куда направить", answers.contactMethod),
    "",
    "UTM:",
    line("source", metadata.utm_source),
    line("medium", metadata.utm_medium),
    line("campaign", metadata.utm_campaign),
    line("content", metadata.utm_content),
    line("term", metadata.utm_term),
    line("gclid", metadata.gclid),
    line("yclid", metadata.yclid),
    "",
    "Дополнительно:",
    line("referrer", metadata.referrer),
    line("path", metadata.path),
    line("timestamp", metadata.timestamp),
    line("user agent", metadata.userAgent)
  ].join("\n");
}

export function formatPhoneForDisplay(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  const normalized = digits.startsWith("8") ? `7${digits.slice(1)}` : digits;
  const rest = normalized.startsWith("7") ? normalized.slice(1) : normalized;

  if (!rest) {
    return "";
  }

  const parts = [
    rest.slice(0, 3),
    rest.slice(3, 6),
    rest.slice(6, 8),
    rest.slice(8, 10)
  ].filter(Boolean);

  if (parts.length === 1) {
    return `+7 (${parts[0]}`;
  }

  if (parts.length === 2) {
    return `+7 (${parts[0]}) ${parts[1]}`;
  }

  if (parts.length === 3) {
    return `+7 (${parts[0]}) ${parts[1]}-${parts[2]}`;
  }

  return `+7 (${parts[0]}) ${parts[1]}-${parts[2]}-${parts[3]}`;
}
