import { useEffect, useCallback } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

function useBodyLock(open) {
  useCallback(() => {
    if (typeof document === 'undefined') return
    const el = document.body
    if (open) {
      const scrollY = window.scrollY
      el.style.overflow = 'hidden'
      el.style.position = 'fixed'
      el.style.top = `-${scrollY}px`
      el.style.width = '100%'
      return () => {
        el.style.overflow = ''
        el.style.position = ''
        el.style.top = ''
        el.style.width = ''
        window.scrollTo(0, scrollY)
      }
    }
    el.style.overflow = ''
    el.style.position = ''
    el.style.top = ''
    el.style.width = ''
  }, [open])
}

export function BaseModal({
  open,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeLabel = 'Close',
}) {
  const resetScroll = useBodyLock(open)

  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  useEffect(() => {
    if (open) resetScroll?.()
  }, [open, resetScroll])

  if (!open) return null

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-3xl',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'base-modal-title' : undefined}
        className={cn(
          'relative flex max-h-[90vh] w-full flex-col overflow-hidden rounded-xl',
          'bg-[var(--color-surface)] shadow-[var(--shadow-card)]',
          'border border-[var(--color-border)]',
          sizeClasses[size]
        )}
      >
        {title && (
          <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-4">
            <h2
              id="base-modal-title"
              className="text-sm font-bold text-[var(--color-text)]"
            >
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label={closeLabel}
              className="grid size-8 place-items-center rounded-md text-[var(--color-muted)] transition-colors hover:bg-[var(--color-primary-soft)] hover:text-[var(--color-primary)]"
            >
              <X size={16} />
            </button>
          </div>
        )}
        <div className="overflow-y-auto overscroll-contain px-5 py-4">
          {children}
        </div>
        {footer && (
          <div className="border-t border-[var(--color-border)] px-5 py-3.5">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
