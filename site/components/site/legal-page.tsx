import Link from 'next/link'
import type { LegalDoc } from '@/content/legal'
import { legalDocs } from '@/content/legal'
import { site } from '@/content/site'
import { formatLongDate } from '@/lib/dates'
import { slugify } from '@/lib/utils'
import { Container, Section } from '@/components/site/container'
import { PageHeader } from '@/components/site/page-header'

export function LegalPage({ doc }: { doc: LegalDoc }) {
  const headings = doc.blocks.filter((b) => b.kind === 'h')

  return (
    <>
      <PageHeader
        eyebrow={`${doc.eyebrow} \u00B7 updated ${formatLongDate(doc.updated)}`}
        heading={doc.title}
        sub={doc.intro}
        trail={[
          { name: 'Home', path: '/' },
          { name: doc.title, path: `/${doc.slug}` },
        ]}
      />

      <Section tight>
        <Container>
          <div className="grid gap-10 grid-cols-1 lg:grid-cols-[minmax(0,220px)_minmax(0,1fr)] lg:gap-16">
            <nav aria-label="On this page" className="lg:sticky lg:top-20 lg:self-start">
              <p className="eyebrow">On this page</p>
              <ul className="mt-3 space-y-2">
                {headings.map((h) => (
                  <li key={h.text}>
                    <a
                      href={`#${slugify(h.text)}`}
                      className="text-[0.8125rem] leading-snug text-muted transition-colors hover:text-fg"
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="mt-6 space-y-2 border-t border-line pt-5">
                {legalDocs.map((d) => (
                  <li key={d.slug}>
                    <Link
                      href={`/${d.slug}`}
                      aria-current={d.slug === doc.slug ? 'page' : undefined}
                      className={`text-[0.8125rem] transition-colors ${
                        d.slug === doc.slug ? 'text-fg' : 'text-faint hover:text-muted'
                      }`}
                    >
                      {d.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="prose-skiplist max-w-prose">
              {doc.blocks.map((b, i) => {
                if (b.kind === 'h') {
                  return (
                    <h2 key={`${b.text}-${i}`} id={slugify(b.text)} className="scroll-mt-24">
                      {b.text}
                    </h2>
                  )
                }
                if (b.kind === 'ul') {
                  return (
                    <ul key={`ul-${i}`}>
                      {b.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  )
                }
                return <p key={`p-${i}`}>{b.text}</p>
              })}

              <hr className="my-8 border-line" />
              <p className="text-[0.8125rem] text-faint">
                This page is written to be understood rather than to be impenetrable, which also
                means it is not legal advice. {site.legalName} is a real business and these are its
                real policies, but if you are relying on them for something consequential, read
                them with a lawyer.
              </p>
              <p className="text-[0.8125rem] text-faint">
                Questions:{' '}
                <a href={`mailto:${site.email}`} className="num">
                  {site.email}
                </a>
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
