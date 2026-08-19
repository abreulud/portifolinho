import type { Locale } from '@/i18n/messages'

const projectContent = import.meta.glob('./*/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
}) as Record<string, string>

export function getProjectContent(slug: string, locale: Locale): string | null {
  return (
    projectContent[`./${slug}/${locale}.md`] ??
    projectContent[`./${slug}/pt.md`] ??
    null
  )
}
