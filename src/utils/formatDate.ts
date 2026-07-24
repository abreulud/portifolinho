import { localeCodes, type Locale } from '@/i18n/messages'

export function formatShortDate(isoDate: string, locale: Locale): string {
  const [year, month, day] = isoDate.split('-').map(Number)
  const date = new Date(year, month - 1, day)

  return new Intl.DateTimeFormat(localeCodes[locale], {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
    .format(date)
    .replace('.', '')
}
