import type { Locale } from '@/i18n/messages'

const postContent = import.meta.glob('./*/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
}) as Record<string, string>

export function getPostContent(slug: string, locale: Locale): string | null {
  return (
    postContent[`./${slug}/${locale}.md`] ??
    postContent[`./${slug}/pt.md`] ??
    null
  )
}
