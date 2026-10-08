import Link from 'next/link'
import { MessageCircle, Send, Instagram, Mail } from 'lucide-react'
import { footerNav, paymentRails, site, trustNotes } from '@/content/site'
import { Logo } from './logo'
import { Container } from './container'

const socials = [
  { label: site.telegram.label, href: site.telegram.href, icon: Send, handle: site.telegram.handle },
  { label: site.whatsapp.label, href: site.whatsapp.href, icon: MessageCircle, handle: 'Support' },
  { label: site.instagram.label, href: site.instagram.href, icon: Instagram, handle: site.instagram.handle },
]

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="py-13 lg:py-18">
        <div className="grid gap-10 grid-cols-1 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-3 text-small leading-relaxed text-muted">
              Previous-year-question analytics for Indian competitive exams. We work out which
              part of the syllabus actually carries the marks, so you can delete the rest.
            </p>
            <ul className="mt-5 space-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-small text-muted transition-colors hover:text-fg"
                  >
                    <s.icon className="h-3.5 w-3.5 text-faint group-hover:text-accent" aria-hidden />
                    {s.label}
                    <span className="num text-[0.6875rem] text-faint">{s.handle}</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="group inline-flex items-center gap-2 text-small text-muted transition-colors hover:text-fg"
                >
                  <Mail className="h-3.5 w-3.5 text-faint group-hover:text-accent" aria-hidden />
                  <span className="num">{site.email}</span>
                </a>
              </li>
            </ul>
          </div>

          {footerNav.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h2 className="eyebrow mb-3.5">{group.heading}</h2>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-small text-muted transition-colors hover:text-fg"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <ul className="num flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.625rem] uppercase tracking-[0.08em] text-faint">
            {paymentRails.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.75rem] text-faint">
            {trustNotes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>

        <p className="mt-6 text-[0.75rem] leading-relaxed text-faint">
          &copy; {site.foundedYear} {site.legalName}. Not affiliated with IIT Madras, the National
          Testing Agency, UPPSC, BPSC or any conducting authority. Exam names and dates are
          referenced for identification only. We do not reproduce question papers, NCERT text or
          any coaching institute&rsquo;s material.
        </p>
      </Container>
    </footer>
  )
}
