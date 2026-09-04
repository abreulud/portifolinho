import MarkdownIt from 'markdown-it'

const markdown = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true
})

const defaultLinkOpen = markdown.renderer.rules.link_open

markdown.renderer.rules.link_open = (
  tokens,
  index,
  options,
  environment,
  renderer
) => {
  const href = tokens[index].attrGet('href')

  if (
    typeof href === 'string' &&
    (href.startsWith('http://') || href.startsWith('https://'))
  ) {
    tokens[index].attrSet('target', '_blank')
    tokens[index].attrSet('rel', 'noopener noreferrer')
  }

  if (defaultLinkOpen) {
    return defaultLinkOpen(tokens, index, options, environment, renderer)
  }

  return renderer.renderToken(tokens, index, options)
}

export function renderMarkdown(source: string): string {
  return markdown.render(source)
}

export interface MarkdownHeading {
  id: string
  label: string
  description: string
}

export interface MarkdownDocument {
  html: string
  headings: MarkdownHeading[]
}

function plainText(source: string) {
  return source
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[`*_~]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function headingId(label: string, usedIds: Map<string, number>) {
  const baseId = label
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'topico'
  const occurrence = usedIds.get(baseId) ?? 0

  usedIds.set(baseId, occurrence + 1)
  return occurrence === 0 ? baseId : `${baseId}-${occurrence + 1}`
}

export function renderMarkdownDocument(source: string): MarkdownDocument {
  const environment = {}
  const tokens = markdown.parse(source, environment)
  const headings: MarkdownHeading[] = []
  const usedIds = new Map<string, number>()

  tokens.forEach((token, index) => {
    if (token.type !== 'heading_open' || token.tag !== 'h2') return

    const label = plainText(tokens[index + 1]?.content ?? '')
    const id = headingId(label, usedIds)
    let description = ''

    for (let nextIndex = index + 3; nextIndex < tokens.length; nextIndex += 1) {
      const nextToken = tokens[nextIndex]

      if (nextToken.type === 'heading_open') break

      if (nextToken.type === 'paragraph_open') {
        description = plainText(tokens[nextIndex + 1]?.content ?? '')
        break
      }
    }

    token.attrSet('id', id)
    headings.push({ id, label, description })
  })

  return {
    html: markdown.renderer.render(tokens, markdown.options, environment),
    headings
  }
}
