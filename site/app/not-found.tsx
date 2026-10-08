import Link from 'next/link'
import { notFound as copy } from '@/content/copy'
import { primaryNav } from '@/content/site'
import { gateCse } from '@/data/weightage'
import { aggregate, heatStep } from '@/lib/heat'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/site/container'

const agg = aggregate(gateCse)
const max = agg[0].mean

/**
 * The 404 uses the brand's own argument: this page has never appeared, so by our
 * methodology you may skip it. The strip is the real CS distribution, not decoration.
 */
export default function NotFoundPage() {
  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="bg-graph absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_30%,black,transparent)]"
      />
      <Container className="relative flex min-h-[72vh] flex-col justify-center py-20">
        <div className="max-w-xl">
          <p className="num text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
            {copy.code} &middot; 0 marks since {gateCse.years[0]}
          </p>
          <h1 className="mt-5 text-display-2 text-balance">{copy.heading}</h1>
          <p className="mt-5 max-w-[46ch] text-lead text-muted text-pretty">{copy.body}</p>

          <div
            aria-hidden
            className="mt-9 flex h-9 w-full max-w-sm gap-[3px] overflow-hidden rounded"
          >
            {agg.map((a) => (
              <span
                key={a.id}
                className="flex-1 rounded-[2px]"
                style={{ backgroundColor: `rgb(var(--c-heat-${heatStep(a.mean, max)}))` }}
              />
            ))}
            <span className="flex-1 rounded-[2px] border border-dashed border-line-strong" />
          </div>
          <p className="num mt-2 text-[0.625rem] text-faint">
            GATE CSE subjects by 15-year mean. The dashed cell on the right is this page.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/">{copy.cta}</ButtonLink>
            <ButtonLink href="/free/weightage-map" variant="ghost">
              Open the free heat map
            </ButtonLink>
          </div>

          <nav aria-label="Popular pages" className="mt-10 border-t border-line pt-6">
            <p className="eyebrow">Pages that do carry marks</p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-small text-muted transition-colors hover:text-fg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/changelog" className="text-small text-muted transition-colors hover:text-fg">
                  Changelog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-small text-muted transition-colors hover:text-fg">
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </div>
  )
}
