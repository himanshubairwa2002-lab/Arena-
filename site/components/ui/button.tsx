import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'ghost' | 'outline' | 'subtle' | 'link'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-[background-color,border-color,color,transform] duration-150 ease-out disabled:pointer-events-none disabled:opacity-50 active:translate-y-px select-none'

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-accent-fg hover:bg-accent-hover shadow-[0_1px_0_0_rgb(255_255_255/0.12)_inset]',
  ghost: 'text-fg hover:bg-raised border border-line hover:border-line-strong',
  outline: 'text-fg border border-line-strong hover:bg-raised',
  subtle: 'text-muted hover:text-fg hover:bg-raised',
  link: 'text-accent hover:text-accent-hover underline underline-offset-4 decoration-accent/40',
}

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-small',
  md: 'h-10 px-4 text-[0.875rem]',
  lg: 'h-12 px-6 text-[0.9375rem]',
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'primary', size = 'md', type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  )
})

export type ButtonLinkProps = React.ComponentProps<typeof Link> & {
  variant?: Variant
  size?: Size
}

export function ButtonLink({ className, variant = 'primary', size = 'md', ...props }: ButtonLinkProps) {
  return <Link className={cn(base, variants[variant], sizes[size], className)} {...props} />
}
