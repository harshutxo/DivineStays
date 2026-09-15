import type { Faq } from "@prisma/client";

export default function FaqList({ faqs }: { faqs: Faq[] }) {
  if (faqs.length === 0) return null;
  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <details key={faq.id} className="group rounded-2xl border border-[#e7e0d4] bg-white p-5">
          <summary className="cursor-pointer list-none font-semibold marker:content-none">{faq.question}</summary>
          <p className="mt-3 text-sm leading-6 text-[#6f6a61]">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
