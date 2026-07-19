import { JsonLd } from "@/components/json-ld"
import { faqPageJsonLd, SITE_URL } from "@/lib/structured-data"
import { FaqItem } from "@/lib/mdx/types"

export function FaqSection({ faq, slug }: { faq: FaqItem[]; slug: string }) {
  return (
    <section className="mt-16 border-t border-border pt-10">
      <JsonLd data={faqPageJsonLd(faq, `${SITE_URL}/blog/${slug}`)} />
      <h2 className="text-2xl font-semibold text-foreground mb-6">FAQ</h2>
      <dl className="space-y-6">
        {faq.map((item) => (
          <div key={item.q}>
            <dt className="text-foreground font-medium mb-2">{item.q}</dt>
            <dd className="text-foreground-secondary leading-relaxed">{item.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
