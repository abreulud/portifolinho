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
