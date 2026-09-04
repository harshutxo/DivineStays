export function buildWhatsAppLink(propertyName?: string): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
  const message = propertyName
    ? `Hi DivineStays, I'm interested in ${propertyName}. Can you share more details?`
    : "Hi DivineStays, I'm interested in a room. Can you share more details?";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function buildTelLink(): string {
  return `tel:${process.env.NEXT_PUBLIC_CALL_NUMBER ?? ""}`;
}
